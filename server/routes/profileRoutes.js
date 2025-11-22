import express from 'express';
import {
  getMyProfile,
  getUserProfile,
  updateProfile,
  completeOnboarding,
} from '../controllers/profileController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get current user profile
router.get('/', authenticate, getMyProfile);

// Get user profile by ID
router.get('/:id', authenticate, getUserProfile);

// Update profile
router.put('/', authenticate, updateProfile);

// Complete onboarding
router.post('/onboarding', authenticate, completeOnboarding);

export default router;
