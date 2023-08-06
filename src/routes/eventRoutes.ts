import { Router } from 'express';
import eventController from '../controllers/eventController';
import { ensureAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/createEvent', ensureAuth, eventController.createEvent);

export default router;
