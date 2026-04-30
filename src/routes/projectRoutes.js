// =====================================================
// projectRoutes.js - Punya: Huriyah (Project)
// Sprint 6: Pasang authMiddleware + roleMiddleware
// Sprint 7: Pasang multer untuk upload gambar project
// =====================================================

import { Router } from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import upload from '../config/multer.js';

const router = Router();

// GET /projects -> Ambil semua project (PUBLIC, siapa saja bisa lihat)
router.get('/', getAllProjects);

// GET /projects/:id -> Detail satu project (PUBLIC)
router.get('/:id', getProjectById);

// POST /projects -> Buat project baru
// Hanya Admin yang boleh! + upload gambar opsional
router.post('/', authMiddleware, roleMiddleware('admin'), upload.single('image'), createProject);

// PUT /projects/:id -> Update project
// Hanya Admin yang boleh! + upload gambar opsional
router.put('/:id', authMiddleware, roleMiddleware('admin'), upload.single('image'), updateProject);

// DELETE /projects/:id -> Hapus project (Hanya Admin)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteProject);

export default router;