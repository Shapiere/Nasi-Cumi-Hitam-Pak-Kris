import { Router } from 'express';
import {
  createNewDonation,
  getDonationsByUserController,
  getDonationsByProjectController,
  updateDonationStatusController,
} from '../controllers/donationController.js';

const router = Router();

// POST /donations
// Body: { user_id, project_id, amount, status?, snap_token? }
router.post('/', createNewDonation);

// GET /donations?user_id=xxx
// Riwayat donasi berdasarkan user
router.get('/', getDonationsByUserController);

// GET /donations/project?project_id=xxx
// Semua donasi untuk 1 project
router.get('/project', getDonationsByProjectController);

// PATCH /donations/:id/status
// Body: { status: "pending" | "success" | "failed" }
router.patch('/:id/status', updateDonationStatusController);

export default router;