// =========================================
// Donation.js - Punya: User 3
// Model untuk tabel 'donations' di PostgreSQL
// =========================================
// Struktur kolom (dari ERD):
//   id          : uuid (primary key)
//   user_id     : uuid (FK -> users.id)
//   project_id  : uuid (FK -> projects.id)
//   amount      : decimal
//   status      : varchar ('pending', 'success', 'failed')
//   snap_token  : varchar (token dari Midtrans Sandbox)
//   created_at  : timestamp

// Contoh:
// import pool from '../db.js';
// export const createDonation = async (data) => { ... }
// export const getDonationsByUser = async (userId) => { ... }
