/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Router } from 'express';
import passport from 'passport';

import { userRouter } from './user.ts';
import { taskRouter } from './task.ts';

export const mainRouter = Router();

mainRouter.use('/task', passport.authenticate('jwt', { session: false }), taskRouter);
mainRouter.use('/user', userRouter);
