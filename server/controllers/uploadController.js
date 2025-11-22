/**
 * @desc    Upload resume file
 * @route   POST /api/v1/upload/resume
 * @access  Private
 */
export const uploadResumeFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    // File info from multer
    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      // URL that can be used to access the file
      url: `/uploads/resumes/${req.file.filename}`,
    };

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: fileInfo,
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload resume',
      error: error.message,
    });
  }
};

/**
 * @desc    Upload avatar file
 * @route   POST /api/v1/upload/avatar
 * @access  Private
 */
export const uploadAvatarFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    // File info from multer
    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      // URL that can be used to access the file
      url: `/uploads/avatars/${req.file.filename}`,
    };

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: fileInfo,
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload avatar',
      error: error.message,
    });
  }
};
