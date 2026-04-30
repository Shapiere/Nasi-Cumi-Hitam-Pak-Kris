import { Router } from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import upload from '../config/multer.js';

const router = Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', authMiddleware, roleMiddleware('admin'), upload.single('image'), createProject);
router.put('/:id', authMiddleware, roleMiddleware('admin'), upload.single('image'), updateProject);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteProject);

export default router;
