import passport from 'passport';
import { Router } from 'express';

import todoRouter from './todo.js';
import userRouter from './user.js';

const router = Router();

router.use('/todo', passport.authenticate('jwt', { session: false }), todoRouter);
router.use('/user', userRouter);

export default router;