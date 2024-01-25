/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Router } from 'express';
import passport from 'passport';

import userRouter from './user.ts';
import taskRouter from './task.ts';

const router = Router();

router.use('/task', passport.authenticate('jwt', { session: false }), taskRouter);
router.use('/user', userRouter);

export default router;
