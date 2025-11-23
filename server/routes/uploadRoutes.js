import express from 'express';
import {
  uploadFile,
  uploadResumeFile,
  uploadAvatarFile,
} from '../controllers/uploadController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  uploadResume,
  uploadAvatar,
  uploadGeneric,
  handleUploadError,
} from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Generic upload endpoint (authenticated users only)
router.post(
  '/',
  authenticate,
  uploadGeneric.single('file'),
  handleUploadError,
  uploadFile
);

// Upload resume (authenticated users only) - legacy endpoint
router.post(
  '/resume',
  authenticate,
  uploadResume.single('resume'),
  handleUploadError,
  uploadResumeFile
);

// Upload avatar (authenticated users only) - legacy endpoint
router.post(
  '/avatar',
  authenticate,
  uploadAvatar.single('avatar'),
  handleUploadError,
  uploadAvatarFile
);

export default router;
