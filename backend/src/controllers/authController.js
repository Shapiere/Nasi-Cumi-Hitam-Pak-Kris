// =========================================
// authController.js - Punya: Shapiere (Auth)
// Sprint 5: Validasi + Error Handling + JWT
// =========================================

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

// =====================================================
// POST /auth/register
// Daftar akun baru
// =====================================================
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // --- VALIDASI INPUT ---
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Nama, email, dan password wajib diisi!',
      });
    }

    // Validasi format email (harus ada @ dan .)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Format email tidak valid!',
      });
    }

    // Validasi panjang password (minimal 6 karakter)
    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Password minimal harus 6 karakter!',
      });
    }

    // --- CEK DUPLIKASI EMAIL ---
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'Email sudah terdaftar! Silakan gunakan email lain atau langsung login.',
      });
    }

    // --- HASH PASSWORD (Jangan simpan password polos!) ---
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // --- SIMPAN USER BARU KE DATABASE ---
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'user', // Default role adalah 'user'
      },
    });

    // --- RESPONSE SUKSES (Jangan kembalikan password!) ---
    return res.status(201).json({
      status: 'success',
      message: 'Registrasi berhasil! Silakan login.',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

// =====================================================
// POST /auth/login
// Login dan dapatkan token JWT
// =====================================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // --- VALIDASI INPUT ---
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email dan password wajib diisi!',
      });
    }

    // --- CEK USER ADA ATAU TIDAK ---
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Email atau password salah!', // Pesan sengaja digeneralisir demi keamanan
      });
    }

    // --- BANDINGKAN PASSWORD DENGAN HASH DI DATABASE ---
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Email atau password salah!',
      });
    }

    // --- BUAT TOKEN JWT ---
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'careconnect_secret_key',
      { expiresIn: '7d' } // Token berlaku 7 hari
    );

    // --- RESPONSE SUKSES ---
    return res.status(200).json({
      status: 'success',
      message: 'Login berhasil!',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

// =====================================================
// GET /auth/profile
// Lihat profil user yang sedang login (butuh token)
// =====================================================
export const getProfile = async (req, res) => {
  try {
    // Ambil token dari Header "Authorization: Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Akses ditolak! Token tidak ditemukan. Silakan login terlebih dahulu.',
      });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'careconnect_secret_key');

    // Ambil data user terbaru dari database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
        // Password sengaja tidak dikembalikan
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User tidak ditemukan.',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Data profil berhasil diambil.',
      data: user,
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token tidak valid atau sudah kedaluwarsa. Silakan login kembali.',
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};
