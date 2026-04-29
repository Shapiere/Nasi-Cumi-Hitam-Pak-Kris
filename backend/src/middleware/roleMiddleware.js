// =====================================================
// roleMiddleware.js - Punya: Shapiere (Auth)
// Sprint 6: Cek Role Admin untuk Admin-Only Routes
// =====================================================

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // roleMiddleware harus dipasang SETELAH authMiddleware
    // karena butuh req.user yang di-set oleh authMiddleware
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Akses ditolak! Anda belum terautentikasi.',
      });
    }

    // Cek apakah role user termasuk dalam daftar role yang diizinkan
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `Akses ditolak! Hanya ${allowedRoles.join(' / ')} yang dapat mengakses fitur ini.`,
      });
    }

    // Role cocok, lanjutkan ke controller
    next();
  };
};

export default roleMiddleware;
