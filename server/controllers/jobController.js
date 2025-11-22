import JobPosting from '../models/JobPosting.js';
import Application from '../models/Application.js';

/**
 * @desc    Create a new job posting
 * @route   POST /api/v1/jobs
 * @access  Private (Employer only)
 */
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      responsibilities,
      employmentType,
      workMode,
      location,
      salary,
      skills,
      experience,
      education,
      category,
      benefits,
      applicationDeadline,
      status,
    } = req.body;

    // Create job posting
    const job = await JobPosting.create({
      title,
      description,
      requirements,
      responsibilities,
      employmentType,
      workMode,
      location,
      salary,
      skills,
      experience,
      education,
      category,
      benefits,
      applicationDeadline,
      status: status || 'active',
      employer: req.user.userId, // From auth middleware
    });

    // Populate employer details
    await job.populate('employer', 'name email companyName');

    res.status(201).json({
      success: true,
      message: 'Job posting created successfully',
      data: job,
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create job posting',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all job postings with filters and search
 * @route   GET /api/v1/jobs
 * @access  Public
 */
export const getAllJobs = async (req, res) => {
  try {
    const {
      search,
      category,
      employmentType,
      workMode,
      location,
      minSalary,
      maxSalary,
      skills,
      experience,
      education,
      status,
      page = 1,
      limit = 10,
      sortBy = '-createdAt', // Default: newest first
    } = req.query;

    // Build query
    const query = {};

    // Default to active jobs for public view
    query.status = status || 'active';

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by employment type
    if (employmentType) {
      query.employmentType = employmentType;
    }

    // Filter by work mode
    if (workMode) {
      query.workMode = workMode;
    }

    // Filter by location (city)
    if (location) {
      query['location.city'] = { $regex: location, $options: 'i' };
    }

    // Filter by salary range
    if (minSalary || maxSalary) {
      query['salary.min'] = {};
      if (minSalary) query['salary.min'].$gte = Number(minSalary);
      if (maxSalary) query['salary.max'] = { $lte: Number(maxSalary) };
    }

    // Filter by skills (match any of the provided skills)
    if (skills) {
      const skillsArray = Array.isArray(skills) ? skills : skills.split(',');
      query.skills = { $in: skillsArray };
    }

    // Filter by education
    if (education) {
      query.education = education;
    }

    // Filter by experience
    if (experience) {
      query['experience.min'] = { $lte: Number(experience) };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const jobs = await JobPosting.find(query)
      .populate('employer', 'name email companyName')
      .sort(sortBy)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await JobPosting.countDocuments(query);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: jobs,
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job postings',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single job posting by ID
 * @route   GET /api/v1/jobs/:id
 * @access  Public
 */
export const getJobById = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id).populate(
      'employer',
      'name email companyName'
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    // Increment view count
    await job.incrementViews();

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Get job by ID error:', error);

    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch job posting',
      error: error.message,
    });
  }
};

/**
 * @desc    Update job posting
 * @route   PUT /api/v1/jobs/:id
 * @access  Private (Employer only - own jobs)
 */
export const updateJob = async (req, res) => {
  try {
    // Find job
    let job = await JobPosting.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    // Check if user is the employer who created this job
    if (job.employer.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job posting',
      });
    }

    // Update job
    job = await JobPosting.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Run schema validators
    }).populate('employer', 'name email companyName');

    res.status(200).json({
      success: true,
      message: 'Job posting updated successfully',
      data: job,
    });
  } catch (error) {
    console.error('Update job error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update job posting',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete job posting
 * @route   DELETE /api/v1/jobs/:id
 * @access  Private (Employer only - own jobs)
 */
export const deleteJob = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    // Check if user is the employer who created this job
    if (job.employer.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job posting',
      });
    }

    // Check if job has applications
    const applicationsCount = await Application.countDocuments({ job: job._id });

    if (applicationsCount > 0) {
      // Instead of deleting, change status to closed
      job.status = 'closed';
      await job.save();

      return res.status(200).json({
        success: true,
        message: 'Job posting closed. Cannot delete jobs with applications.',
        data: job,
      });
    }

    // Delete job
    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job posting deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('Delete job error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete job posting',
      error: error.message,
    });
  }
};

/**
 * @desc    Get employer's job postings
 * @route   GET /api/v1/jobs/my-postings
 * @access  Private (Employer only)
 */
export const getMyJobs = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sortBy = '-createdAt' } = req.query;

    const query = { employer: req.user.userId };

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Fetch jobs
    const jobs = await JobPosting.find(query)
      .populate('employer', 'name email companyName')
      .sort(sortBy)
      .skip(skip)
      .limit(limitNum);

    // Get total count
    const total = await JobPosting.countDocuments(query);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: jobs,
    });
  } catch (error) {
    console.error('Get my jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your job postings',
      error: error.message,
    });
  }
};

/**
 * @desc    Get applications for a specific job
 * @route   GET /api/v1/jobs/:id/applications
 * @access  Private (Employer only - own jobs)
 */
export const getJobApplications = async (req, res) => {
  try {
    // Check if job exists and belongs to employer
    const job = await JobPosting.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    if (job.employer.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view applications for this job',
      });
    }

    const { status, page = 1, limit = 20, sortBy = '-appliedAt' } = req.query;

    const query = { job: req.params.id };

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Fetch applications
    const applications = await Application.find(query)
      .populate('jobSeeker', 'name email')
      .populate('job', 'title employmentType')
      .sort(sortBy)
      .skip(skip)
      .limit(limitNum);

    // Get total count
    const total = await Application.countDocuments(query);

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: applications,
    });
  } catch (error) {
    console.error('Get job applications error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message,
    });
  }
};
