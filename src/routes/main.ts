import express, { Router } from 'express';

import * as homeController from '../controllers/home';

const router: Router = express.Router();

router.get('/', homeController.getIndex);

export default router;
