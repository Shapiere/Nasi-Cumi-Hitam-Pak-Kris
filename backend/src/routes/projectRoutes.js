// =========================================
// projectRoutes.js - Punya: User 2
// Tanggung jawab: Project Discovery & Management
// =========================================

import { Router } from 'express';

import {
  createProject,
  getAllProjects,
  getProjectById
} from '../controllers/projectController.js';

const router = Router();

// GET semua project
router.get('/', getAllProjects);

// GET detail project by id
router.get('/:id', getProjectById);

// POST buat project baru
router.post('/', createProject);

export default router;