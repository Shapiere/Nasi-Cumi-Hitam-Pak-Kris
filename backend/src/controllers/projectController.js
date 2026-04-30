import {
  createProject as createProjectModel,
  getAllProjects as getAllProjectsModel,
  findProjectById,
  updateProject as updateProjectModel,
  deleteProject as deleteProjectModel,
} from '../models/Project.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, target_donation, deadline } = req.body;
    const owner_id = req.user.id;

    if (!title || !description || !target_donation || !deadline) {
      return res.status(400).json({
        status: 'error',
        message: 'Judul, deskripsi, target donasi, dan deadline wajib diisi!',
      });
    }

    const parsedDeadline = new Date(deadline);
    if (isNaN(parsedDeadline.getTime())) {
      return res.status(400).json({
        status: 'error',
        message: 'Format tanggal deadline tidak valid!',
      });
    }

    const image_url = req.file ? req.file.filename : null;

    const project = await createProjectModel({
      title,
      description,
      target_donation,
      owner_id,
      deadline: parsedDeadline,
      image_url,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Project berhasil dibuat!',
      data: project,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await getAllProjectsModel();

    return res.status(200).json({
      status: 'success',
      message: 'Data project berhasil diambil!',
      data: projects,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || id.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'ID Project tidak valid.',
      });
    }

    const project = await findProjectById(id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project tidak ditemukan.',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Detail project berhasil diambil!',
      data: project,
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, target_donation, deadline } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (target_donation) updateData.target_donation = target_donation;
    if (deadline) updateData.deadline = new Date(deadline);
    if (req.file) updateData.image_url = req.file.filename;

    const updated = await updateProjectModel(id, updateData);

    return res.status(200).json({
      status: 'success',
      message: 'Project berhasil diperbarui!',
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

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProjectModel(id);

    return res.status(200).json({
      status: 'success',
      message: 'Project berhasil dihapus!',
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server.',
      error: error.message,
    });
  }
};
