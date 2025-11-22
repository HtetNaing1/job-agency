import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPosting',
      required: [true, 'Job is required'],
    },
    jobSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Job seeker is required'],
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [2000, 'Cover letter cannot exceed 2000 characters'],
    },
    resume: {
      filename: { type: String },
      url: { type: String },
      uploadedAt: { type: Date, default: Date.now },
    },
    status: {
      type: String,
      enum: [
        'pending',
        'reviewing',
        'shortlisted',
        'interview-scheduled',
        'interviewed',
        'offer-extended',
        'accepted',
        'rejected',
        'withdrawn',
      ],
      default: 'pending',
    },
    statusHistory: [
      {
        status: { type: String },
        changedAt: { type: Date, default: Date.now },
        changedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        note: { type: String },
      },
    ],
    answers: {
      type: Map,
      of: String,
    },
    employerNotes: {
      type: String,
      trim: true,
    },
    withdrawalReason: {
      type: String,
      trim: true,
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate applications
applicationSchema.index({ job: 1, jobSeeker: 1 }, { unique: true });

// Indexes for queries
applicationSchema.index({ jobSeeker: 1, status: 1 });
applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ appliedAt: -1 });

// Method to update status with history tracking
applicationSchema.methods.updateStatus = async function (
  newStatus,
  changedBy,
  note = ''
) {
  const oldStatus = this.status;

  // Add to status history
  this.statusHistory.push({
    status: newStatus,
    changedAt: new Date(),
    changedBy,
    note,
  });

  // Update current status
  this.status = newStatus;

  await this.save();

  return { oldStatus, newStatus };
};

// Method to withdraw application
applicationSchema.methods.withdraw = async function (reason) {
  this.status = 'withdrawn';
  this.withdrawalReason = reason;
  this.statusHistory.push({
    status: 'withdrawn',
    changedAt: new Date(),
    changedBy: this.jobSeeker,
    note: reason,
  });

  await this.save();
};

// Static method to check if user already applied
applicationSchema.statics.hasApplied = async function (jobId, jobSeekerId) {
  const application = await this.findOne({
    job: jobId,
    jobSeeker: jobSeekerId,
  });
  return !!application;
};

const Application = mongoose.model('Application', applicationSchema);

export default Application;
