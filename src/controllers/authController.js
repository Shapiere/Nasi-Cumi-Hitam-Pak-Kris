// =========================================
// authController.js - Punya: User 1 (Ketua)
// =========================================
// File ini buat logic-nya auth:
//   registrasi, login, ambil profil, dst.
// Nanti lo bikin fungsinya di sini, terus
// export dan dipanggil dari authRoutes.js

// Register User Baru
export const register = async (req, res) => {
  // Nanti di sini lo ambil data dari req.body (email, password, dll)
  // Terus hash passwordnya, simpan ke database
  res.json({ message: "Endpoint Register untuk User 1 (Ketua) jalan!" });
};

// Login User
export const login = async (req, res) => {
  // Nanti di sini cek kombinasi email & password
  // Kalau bener, generate JWT token
  res.json({ message: "Endpoint Login untuk User 1 (Ketua) jalan!" });
};

// Lihat Profil User yang Sedang Login
export const getProfile = async (req, res) => {
  // Nanti butuh middleware buat ekstrak JWT
  // Baru di sini return data spesifik ke user
  res.json({ message: "Endpoint Profil untuk User 1 (Ketua) jalan!" });
};
