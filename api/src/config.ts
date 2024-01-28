/** @fileoverview Variables from {@link process.env} with casting to certain types. */

import yn from 'yn';

export const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  JWT_TOKEN_SECRET,
  CORS_ALLOW_ORIGINS,
} = process.env;

export const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT, 10);

export const PORT = parseInt(process.env.PORT, 10);

export const TYPEORM_LOG = yn(process.env.TYPEORM_LOG, { default: false });

export const TYPEORM_MODELS_SYNC = yn(process.env.TYPEORM_MODELS_SYNC, { default: false });
