// =====================================================
// src/config/prisma.js - Prisma Client (Singleton)
// Ini adalah satu-satunya koneksi ke database.
// Import file ini di mana saja yang butuh akses DB.
// =====================================================

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Log semua query ke console (berguna saat development)
});

export default prisma;
