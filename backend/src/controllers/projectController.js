import {
  createProject as createProjectModel,
  getAllProjects as getAllProjectsModel,
  findProjectById
} from '../models/Project.js';

// CREATE
export const createProject = async (req, res) => {
  try {
    const { title, description, target_donation } = req.body;

    const project = await createProjectModel({
      title,
      description,
      target_donation
    });

    res.status(201).json({
      message: 'Project berhasil dibuat',
      data: project
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// GET ALL
export const getAllProjects = async (req, res) => {
  try {
    const projects = await getAllProjectsModel();

    res.status(200).json({
      message: 'Data project berhasil diambil',
      data: projects
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET DETAIL
export const getProjectById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(404).json({
        message: 'Project tidak ditemukan'
      });
    }

    const project = await findProjectById(id);

    if (!project) {
      return res.status(404).json({
        message: 'Project tidak ditemukan'
      });
    }

    res.status(200).json({
      message: 'Detail project berhasil diambil',
      data: project
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};