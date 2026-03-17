// =====================================================
// index.js - File utama server CareConnect API
// Jalanin dengan: npm run dev (pakai nodemon)
// atau: node index.js (tanpa auto-reload)
// =====================================================

import express from 'express';

// --- Import semua routes ---
// Contoh cara hubungin route ke server (pake authRoutes sebagai contoh)
import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import donationRoutes from './src/routes/donationRoutes.js';
import volunteerRoutes from './src/routes/volunteerRoutes.js';

const app = express();
const PORT = 3000;

// --- Middleware bawaan Express ---
// Ini biar server bisa baca JSON dari request body
app.use(express.json());

// =====================================================
// ENDPOINT UTAMA - Cek server masih hidup ga
// =====================================================
app.get('/', (req, res) => {
  res.json({ message: 'API CareConnect Sudah Jalan' });
});

// =====================================================
// CARA HUBUNGIN ROUTES KE SERVER
// =====================================================
// Format: app.use('/PREFIX_URL', namaRoutes)
// Semua endpoint di dalam file route akan punya prefix ini

// User 1 (Ketua) - Auth & User Management
// Contoh: POST /auth/login, POST /auth/register
app.use('/auth', authRoutes);

// User 2 - Project Discovery & Management
// Contoh: GET /projects, POST /projects
app.use('/projects', projectRoutes);

// User 3 - Donation System
// Contoh: POST /donations, GET /donations/history
app.use('/donations', donationRoutes);

// User 4 - Volunteer Recruitment
// Contoh: POST /volunteers, GET /volunteers/:projectId
app.use('/volunteers', volunteerRoutes);

// =====================================================
// JALANIN SERVERNYA!
// =====================================================
app.listen(PORT, () => {
  console.log(`Server CareConnect nyala di http://localhost:${PORT}`);
  console.log('Tekan Ctrl+C kalau mau matiin servernya');
});
