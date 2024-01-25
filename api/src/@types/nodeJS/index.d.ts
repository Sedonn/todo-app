/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATABASE: string;
      TYPEORM_LOG: string;
      TYPEORM_MODELS_SYNC: string;
      PORT: string;
      JWT_TOKEN_SECRET: string;
      CORS_ALLOW_ORIGINS: string;
    }
  }
}

export {};
