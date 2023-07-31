import { Router } from 'express';
import EventController from '../controllers/eventController';

const router = Router();

router.get('/', EventController.getAllEvents);
router.get('/:id', EventController.getEventById);

export default router;

// testing