import {
  createDonation,
  getDonationsByUser,
  getDonationsByProject,
  updateDonationStatus,
} from '../models/Donation.js';

// =====================================================
// POST /donations
// Buat donasi baru
// =====================================================
export const createNewDonation = async (req, res) => {
  try {
    const { user_id, project_id, amount, status, snap_token } = req.body;

    // Validasi input wajib
    if (!user_id || !project_id || !amount) {
      return res.status(400).json({
        status: 'error',
        message: 'user_id, project_id, dan amount wajib diisi!',
      });
    }

    // Validasi amount harus angka dan lebih dari 0
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Amount harus berupa angka dan lebih dari 0!',
      });
    }

    // Simpan donasi ke database
    const donation = await createDonation({
      user_id,
      project_id,
      amount: parsedAmount,
      status: status || 'pending',
      snap_token: snap_token || null,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Donasi berhasil dibuat!',
      data: donation,
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
// GET /donations?user_id=xxx
// Ambil riwayat donasi berdasarkan user
// =====================================================
export const getDonationsByUserController = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Query parameter user_id wajib diisi!',
      });
    }

    const donations = await getDonationsByUser(user_id);

    return res.status(200).json({
      status: 'success',
      message: 'Riwayat donasi berhasil diambil!',
      data: donations,
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
// GET /donations/project?project_id=xxx
// Ambil semua donasi untuk satu project
// =====================================================
export const getDonationsByProjectController = async (req, res) => {
  try {
    const { project_id } = req.query;

    if (!project_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Query parameter project_id wajib diisi!',
      });
    }

    const donations = await getDonationsByProject(project_id);

    return res.status(200).json({
      status: 'success',
      message: 'Data donasi project berhasil diambil!',
      data: donations,
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
// PATCH /donations/:id/status
// Update status donasi (pending -> success/failed)
// =====================================================
export const updateDonationStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        status: 'error',
        message: 'Status wajib diisi! (pending / success / failed)',
      });
    }

    const validStatuses = ['pending', 'success', 'failed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Status tidak valid! Pilih: pending, success, atau failed.',
      });
    }

    const updated = await updateDonationStatus(id, status);

    return res.status(200).json({
      status: 'success',
      message: 'Status donasi berhasil diperbarui!',
      data: updated,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};