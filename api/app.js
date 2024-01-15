import express from 'express';
import cors from 'cors';
import passport from 'passport';
import path from 'path';

import routes from './Routes/index.js';

import { CORS_ALLOW_ORIGINS, PORT } from './config.js';
import todoAppJWTStrategy from './Middleware/authentication.js';
import { fileURLToPath } from 'url';

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


app.listen(PORT, () => console.log(`Приложение слушает порт: ${PORT}`));