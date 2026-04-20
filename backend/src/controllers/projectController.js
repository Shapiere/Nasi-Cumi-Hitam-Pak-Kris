import {
  createProject as createProjectModel,
  getAllProjects as getAllProjectsModel,
  findProjectById
} from '../models/Project.js';

// CREATE
export const createProject = async (req, res) => {
  try {
    const { title, description, target_donation, owner_id, deadline } = req.body;

    // Tambahan Validasi Wajib
    if (!title || !description || !target_donation || !owner_id || !deadline) {
      return res.status(400).json({
        status: 'error',
        message: 'Judul, deskripsi, target donasi, owner_id, dan deadline wajib diisi!'
      });
    }

    // Validasi format tanggal
    const parsedDeadline = new Date(deadline);
    if (isNaN(parsedDeadline.getTime())) {
      return res.status(400).json({
        status: 'error',
        message: 'Format tanggal deadline tidak valid!'
      });
    }

    const project = await createProjectModel({
      title,
      description,
      target_donation,
      owner_id,
      deadline: parsedDeadline
    });

    res.status(201).json({
      status: 'success',
      message: 'Project berhasil dibuat',
      data: project
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// GET ALL
export const getAllProjects = async (req, res) => {
  try {
    const projects = await getAllProjectsModel();

    res.status(200).json({
      status: 'success',
      message: 'Data project berhasil diambil',
      data: projects
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// GET DETAIL
export const getProjectById = async (req, res) => {
  try {
    const id = req.params.id; // Jangan di-parseInt karena ID kita adalah UUID (String Acak)

    if (!id || id.trim() === "") {
      return res.status(400).json({
        status: 'error',
        message: 'ID Project tidak valid'
      });
    }

    const project = await findProjectById(id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project tidak ditemukan'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Detail project berhasil diambil',
      data: project
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};