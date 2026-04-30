import {
  registerVolunteer,
  checkVolunteerExists,
  getAllVolunteers,
  getVolunteersByProject,
  approveVolunteerById,
  rejectVolunteerById,
  resignVolunteerById
} from "../models/Volunteer.js";

// =========================================
// JOIN PROJECT
// =========================================
export const joinProject = async (req, res) => {
  try {
    const { user_id, project_id } = req.body;

    // VALIDASI
    if (!user_id || !project_id) {
      return res.status(400).json({
        status: "error",
        message: "user_id dan project_id wajib diisi!",
      });
    }

    // CEK SUDAH TERDAFTAR
    const existing = await checkVolunteerExists(user_id, project_id);

    if (existing) {
      return res.status(400).json({
        status: "error",
        message: "Anda sudah terdaftar di project ini!",
      });
    }

    // SIMPAN
    const data = await registerVolunteer({ user_id, project_id });

    return res.status(201).json({
      status: "success",
      message: "Berhasil daftar sebagai relawan!",
      data,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// =========================================
// GET VOLUNTEERS
// =========================================
export const getVolunteers = async (req, res) => {
  try {
    const { project_id } = req.query;

    let data;

    if (project_id) {
      data = await getVolunteersByProject(project_id);
    } else {
      data = await getAllVolunteers();
    }

    return res.status(200).json({
      status: "success",
      message: "Data volunteers berhasil diambil!",
      data,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
    });
  }
};

// =========================================
// APPROVE
// =========================================
export const approveVolunteer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "ID volunteer wajib diisi!",
      });
    }

    const data = await approveVolunteerById(id);

    return res.status(200).json({
      status: "success",
      message: "Volunteer berhasil di-approve!",
      data,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
    });
  }
};

// =========================================
// REJECT
// =========================================
export const rejectVolunteer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "ID volunteer wajib diisi!",
      });
    }

    const data = await rejectVolunteerById(id);

    return res.status(200).json({
      status: "success",
      message: "Volunteer berhasil ditolak!",
      data,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
    });
  }
};

// =========================================
// RESIGN
// =========================================
export const resignVolunteer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "ID volunteer wajib diisi!",
      });
    }

    const data = await resignVolunteerById(id);

    return res.status(200).json({
      status: "success",
      message: "Berhasil keluar dari project!",
      data,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
    });
  }
};