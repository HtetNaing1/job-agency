import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
  getJobApplications,
} from '../controllers/jobController.js';
import { authenticate, optionalAuth } from '../middleware/authMiddleware.js';
import { requireEmployer } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllJobs); // Optional auth for personalized results

// Protected routes - Employer only
router.post('/', authenticate, requireEmployer, createJob);
router.get('/my-postings', authenticate, requireEmployer, getMyJobs);

// Job-specific routes
router.get('/:id', getJobById); // Public
router.put('/:id', authenticate, requireEmployer, updateJob); // Owner only
router.delete('/:id', authenticate, requireEmployer, deleteJob); // Owner only

// Applications for a job
router.get('/:id/applications', authenticate, requireEmployer, getJobApplications);

export default router;
