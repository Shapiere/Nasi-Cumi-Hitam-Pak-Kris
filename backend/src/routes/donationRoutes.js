import { Router } from 'express';
import {
  createNewDonation,
  getDonationsByUserController,
  getDonationsByProjectController,
  updateDonationStatusController,
} from '../controllers/donationController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../config/multer.js';

const router = Router();

router.post('/', authMiddleware, upload.single('proof_image'), createNewDonation);
router.get('/', authMiddleware, getDonationsByUserController);
router.get('/project', getDonationsByProjectController);
router.patch('/:id/status', authMiddleware, updateDonationStatusController);

export default router;