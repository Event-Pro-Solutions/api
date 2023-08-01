import { Router } from 'express';

import * as authController from '../controllers/auth';

const router: Router = Router();

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.post('/signup', authController.signUp);

export default router;
