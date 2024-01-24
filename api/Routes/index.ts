import passport from 'passport';
import { Router } from 'express';

import userRouter from './user';
import taskRouter from './task';

const router = Router();

router.use('/task', passport.authenticate('jwt', { session: false }), taskRouter);
router.use('/user', userRouter);

export default router;
