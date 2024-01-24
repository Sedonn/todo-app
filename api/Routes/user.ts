import { Router } from 'express';

import { loginUser, registerUser } from '../Controllers/user';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
