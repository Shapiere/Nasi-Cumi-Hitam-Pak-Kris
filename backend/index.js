// =====================================================
// index.js - File utama server CareConnect API
// Jalanin dengan: npm run dev (pakai nodemon)
// atau: node index.js (tanpa auto-reload)
// =====================================================

import express from 'express';
import prisma from './src/config/prisma.js';

// --- Import semua routes ---
import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import donationRoutes from './src/routes/donationRoutes.js';
import volunteerRoutes from './src/routes/volunteerRoutes.js';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware bawaan Express ---
app.use(express.json());

// =====================================================
// ENDPOINT UTAMA - Cek server masih hidup ga
// =====================================================
app.get('/', (req, res) => {
  res.json({ message: 'API CareConnect Sudah Jalan ✅' });
});

// =====================================================
// ENDPOINT TEST KONEKSI DATABASE
// GET /db-test => ngejalanin SELECT sederhana ke DB
// =====================================================
app.get('/db-test', async (req, res) => {
  try {
    // Test query sederhana: hitung jumlah user di database
    const userCount = await prisma.user.count();
    res.json({
      status: 'success',
      message: 'Koneksi ke database PostgreSQL berhasil! ✅',
      data: {
        total_users: userCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Koneksi ke database GAGAL ❌',
      error: error.message,
    });
  }
});

// =====================================================
// ROUTES
// =====================================================
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/donations', donationRoutes);
app.use('/volunteers', volunteerRoutes);

// =====================================================
// JALANIN SERVER + UJI KONEKSI DATABASE
// =====================================================
async function main() {
  try {
    // Coba konek ke database saat server pertama nyala
    await prisma.$connect();
    console.log('✅ Koneksi ke database PostgreSQL berhasil!');

    // Izinkan folder 'uploads' diakses secara publik via browser
    app.use('/uploads', express.static('uploads'));

    // Handler error khusus dari Multer
    app.use((err, req, res, next) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ status: 'error', message: `Upload gagal: ${err.message}` });
      }
      if (err) {
        return res.status(400).json({ status: 'error', message: err.message });
      }
      next();
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server CareConnect nyala di http://localhost:${PORT}`);
      console.log(`🔍 Cek koneksi DB: http://localhost:${PORT}/db-test`);
      console.log('Tekan Ctrl+C kalau mau matiin servernya');
    });
  } catch (error) {
    console.error('❌ Gagal konek ke database:', error.message);
    console.error('Pastikan PostgreSQL kamu sudah nyala dan .env sudah dikonfigurasi!');
    process.exit(1);
  }
}

main();
