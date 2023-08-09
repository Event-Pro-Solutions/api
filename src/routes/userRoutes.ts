import { Router } from 'express';
import userController from '../controllers/userController';
// import { ensureAuth } from '../middleware/authMiddleware';
import { validateJwt } from '../middleware/jwtMiddleware';



const router = Router();

router.get('/:id', userController.getAllUserEvents);
router.get('/:id/allEvents', validateJwt, userController.getAllUserEvents);
router.get('/:id/registeredEvents', userController.getUserRegisteredEvents);
router.get('/:id/managedEvents', userController.getUserManagedEvents)

export default router;