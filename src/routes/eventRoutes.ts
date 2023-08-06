import { Router } from 'express';
import eventController from '../controllers/eventController';

const router = Router();

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/createEvent', eventController.createEvent);

export default router;
