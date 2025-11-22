import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Job title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      trim: true,
    },
    requirements: {
      type: String,
      required: [true, 'Job requirements are required'],
      trim: true,
    },
    responsibilities: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship', 'temporary'],
      required: [true, 'Employment type is required'],
    },
    workMode: {
      type: String,
      enum: ['on-site', 'remote', 'hybrid'],
      required: [true, 'Work mode is required'],
    },
    location: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      address: { type: String, trim: true },
    },
    salary: {
      min: { type: Number, min: 0 },
      max: { type: Number, min: 0 },
      currency: { type: String, default: 'USD' },
      period: {
        type: String,
        enum: ['hourly', 'monthly', 'yearly'],
        default: 'yearly'
      },
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      min: { type: Number, min: 0, default: 0 },
      max: { type: Number, min: 0 },
    },
    education: {
      type: String,
      enum: ['high-school', 'associate', 'bachelor', 'master', 'phd', 'any'],
      default: 'any',
    },
    category: {
      type: String,
      trim: true,
    },
    benefits: {
      type: [String],
      default: [],
    },
    applicationDeadline: {
      type: Date,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Employer is required'],
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'closed', 'filled'],
      default: 'active',
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Indexes for better query performance
jobPostingSchema.index({ employer: 1, status: 1 });
jobPostingSchema.index({ category: 1, status: 1 });
jobPostingSchema.index({ createdAt: -1 });
jobPostingSchema.index({ 'location.city': 1, status: 1 });

// Virtual populate for applications
jobPostingSchema.virtual('applications', {
  ref: 'Application',
  localField: '_id',
  foreignField: 'job',
});

// Method to increment views
jobPostingSchema.methods.incrementViews = async function () {
  this.viewsCount += 1;
  await this.save();
};

// Method to increment applications
jobPostingSchema.methods.incrementApplications = async function () {
  this.applicationsCount += 1;
  await this.save();
};

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

export default JobPosting;
