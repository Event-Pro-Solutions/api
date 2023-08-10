import { Router } from 'express';
import eventController from '../controllers/eventController';
// import { ensureAuth } from '../middleware/authMiddleware';
import { validateJwt } from '../middleware/jwtMiddleware';


const router = Router();

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/createEvent', validateJwt, eventController.createEvent);
router.get('/byTag/:tags', eventController.findEventsByTag)

export default router;
