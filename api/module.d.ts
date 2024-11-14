declare namespace NodeJS {
  export interface ProcessEnv {
    PLUGGY_CLIENT_SECRET: string;
    PLUGGY_CLIENT_ID: string;
    PORT: number;
    ACCOUNT_ID: string;
    ACCESS_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
  }
}
