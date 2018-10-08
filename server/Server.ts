/*
 * Wire
 * Copyright (C) 2018 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as path from 'path';

import {ServerConfig} from './config';
import HealthCheckRoute from './routes/_health/HealthCheckRoute';
import {internalErrorRoute, notFoundRoute} from './routes/error/ErrorRoutes';

const STATUS_CODE_MOVED = 301;

class Server {
  private app: express.Express;
  private server?: http.Server;

  constructor(private config: ServerConfig) {
    this.app = express();
    this.init();
  }

  init(): void {
    // The order is important here, please don't sort!
    this.initCaching();
    this.initForceSSL();
    this.initSecurityHeaders();
    this.app.use(
      compression({
        level: this.config.COMPRESS_LEVEL,
        threshold: this.config.COMPRESS_MIN_SIZE,
      })
    );
    this.initStaticRoutes();
    this.app.use(HealthCheckRoute());
    this.app.use(notFoundRoute());
    this.app.use(internalErrorRoute());
  }

  private initCaching() {
    if (this.config.DEVELOPMENT) {
      this.app.use(helmet.noCache());
    } else {
      this.app.use((req, res, next) => {
        const milliSeconds = 1000;
        res.header('Cache-Control', `public, max-age=${this.config.CACHE_DURATION_SECONDS}`);
        res.header('Expires', new Date(Date.now() + this.config.CACHE_DURATION_SECONDS * milliSeconds).toUTCString());
        next();
      });
    }
  }

  private initForceSSL(): void {
    const SSLMiddleware: express.RequestHandler = (req, res, next) => {
      // Redirect to HTTPS
      const isDevelopment = this.config.DEVELOPMENT || req.url.match(/_health\/?/);
      const isInsecure = !req.secure || req.get('X-Forwarded-Proto') !== 'https';

      if (isInsecure && !isDevelopment) {
        return res.redirect(STATUS_CODE_MOVED, `https://${req.headers.host}${req.url}`);
      }

      next();
    };

    this.app.enable('trust proxy');
    this.app.use(SSLMiddleware);
  }

  private initSecurityHeaders() {
    this.app.disable('x-powered-by');
    this.app.use(
      helmet({
        frameguard: {action: 'deny'},
      })
    );
    this.app.use(helmet.noSniff());
    this.app.use(helmet.xssFilter());
    this.app.use(
      helmet.hsts({
        includeSubdomains: true,
        maxAge: 31536000,
        preload: true,
      })
    );
    this.app.use(
      helmet.contentSecurityPolicy({
        browserSniff: true,
        directives: this.config.CSP,
        disableAndroid: false,
        loose: !this.config.DEVELOPMENT,
        reportOnly: false,
        setAllHeaders: false,
      })
    );
    this.app.use(
      helmet.referrerPolicy({
        policy: 'same-origin',
      })
    );
  }

  private initStaticRoutes() {
    this.app.use('/', express.static(path.join(__dirname, 'static')));
  }

  start(): Promise<number> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        reject('Server is already running.');
      } else if (this.config.PORT_HTTP) {
        this.server = this.app.listen(this.config.PORT_HTTP, () => resolve(this.config.PORT_HTTP));
      } else {
        reject('Server port not specified.');
      }
    });
  }

  async stop(): Promise<void> {
    if (this.server) {
      this.server.close();
      this.server = undefined;
    } else {
      throw new Error('Server is not running.');
    }
  }
}

export default Server;
