import Application from '../models/Application.js';
import JobPosting from '../models/JobPosting.js';

/**
 * @desc    Submit a job application
 * @route   POST /api/v1/applications
 * @access  Private (Job Seeker only)
 */
export const submitApplication = async (req, res) => {
  try {
    const { jobId, coverLetter, resume, answers } = req.body;

    // Validate required fields
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: 'Job ID is required',
      });
    }

    // Check if job exists and is active
    const job = await JobPosting.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found',
      });
    }

    if (job.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'This job posting is no longer accepting applications',
      });
    }

    // Check if application deadline has passed
    if (job.applicationDeadline && new Date() > new Date(job.applicationDeadline)) {
      return res.status(400).json({
        success: false,
        message: 'Application deadline has passed',
      });
    }

    // Check if user already applied
    const hasApplied = await Application.hasApplied(jobId, req.user.userId);

    if (hasApplied) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this job',
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      jobSeeker: req.user.userId,
      coverLetter,
      resume,
      answers,
      status: 'pending',
    });

    // Increment job applications count
    await job.incrementApplications();

    // Populate job and jobSeeker details
    await application.populate([
      { path: 'job', select: 'title employmentType workMode location company' },
      { path: 'jobSeeker', select: 'name email' },
    ]);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    console.error('Submit application error:', error);

    // Handle duplicate application error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this job',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message,
    });
  }
};

/**
 * @desc    Get user's applications
 * @route   GET /api/v1/applications
 * @access  Private
 */
export const getMyApplications = async (req, res) => {
  try {
    const {
      status,
      page = 1,
      limit = 10,
      sortBy = '-appliedAt',
    } = req.query;

    const query = { jobSeeker: req.user.userId };

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
      .populate({
        path: 'job',
        select: 'title employmentType workMode location salary status',
        populate: {
          path: 'employer',
          select: 'name companyName',
        },
      })
      .populate('jobSeeker', 'name email')
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
    console.error('Get my applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single application by ID
 * @route   GET /api/v1/applications/:id
 * @access  Private (Job seeker or employer)
 */
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate({
        path: 'job',
        select: 'title description requirements employmentType workMode location salary',
        populate: {
          path: 'employer',
          select: 'name email companyName',
        },
      })
      .populate('jobSeeker', 'name email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    // Check authorization - must be the applicant or the employer of the job
    const isApplicant = application.jobSeeker._id.toString() === req.user.userId.toString();
    const isEmployer = application.job.employer._id.toString() === req.user.userId.toString();

    if (!isApplicant && !isEmployer) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this application',
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('Get application by ID error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
      error: error.message,
    });
  }
};

/**
 * @desc    Update application status
 * @route   PUT /api/v1/applications/:id/status
 * @access  Private (Employer only)
 */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, note } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    // Validate status
    const validStatuses = [
      'pending',
      'reviewing',
      'shortlisted',
      'interview-scheduled',
      'interviewed',
      'offer-extended',
      'accepted',
      'rejected',
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    // Check if user is the employer of the job
    if (application.job.employer.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application',
      });
    }

    // Update status with history
    await application.updateStatus(status, req.user.userId, note);

    // Add employer note if provided
    if (note && status === 'rejected') {
      application.rejectionReason = note;
      await application.save();
    }

    // Populate for response
    await application.populate([
      {
        path: 'job',
        select: 'title employmentType',
        populate: {
          path: 'employer',
          select: 'name companyName',
        },
      },
      { path: 'jobSeeker', select: 'name email' },
    ]);

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application,
    });
  } catch (error) {
    console.error('Update application status error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: error.message,
    });
  }
};

/**
 * @desc    Withdraw application
 * @route   PUT /api/v1/applications/:id/withdraw
 * @access  Private (Job Seeker only - own application)
 */
export const withdrawApplication = async (req, res) => {
  try {
    const { reason } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    // Check if user is the applicant
    if (application.jobSeeker.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to withdraw this application',
      });
    }

    // Check if application can be withdrawn
    if (['accepted', 'rejected', 'withdrawn'].includes(application.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot withdraw application with status: ${application.status}`,
      });
    }

    // Withdraw application
    await application.withdraw(reason || 'No reason provided');

    // Populate for response
    await application.populate([
      { path: 'job', select: 'title employmentType' },
      { path: 'jobSeeker', select: 'name email' },
    ]);

    res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully',
      data: application,
    });
  } catch (error) {
    console.error('Withdraw application error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to withdraw application',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete application
 * @route   DELETE /api/v1/applications/:id
 * @access  Private (Job Seeker only - own application, only if pending)
 */
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    // Check if user is the applicant
    if (application.jobSeeker.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this application',
      });
    }

    // Only allow deletion of pending applications
    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending applications can be deleted. Use withdraw instead.',
      });
    }

    await application.deleteOne();

    // Decrement job applications count
    await JobPosting.findByIdAndUpdate(application.job, {
      $inc: { applicationsCount: -1 },
    });

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('Delete application error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to delete application',
      error: error.message,
    });
  }
};

/**
 * @desc    Get application statistics for job seeker
 * @route   GET /api/v1/applications/stats
 * @access  Private (Job Seeker)
 */
export const getApplicationStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      { $match: { jobSeeker: req.user.userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Format stats
    const formattedStats = {
      total: 0,
      pending: 0,
      reviewing: 0,
      shortlisted: 0,
      'interview-scheduled': 0,
      interviewed: 0,
      'offer-extended': 0,
      accepted: 0,
      rejected: 0,
      withdrawn: 0,
    };

    stats.forEach((stat) => {
      formattedStats[stat._id] = stat.count;
      formattedStats.total += stat.count;
    });

    res.status(200).json({
      success: true,
      data: formattedStats,
    });
  } catch (error) {
    console.error('Get application stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application statistics',
      error: error.message,
    });
  }
};
