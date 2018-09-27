declare const bazinga64: typeof bazinga64;
declare const CryptoJS: typeof CryptoJS;

declare const assets: {
  AssetCrypto?: {
    decryptAesAsset: (cipherText: ArrayBuffer, keyBytes: ArrayBuffer, referenceSha256: ArrayBuffer) => PromiseLike<ArrayBuffer>;
    encryptAesAsset: (plaintext: ArrayBuffer) => PromiseLike<{cipherText: ArrayBuffer, keyBytes: ArrayBuffer, sha256: ArrayBuffer}>;
  }
  AssetMapper?: {
    mapProfileAssets: (entity: any, assets: any[]) => any[];
    mapProfileAssetsV1: (entity: any, pictures: any[]) => void;
  }
  AssetMetaDataBuilder?: {
    buildMetadata: (file: Blob) => Promise<void>,
    isAudio: (file: Blob) => boolean;
    isImage: (file: Blob) => boolean;
    isVideo: (file: Blob) => boolean;
  }
}

declare const config: {
  ACCENT_ID: {
    BLUE: number;
    GREEN: number;
    ORANGE: number;
    PINK: number;
    PURPLE: number;
    RED: number;
    YELLOW: number;
  },
  LOGGER: {
    OPTIONS: {
      domains: {
        [domain: string]: () => number;
      },
      name_length: number;
    },
  },

  LOGIN_CODE_EXPIRATION: number;
  MAXIMUM_ASSET_FILE_SIZE_PERSONAL: number;
  MAXIMUM_ASSET_FILE_SIZE_TEAM: number;
  MAXIMUM_IMAGE_FILE_SIZE: number;
  MAXIMUM_MESSAGE_LENGTH: number;
  MAXIMUM_MESSAGE_LENGTH_RECEIVING: number;
  MAXIMUM_USERS_PER_REQUEST: number;
  MESSAGES_FETCH_LIMIT: number;
  MINIMUM_PASSWORD_LENGTH: number;
  SCROLL_TO_LAST_MESSAGE_THRESHOLD: number;

  SUPPORT: {
    FORM: {
      BUG: string;
      CONTACT: string;
    },
    ID: {
      CALLING: number;
      CAMERA_ACCESS_DENIED: number;
      DEVICE_ACCESS_DENIED: number;
      DEVICE_NOT_FOUND: number;
      HISTORY: number;
      MICROPHONE_ACCESS_DENIED: number;
      SCREEN_ACCESS_DENIED: number;
    },
  },

  UNSPLASH_URL: string;

  URL: {
    ACCOUNT: {
      PRODUCTION: string;
      STAGING: string;
    },
    SUPPORT: string;
    TEAM_SETTINGS: {
      PRODUCTION: string;
      STAGING: string;
    },
    WEBAPP: {
      INTERNAL: string;
      PRODUCTION: string;
      STAGING: string;
    },
    WEBSITE: {
      PRODUCTION: string;
      STAGING: string;
    },
  },

  URL_PATH: {
    CREATE_TEAM: string;
    DECRYPT_ERROR_1: string;
    DECRYPT_ERROR_2: string;
    MANAGE_TEAM: string;
    PASSWORD_RESET: string;
    PRIVACY_HOW: string;
    PRIVACY_WHY: string;
    SUPPORT_USERNAME: string;
    TERMS_OF_USE: string;
  },
}

declare const util: {
  afterRender?: (callback: Function) => void;
  alias?: {
    animationend: string;
  }
  arrayToBase64?: (array: ArrayBuffer|Uint8Array) => string;
  arrayToMd5Base64?: (array: Uint8Array) => string;
  ArrayUtil?: {
    chunk: <T>(array: T[], size: number) => T[][];
    getDifference: <T, K>(array1: T[], array2: K[]) => T[];
    getNextItem: <T>(array: T[], currentItem: T) => T;
    interpolate: <T>(array: T[], length: number) => T[];
    isLastItem: <T>(array: T[], item: T) => boolean;
    iterateIndex: <T>(array: T[], currentIndex: number, reverse?: boolean) => number;
    iterateItem: <T>(array: T[], currentItem: T, reverse?: boolean) => T;
    randomElement: <T>(array?: T[]) => T[];
    removeElement: <T>(array?: T[], element?: T) => T[];
  }
  base64ToArray?: (base64: string) => Uint8Array;
  base64ToBlob?: (base64: string) => Blob;
  bucketValues?: (value: number, bucketLimits: number[]) => string;
  checkIndexedDb?: () => Promise<void>;
  createRandomUuid?: () => string;
  downloadBlob?: (blob: Blob, filename: string, mimeType: string) => number;
  downloadFile?: (url: string, fileName: string, mimeType: string) => number;
  downloadText?: (text: string, filename?: string) => number;
  encodeBase64?: (text: string) => string;
  encodeSha256Base64?: (text: string) => string;
  Environment?: {
    backend: {
      current?: string;
    },
    browser: {
      chrome: boolean;
      edge: boolean;
      firefox: boolean;
      name: string;
      opera: boolean;
      supports: {
        audioOutputSelection: boolean;
        calling: boolean;
        clipboard: boolean;
        indexedDb: boolean;
        mediaDevices: boolean;
        mediaPermissions: boolean;
        notifications: boolean;
        permissions: boolean;
        screenSharing: boolean;
      },
      version: string;
    },
    desktop: boolean;
    electron: boolean;
    electronVersion: string;
    frontend: {
      isInternal: () => boolean;
      isLocalhost: () => boolean;
      isProduction: () => boolean;
    },
    os: {
      linux: boolean;
      mac: boolean;
      win: boolean;
    },
    version: (showWrapperVersion?: boolean, doNotFormat?: boolean) => string
  },
  formatBytes?: (bytes: number, decimals: number) => string;
  getContentTypeFromDataUrl?: (data_url: string) => string;
  getFileExtension?: (filename: string) => string;
  isIsoString?: (dateString: string) => boolean;
  isSameLocation?: (pastLocation: string, currentLocation: string) => boolean;
  isValidEmail?: (email: string) => boolean;
  isValidPhoneNumber?: (phoneNumber: string) => boolean;
  isValidUsername?: (username: string) => boolean;
  koArrayPushAll?: (koArray: any, valuesToPush: any[]) => void;
  koArrayUnshiftAll?: (koArray: any, valuesToShift: any[]) => void;
  koPushDeferred?: (target: any, src: any, number?: number, delay?: number) => void;
  loadDataUrl?: (file: Blob) => Promise<string | ArrayBuffer>;
  loadFileBuffer?: (file: Blob) => Promise<string | ArrayBuffer>;
  loadImage?: (blob: Blob) => Promise<HTMLElement>;
  loadUrlBlob?: (url: string) => Promise<Blob>;
  loadUrlBuffer?: (url: string, xhrAccessorFunction?: XMLHttpRequest) => Promise<{buffer: Buffer, mimeType: string}>
  murmurhash3?: (key: string, seed: number) => number;
  noop?: () => void;
  phoneNumberToE164?: (phoneNumber: string, countryCode: string) => string;
  printDevicesId?: (id?: string | number) => string;
  renderMessage?: (message: string, selfId: string, mentionEntities?: any[]) => string;
  sortGroupsByLastEvent?: (groupA: any, groupB: any) => any;
  sortObjectByKeys?: (object: Object, reverse?: boolean) => Object;
  stripDataUri?: (string: string) => string;
  stripUrlWrapper?: (url: string) => string;
  trimFileExtension?: (filename: string) => string;
  validateProfileImageResolution?: (file: any, minWidth: number, minHeight: number) => Promise<void>;
  zeroPadding?: (value: string | number, length?: number) => string;
}

declare const z: {
  assets: typeof assets;
  config: typeof config;
  util: typeof util;
}

interface Window {
  z: typeof z
}
