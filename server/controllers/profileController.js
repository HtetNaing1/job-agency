import User from '../models/User.js';

// Get current user profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        err: 1,
        message: 'User not found',
      });
    }

    res.json({
      err: 0,
      message: 'Profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      err: 1,
      message: error.message || 'Failed to retrieve profile',
    });
  }
};

// Get user profile by ID
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        err: 1,
        message: 'User not found',
      });
    }

    res.json({
      err: 0,
      message: 'Profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      err: 1,
      message: error.message || 'Failed to retrieve profile',
    });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      location,
      bio,
      avatar,
      resume,
      skills,
      experience,
      education,
      certifications,
      companyName,
      companySize,
      industry,
      website,
      companyDescription,
      trainingProvider,
      courses,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        err: 1,
        message: 'User not found',
      });
    }

    // Update common fields
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    // Update role-specific fields
    if (user.role === 'jobseeker') {
      if (resume !== undefined) user.resume = resume;
      if (skills !== undefined) user.skills = skills;
      if (experience !== undefined) user.experience = experience;
      if (education !== undefined) user.education = education;
      if (certifications !== undefined) user.certifications = certifications;
    } else if (user.role === 'employer') {
      if (companyName !== undefined) user.companyName = companyName;
      if (companySize !== undefined) user.companySize = companySize;
      if (industry !== undefined) user.industry = industry;
      if (website !== undefined) user.website = website;
      if (companyDescription !== undefined) user.companyDescription = companyDescription;
    } else if (user.role === 'trainingProvider') {
      if (trainingProvider !== undefined) user.trainingProvider = trainingProvider;
      if (courses !== undefined) user.courses = courses;
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select('-password');

    res.json({
      err: 0,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      err: 1,
      message: error.message || 'Failed to update profile',
    });
  }
};

// Complete onboarding
export const completeOnboarding = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        err: 1,
        message: 'User not found',
      });
    }

    // Update user with onboarding data
    const {
      name,
      phone,
      location,
      bio,
      avatar,
      resume,
      skills,
      experience,
      education,
      certifications,
      companyName,
      companySize,
      industry,
      website,
      companyDescription,
      trainingProvider,
      courses,
    } = req.body;

    // Update common fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    // Update role-specific fields based on user role
    if (user.role === 'jobseeker') {
      if (resume) user.resume = resume;
      if (skills) user.skills = skills;
      if (experience) user.experience = experience;
      if (education) user.education = education;
      if (certifications) user.certifications = certifications;
    } else if (user.role === 'employer') {
      if (companyName) user.companyName = companyName;
      if (companySize) user.companySize = companySize;
      if (industry) user.industry = industry;
      if (website) user.website = website;
      if (companyDescription) user.companyDescription = companyDescription;
    } else if (user.role === 'trainingProvider') {
      if (trainingProvider) user.trainingProvider = trainingProvider;
      if (courses) user.courses = courses;
    }

    // Mark onboarding as complete
    user.firstTimeLogin = false;

    await user.save();

    const updatedUser = await User.findById(user._id).select('-password');

    res.json({
      err: 0,
      message: 'Onboarding completed successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Complete onboarding error:', error);
    res.status(500).json({
      err: 1,
      message: error.message || 'Failed to complete onboarding',
    });
  }
};
