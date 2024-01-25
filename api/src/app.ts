/* eslint-disable no-console */

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import passport from 'passport';

import routes from '@/Routes/index.ts';

import { CORS_ALLOW_ORIGINS, PORT } from '@/config.ts';
import todoAppJWTStrategy from '@/Middleware/authentication.ts';

import AppDataSource from '@/data-source.ts';
import globalErrorHandler from '@/Middleware/error.ts';

passport.use(todoAppJWTStrategy);

const app = express();

app.use(express.json());

app.use(passport.initialize());

app.use(
  cors({
    origin: CORS_ALLOW_ORIGINS,
  }),
);

app.use('/api', routes);
app.use(globalErrorHandler);

try {
  await AppDataSource.initialize();
  console.log('Database is connected.');

  app.listen(PORT, () => console.log(`App listening at port: ${PORT}`));
} catch (error) {
  console.error(error);
  process.exit(1);
}
