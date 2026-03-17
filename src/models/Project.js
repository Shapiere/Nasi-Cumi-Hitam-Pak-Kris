// =========================================
// Project.js - Punya: User 2
// Model untuk tabel 'projects' di PostgreSQL
// =========================================
// Struktur kolom (dari ERD):
//   id               : uuid (primary key)
//   title            : varchar
//   description      : text
//   image_url        : varchar
//   target_donation  : decimal
//   current_donation : decimal
//   deadline         : date
//   owner_id         : uuid (FK -> users.id)
//   created_at       : timestamp

// Contoh:
// import pool from '../db.js';
// export const getAllProjects = async () => { ... }
// export const getProjectById = async (id) => { ... }
