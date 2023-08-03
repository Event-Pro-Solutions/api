import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.get('/:id', userController.getAllUserEvents);
router.get('/:id/allEvents', userController.getAllUserEvents);

export default router;