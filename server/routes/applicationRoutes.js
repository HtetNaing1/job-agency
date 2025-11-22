import express from 'express';
import {
  submitApplication,
  getMyApplications,
  getApplicationById,
  updateApplicationStatus,
  withdrawApplication,
  deleteApplication,
  getApplicationStats,
} from '../controllers/applicationController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireJobSeeker, requireEmployer, requireAnyRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Job Seeker routes
router.post('/', authenticate, requireJobSeeker, submitApplication);
router.get('/', authenticate, getMyApplications);
router.get('/stats', authenticate, requireJobSeeker, getApplicationStats);

// Shared routes (job seeker or employer)
router.get('/:id', authenticate, requireAnyRole('jobseeker', 'employer'), getApplicationById);

// Job Seeker specific actions
router.put('/:id/withdraw', authenticate, requireJobSeeker, withdrawApplication);
router.delete('/:id', authenticate, requireJobSeeker, deleteApplication);

// Employer specific actions
router.put('/:id/status', authenticate, requireEmployer, updateApplicationStatus);

export default router;
