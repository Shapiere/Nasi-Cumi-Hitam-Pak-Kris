// =====================================================
// models/Volunteer.js - Punya: User 4 (Volunteer)
// Query database untuk tabel 'volunteers'
// =====================================================

import prisma from '../config/prisma.js';

// Daftarkan user sebagai volunteer di sebuah project
export const createVolunteer = async (volunteerData) => {
  return await prisma.volunteer.create({
    data: volunteerData,
  });
};

// Ambil semua volunteer untuk satu project
export const getVolunteersByProject = async (project_id) => {
  return await prisma.volunteer.findMany({
    where: { project_id },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { joined_at: 'desc' },
  });
};

// Ambil semua project yang diikuti oleh seorang user sebagai volunteer
export const getVolunteersByUser = async (user_id) => {
  return await prisma.volunteer.findMany({
    where: { user_id },
    include: {
      project: {
        select: { id: true, title: true },
      },
    },
    orderBy: { joined_at: 'desc' },
  });
};

// Update status volunteer (accept/reject oleh admin/owner project)
export const updateVolunteerStatus = async (id, status) => {
  return await prisma.volunteer.update({
    where: { id },
    data: { status },
  });
};
