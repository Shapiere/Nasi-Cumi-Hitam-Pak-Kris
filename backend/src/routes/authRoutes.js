// =========================================
// authRoutes.js - Punya: Shapiere (Auth)
// Sprint 6: Auth + Middleware Integration
// =========================================
import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = Router();

// --- PUBLIC ROUTES (Tidak butuh token) ---
router.post('/register', register);
router.post('/login', login);

// --- PROTECTED ROUTES (Butuh token JWT) ---
// GET /auth/profile -> Lihat profil sendiri (semua user yang sudah login)
router.get('/profile', authMiddleware, getProfile);

// GET /auth/admin -> Contoh endpoint khusus Admin
router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: `Selamat datang Admin ${req.user.email}! Anda mengakses halaman admin.`,
    data: req.user,
  });
});

export default router;
