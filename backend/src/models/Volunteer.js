// =========================================
// Volunteer.js - Punya: User 4
// Model untuk tabel 'volunteers' di PostgreSQL
// =========================================
// Struktur kolom (dari ERD):
//   id          : uuid (primary key)
//   user_id     : uuid (FK -> users.id)
//   project_id  : uuid (FK -> projects.id)
//   status      : varchar ('pending', 'approved', 'rejected')
//   joined_at   : timestamp

// Contoh:
// import pool from '../db.js';
// export const registerVolunteer = async (data) => { ... }
// export const getVolunteersByProject = async (projectId) => { ... }
