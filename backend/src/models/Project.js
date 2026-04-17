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
  return await prisma.project.create({
    data: projectData,
  });
};

// Update project
export const updateProject = async (id, projectData) => {
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
