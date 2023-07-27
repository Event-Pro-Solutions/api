import express, { Router } from 'express';
// import { Request, Response } from 'express';
// import * as authController from '../controllers/auth';
import * as homeController from '../controllers/home';
// import * as postsController from '../controllers/events';
// import { ensureAuth, ensureGuest } from '../middleware/auth';

const router: Router = express.Router();

//Main Routes - simplified for now
router.get('/', homeController.getIndex);
// router.get('/profile', ensureAuth, postsController.getProfile);
// router.get('/feed', ensureAuth, postsController.getFeed);
// router.get('/login', authController.getLogin);
// router.post('/login', authController.postLogin);
// router.get('/logout', authController.logout);
// router.get('/signup', authController.getSignup);
// router.post('/signup', authController.postSignup);

export default router;
