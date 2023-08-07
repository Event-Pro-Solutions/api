import { Router } from 'express';

import * as authController from '../controllers/authController';

const router: Router = Router();

router.post('/login', authController.login);
router.get('/login', (req, res) => {
    res.status(200).send('Login endpoint. Frontend handles rendering.');
});
router.post('/logout', authController.logout);
router.post('/signup', authController.signUp);

export default router;
