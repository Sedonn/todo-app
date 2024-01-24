/* eslint-disable no-console */

import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import passport from 'passport';

import routes from './Routes';

import { CORS_ALLOW_ORIGINS, PORT } from './config';
import todoAppJWTStrategy from './Middleware/authentication';

import AppDataSource from './data-source';
import globalErrorHandler from './Middleware/error';

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

const initApp = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database is connected.');

    app.listen(PORT, () => console.log(`App listening at port: ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initApp();
