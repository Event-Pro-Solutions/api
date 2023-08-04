import { Router } from 'express';
import eventController from '../controllers/eventController';

const router = Router();

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

export default router;