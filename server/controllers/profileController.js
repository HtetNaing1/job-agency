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
      // Common fields
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phone,
      address,
      city,
      state,
      zipCode,
      bio,
      avatar,
      linkedinUrl,

      // Job seeker fields
      resume,
      skills,
      experienceLevel,
      currentRole,
      experience,
      education,
      certifications,
      jobType,
      salaryRange,
      locationPreferences,
      remoteWork,
      portfolioUrl,

      // Employer fields
      companySize,
      industry,
      website,
      companyDescription,
      positionsSeeking,
      departmentFocus,
      hiringTimeline,

      // Training provider fields
      courses,
      certificationTypes,
      trainingFormats,
      pricingModel,
      programDuration,
      studentCapacity,
      specialPrograms,
    } = req.body;

    // Update common fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (firstName && lastName) user.name = `${firstName} ${lastName}`;
    if (gender) user.gender = gender;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (city) user.city = city;
    if (state) user.state = state;
    if (zipCode) user.zipCode = zipCode;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;
    if (linkedinUrl) user.linkedinUrl = linkedinUrl;

    // Create location string from address components
    if (city || state) {
      user.location = [city, state].filter(Boolean).join(', ');
    }

    // Update role-specific fields based on user role
    if (user.role === 'jobseeker') {
      if (resume) user.resume = resume;
      if (skills) user.skills = skills;
      if (experienceLevel) user.experienceLevel = experienceLevel;
      if (currentRole) user.currentRole = currentRole;
      if (experience) user.experience = experience;
      if (education) user.education = education;
      if (certifications) user.certifications = certifications;
      if (jobType) user.jobType = jobType;
      if (salaryRange) user.salaryRange = salaryRange;
      if (locationPreferences) user.locationPreferences = locationPreferences;
      if (remoteWork) user.remoteWork = remoteWork;
      if (portfolioUrl) user.portfolioUrl = portfolioUrl;
    } else if (user.role === 'employer') {
      if (companySize) user.companySize = companySize;
      if (industry) user.industry = industry;
      if (website) user.website = website;
      if (companyDescription) user.companyDescription = companyDescription;
      if (positionsSeeking) user.positionsSeeking = positionsSeeking;
      if (departmentFocus) user.departmentFocus = departmentFocus;
      if (hiringTimeline) user.hiringTimeline = hiringTimeline;
    } else if (user.role === 'trainingProvider') {
      if (courses) user.courses = courses;
      if (certificationTypes) user.certificationTypes = certificationTypes;
      if (trainingFormats) user.trainingFormats = trainingFormats;
      if (pricingModel) user.pricingModel = pricingModel;
      if (programDuration) user.programDuration = programDuration;
      if (studentCapacity) user.studentCapacity = studentCapacity;
      if (specialPrograms) user.specialPrograms = specialPrograms;
    }

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
