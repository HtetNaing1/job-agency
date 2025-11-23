import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create subdirectories for different file types
const resumesDir = path.join(uploadsDir, 'resumes');
const avatarsDir = path.join(uploadsDir, 'avatars');
const coverLettersDir = path.join(uploadsDir, 'coverLetters');
const documentsDir = path.join(uploadsDir, 'documents');

const dirs = [resumesDir, avatarsDir, coverLettersDir, documentsDir];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage for resumes
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resumesDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: userId-timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${req.user.userId}-${uniqueSuffix}-${sanitizedBaseName}${ext}`);
  },
});

// Configure storage for avatars
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${req.user.userId}-${uniqueSuffix}${ext}`);
  },
});

// File filter for resumes (PDF, DOC, DOCX)
const resumeFileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only PDF, DOC, and DOCX files are allowed for resumes.'
      ),
      false
    );
  }
};

// File filter for avatars (images only)
const avatarFileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only JPEG, JPG, PNG, and WEBP images are allowed for avatars.'
      ),
      false
    );
  }
};

// Create multer instances
export const uploadResume = multer({
  storage: resumeStorage,
  fileFilter: resumeFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size for resumes
  },
});

export const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: avatarFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max file size for avatars
  },
});

// Generic file upload handler
const genericStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type || 'document';
    let destDir;

    switch(type) {
      case 'resume':
        destDir = resumesDir;
        break;
      case 'avatar':
        destDir = avatarsDir;
        break;
      case 'coverLetter':
        destDir = coverLettersDir;
        break;
      default:
        destDir = documentsDir;
    }

    cb(null, destDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${req.user.userId}-${uniqueSuffix}-${sanitizedBaseName}${ext}`);
  },
});

// Generic file filter
const genericFileFilter = (req, file, cb) => {
  const type = req.body.type || 'document';

  if (type === 'avatar') {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and WEBP images are allowed for avatars.'), false);
    }
  } else {
    // For resumes, cover letters, and documents - allow PDF and DOC files
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
    }
  }
};

export const uploadGeneric = multer({
  storage: genericStorage,
  fileFilter: genericFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// Middleware to handle multer errors
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB for resumes and 2MB for avatars.',
      });
    }
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next();
};
