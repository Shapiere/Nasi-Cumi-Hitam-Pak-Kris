// =====================================================
// models/Donation.js - Punya: User 3 (Donation)
// Query database untuk tabel 'donations'
// =====================================================

import prisma from '../config/prisma.js';

// Buat donasi baru
export const createDonation = async (donationData) => {
  return await prisma.donation.create({
    data: donationData,
  });
};

// Ambil riwayat donasi berdasarkan user
export const getDonationsByUser = async (user_id) => {
  return await prisma.donation.findMany({
    where: { user_id },
    include: {
      project: {
        select: { id: true, title: true },
      },
    },
    orderBy: { created_at: 'desc' },
  });
};

// Ambil semua donasi untuk satu project
export const getDonationsByProject = async (project_id) => {
  return await prisma.donation.findMany({
    where: { project_id },
    include: {
      user: {
        select: { id: true, name: true },
      },
    },
    orderBy: { created_at: 'desc' },
  });
};

// Update status donasi (setelah payment gateway callback)
export const updateDonationStatus = async (id, status) => {
  return await prisma.donation.update({
    where: { id },
    data: { status },
  });
};
