import express from 'express';
import {
  uploadResumeFile,
  uploadAvatarFile,
} from '../controllers/uploadController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  uploadResume,
  uploadAvatar,
  handleUploadError,
} from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Upload resume (authenticated users only)
router.post(
  '/resume',
  authenticate,
  uploadResume.single('resume'),
  handleUploadError,
  uploadResumeFile
);

// Upload avatar (authenticated users only)
router.post(
  '/avatar',
  authenticate,
  uploadAvatar.single('avatar'),
  handleUploadError,
  uploadAvatarFile
);

export default router;
