// =====================================================
// authMiddleware.js - Punya: Shapiere (Auth)
// Sprint 6: Verifikasi JWT Token untuk Protected Routes
// =====================================================

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Ambil token dari Header "Authorization: Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Jika token tidak ada, tolak akses
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Akses ditolak! Token tidak ditemukan. Silakan login terlebih dahulu.',
    });
  }

  try {
    // Verifikasi token dengan secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'careconnect_secret_key');

    // Simpan data user dari token ke req.user (bisa dipakai controller berikutnya)
    req.user = decoded;

    // Lanjutkan ke controller berikutnya
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token sudah kedaluwarsa. Silakan login kembali.',
      });
    }

    return res.status(401).json({
      status: 'error',
      message: 'Token tidak valid. Silakan login kembali.',
    });
  }
};

export default authMiddleware;
