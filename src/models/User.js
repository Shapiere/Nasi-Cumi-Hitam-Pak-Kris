// =========================================
// User.js - Punya: User 1 (Ketua)
// Model untuk tabel 'users' di PostgreSQL
// =========================================
// Struktur kolom (dari ERD):
//   id         : uuid (primary key)
//   name       : varchar
//   email      : varchar (unique)
//   password   : varchar (harus di-hash pakai bcrypt!)
//   role       : varchar ('admin' atau 'user')
//   created_at : timestamp

// Nanti di sini lo bisa taruh query SQL atau
// setup koneksi ke DB (misal pakai pg atau prisma)

// Contoh:
// import pool from '../db.js';
// export const findUserByEmail = async (email) => { ... }
// export const createUser = async (userData) => { ... }
