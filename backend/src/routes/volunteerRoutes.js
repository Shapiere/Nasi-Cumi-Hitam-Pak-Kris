import { Router } from "express";
import {
  joinProject,
  getVolunteers,
  approveVolunteer,
  rejectVolunteer,
  resignVolunteer
} from "../controllers/volunteerController.js";

const router = Router();

// daftar volunteer
router.post("/", joinProject);

// ambil data volunteer
router.get("/", getVolunteers);

// approve
router.put("/:id/approve", approveVolunteer);

// reject
router.put("/:id/reject", rejectVolunteer);

// resign
router.delete("/:id", resignVolunteer);

export default router;