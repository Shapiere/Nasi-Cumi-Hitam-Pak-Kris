import prisma from "../config/prisma.js";

// REGISTER
export const registerVolunteer = async ({ user_id, project_id }) => {
  return await prisma.volunteer.create({
    data: {
      user_id,
      project_id,
      status: "pending",
    },
  });
};

// CEK SUDAH ADA
export const checkVolunteerExists = async (user_id, project_id) => {
  return await prisma.volunteer.findFirst({
    where: { user_id, project_id },
  });
};

// GET BY PROJECT
export const getVolunteersByProject = async (project_id) => {
  return await prisma.volunteer.findMany({
    where: { project_id },
    orderBy: { joined_at: "desc" },
  });
};

// GET ALL
export const getAllVolunteers = async () => {
  return await prisma.volunteer.findMany({
    orderBy: { joined_at: "desc" },
  });
};

// APPROVE
export const approveVolunteerById = async (id) => {
  return await prisma.volunteer.update({
    where: { id },
    data: { status: "accepted" },
  });
};

// REJECT
export const rejectVolunteerById = async (id) => {
  return await prisma.volunteer.update({
    where: { id },
    data: { status: "rejected" },
  });
};

// RESIGN (hapus data)
export const resignVolunteerById = async (id) => {
  return await prisma.volunteer.delete({
    where: { id },
  });
};

// ==========================================
// FUNGSI BARU UNTUK MENDUKUNG SPRINT 6
// ==========================================
export const createVolunteer = async ({ user_id, project_id }) => {
  return await prisma.volunteer.create({
    data: {
      user_id,
      project_id,
      status: "pending",
    },
  });
};

export const getVolunteersByUser = async (user_id) => {
  return await prisma.volunteer.findMany({
    where: { user_id },
    orderBy: { joined_at: "desc" },
    include: { project: true }
  });
};

export const updateVolunteerStatus = async (id, status) => {
  // mapping status "approved" ke "accepted" jika diperlukan oleh database lama
  const finalStatus = status === "approved" ? "accepted" : status;
  return await prisma.volunteer.update({
    where: { id },
    data: { status: finalStatus },
  });
};