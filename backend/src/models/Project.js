// =====================================================
// models/Project.js - Punya: User 2 (Project)
// Query database untuk tabel 'projects'
// =====================================================

import prisma from '../config/prisma.js';

// Ambil semua project (untuk halaman discovery)
export const getAllProjects = async () => {
  return await prisma.project.findMany({
    include: {
      owner: {
        select: { id: true, name: true },
      },
    },
    orderBy: { created_at: 'desc' },
  });
};

// Ambil satu project berdasarkan ID
export const findProjectById = async (id) => {
  return await prisma.project.findUnique({
    where: { id },
    include: {
      owner: {
        select: { id: true, name: true },
      },
    },
  });
};

// Buat project baru
export const createProject = async (projectData) => {
  // Validasi target_donation angka dan tidak negatif
  const target = parseFloat(projectData.target_donation);

  if (isNaN(target)) {
    throw new Error('target_donation wajib berupa angka');
  }

  if (target < 0) {
    throw new Error('target_donation tidak boleh negatif');
  }

  return await prisma.project.create({
    data: {
      ...projectData,
      target_donation: target,
    },
  });
};

// Update project
export const updateProject = async (id, projectData) => {
  if (projectData.target_donation !== undefined) {
    const target = parseFloat(projectData.target_donation);

    if (isNaN(target)) {
      throw new Error('target_donation wajib berupa angka');
    }

    if (target < 0) {
      throw new Error('target_donation tidak boleh negatif');
    }

    projectData.target_donation = target;
  }

  return await prisma.project.update({
    where: { id },
    data: projectData,
  });
};

// Hapus project
export const deleteProject = async (id) => {
  return await prisma.project.delete({
    where: { id },
  });
};