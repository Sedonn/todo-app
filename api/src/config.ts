export const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  PORT = 443,
  JWT_TOKEN_SECRET = '123',
  CORS_ALLOW_ORIGINS,
} = process.env;