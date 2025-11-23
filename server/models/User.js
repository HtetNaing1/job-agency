import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // Core fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["jobseeker", "employer", "trainingProvider"],
      default: "jobseeker"
    },

    // Common profile fields
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    dateOfBirth: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    location: { type: String }, // Legacy field, kept for compatibility
    bio: { type: String },
    avatar: { type: String },
    linkedinUrl: { type: String },

    // Job seeker specific fields
    resume: { type: String },
    skills: [{ type: String }],
    experienceLevel: { type: String },
    currentRole: { type: String },
    experience: { type: String }, // Legacy field
    education: { type: String },
    certifications: [{ type: String }],
    jobType: [{ type: String }], // Preferred job types
    salaryRange: { type: String },
    locationPreferences: [{ type: String }],
    remoteWork: { type: String },
    portfolioUrl: { type: String },

    // Employer specific fields
    companyName: { type: String }, // Required during registration for employer
    companySize: { type: String },
    industry: { type: String },
    website: { type: String },
    companyDescription: { type: String },
    positionsSeeking: [{ type: String }],
    departmentFocus: [{ type: String }],
    hiringTimeline: { type: String },

    // Training provider specific fields
    trainingProvider: { type: String }, // Required during registration for trainingProvider
    courses: [{ type: String }],
    certificationTypes: [{ type: String }],
    trainingFormats: [{ type: String }],
    pricingModel: { type: String },
    programDuration: { type: String },
    studentCapacity: { type: Number },
    specialPrograms: { type: String },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
