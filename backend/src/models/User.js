// =====================================================
// models/User.js - Punya: User 1 (Ketua / Auth)
// Query database untuk tabel 'users'
// =====================================================

import prisma from '../config/prisma.js';

// Cari user berdasarkan email (dipakai saat login)
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

// Buat user baru (dipakai saat register)
export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

// Cari user berdasarkan ID (dipakai saat cek profile)
export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      created_at: true,
      // Password sengaja tidak ikut di-return untuk keamanan
    },
  });
};
