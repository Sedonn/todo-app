import { Router } from 'express';

import { loginUser, registerUser } from '@/Controllers/user.ts';

export const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
