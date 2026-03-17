// =========================================
// authRoutes.js - Punya: User 1 (Ketua/Lead)
// Tanggung jawab: Auth & User Management
// =========================================
import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController.js';

const router = Router();

// Endpoint Auth Lo:
router.post('/register', register);
router.post('/login', login);
router.get('/profile', getProfile);

export default router;
