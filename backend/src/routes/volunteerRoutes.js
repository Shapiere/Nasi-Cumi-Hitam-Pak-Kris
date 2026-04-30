import { Router } from 'express';
import {
  joinProject,
  getVolunteersByProjectController,
  getVolunteersByUserController,
  updateVolunteerStatusController,
} from '../controllers/volunteerController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = Router();

router.post('/', authMiddleware, joinProject);
router.get('/', getVolunteersByProjectController);
router.get('/user', authMiddleware, getVolunteersByUserController);
router.patch('/:id/status', authMiddleware, roleMiddleware('admin'), updateVolunteerStatusController);

export default router;