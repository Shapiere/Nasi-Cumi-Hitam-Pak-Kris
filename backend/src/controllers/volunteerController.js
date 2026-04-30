import {
  createVolunteer,
  getVolunteersByProject,
  getVolunteersByUser,
  updateVolunteerStatus,
} from '../models/Volunteer.js';
import prisma from '../config/prisma.js';

export const joinProject = async (req, res) => {
  try {
    const { project_id } = req.body;
    const user_id = req.user.id;

    if (!project_id) {
      return res.status(400).json({
        status: 'error',
        message: 'project_id wajib diisi!',
      });
    }

    const existing = await prisma.volunteer.findFirst({
      where: { user_id, project_id },
    });

    if (existing) {
      return res.status(409).json({
        status: 'error',
        message: 'Anda sudah terdaftar sebagai volunteer di project ini!',
      });
    }

    const data = await createVolunteer({ user_id, project_id });

    return res.status(201).json({
      status: 'success',
      message: 'Berhasil mendaftar sebagai volunteer!',
      data,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

export const getVolunteersByProjectController = async (req, res) => {
  try {
    const { project_id } = req.query;

    if (!project_id) {
      return res.status(400).json({
        status: 'error',
        message: 'Query parameter project_id wajib diisi!',
      });
    }

    const data = await getVolunteersByProject(project_id);

    return res.status(200).json({
      status: 'success',
      message: 'Data volunteer berhasil diambil!',
      data,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

export const getVolunteersByUserController = async (req, res) => {
  try {
    const user_id = req.user.id;
    const data = await getVolunteersByUser(user_id);

    return res.status(200).json({
      status: 'success',
      message: 'Data volunteer user berhasil diambil!',
      data,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

export const updateVolunteerStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        status: 'error',
        message: 'ID volunteer dan status wajib diisi!',
      });
    }

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Status tidak valid! Pilih: pending, approved, atau rejected.',
      });
    }

    const data = await updateVolunteerStatus(id, status);

    return res.status(200).json({
      status: 'success',
      message: `Status volunteer berhasil diubah menjadi "${status}"`,
      data,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};