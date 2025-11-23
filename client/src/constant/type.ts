// #region Authentication
export interface LoginResponse {
  err: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    firstTimeLogin: boolean;
  };
}

export interface ForgotPasswordResponse {
  err: number;
  message: string;
}

export interface ResetPasswordResponse {
  err: number;
  message: string;
  data: null;
}

export interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  level?: string;
  size?: string;
  description?: string[];
  requirements?: string[];
  benefits?: string[];
};

// Shared base fields for all roles
type BaseOnboardingData = {
  // Basic
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;

  // Contact
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Final
  profilePicture: string;
  bio: string;
  linkedinUrl: string;
};

// Job Seeker specific onboarding data
export type JobSeekerOnboardingData = BaseOnboardingData & {
  role: "jobseeker";
  // Professional
  experienceLevel: string;
  industry: string;
  currentRole: string;
  skills: string[];
  education: string;

  // Preferences
  jobType: string[];
  salaryRange: string;
  locationPreferences: string[];
  remoteWork: string;

  // Final (additional)
  portfolioUrl: string;
};

// Employer specific onboarding data
export type EmployerOnboardingData = BaseOnboardingData & {
  role: "employer";
  // Company Info
  companySize: string;
  industry: string;
  website: string;
  companyDescription: string;

  // Hiring Needs
  positionsSeeking: string[];
  departmentFocus: string[];
  hiringTimeline: string;
};

// Training Provider specific onboarding data
export type TrainingProviderOnboardingData = BaseOnboardingData & {
  role: "trainingProvider";
  // Training Info
  courses: string[];
  certificationTypes: string[];
  trainingFormats: string[];

  // Program Details
  pricingModel: string;
  programDuration: string;
  studentCapacity: number;
  specialPrograms: string;
};

// Union type for all onboarding data
export type OnboardingData =
  | JobSeekerOnboardingData
  | EmployerOnboardingData
  | TrainingProviderOnboardingData;


export type JobFormData = {
  // Step 1
  title: string;
  company: string;
  location: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship" | "Temporary" | "";
  workModel: "On-site" | "Remote" | "Hybrid" | "";
  // Step 2
  salaryMin?: number;
  salaryMax?: number;
  currency: "USD" | "EUR" | "GBP" | "CAD" | "AUD";
  experienceLevel: "Entry Level" | "Mid Level" | "Senior Level" | "Executive" | "";
  category: string;
  // Step 3
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  // Step 4
  benefits: string[];
  applicationDeadline?: string; // ISO
  contactEmail: string;
  companyWebsite?: string;
};

export const JOB_TYPES = ["Full-time","Part-time","Contract","Freelance","Internship","Temporary"] as const;
export const WORK_MODELS = ["On-site","Remote","Hybrid"] as const;
export const EXPERIENCE = ["Entry Level","Mid Level","Senior Level","Executive"] as const;
export const CATEGORIES = ["Technology","Marketing","Sales","Design","Finance","Operations","Human Resources","Customer Service","Engineering","Product Management","Data Science","Healthcare","Education","Legal","Other"];
export const BENEFITS = ["Health Insurance","Dental Insurance","Vision Insurance","401(k) Matching","Paid Time Off","Flexible Schedule","Remote Work","Professional Development","Gym Membership","Life Insurance","Stock Options","Bonus Program"];
export const CURRENCIES = ["USD","EUR","GBP","CAD","AUD"] as const;
export const COMMON_SKILLS = [
  // Programming Languages
  "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Ruby", "PHP", "Go", "Rust", "Swift", "Kotlin", "Scala",
  // Frontend
  "React", "Vue.js", "Angular", "Next.js", "HTML", "CSS", "Tailwind CSS", "SASS", "Redux", "MobX",
  // Backend
  "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET", "Ruby on Rails", "Laravel",
  // Databases
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "Firebase", "DynamoDB", "Oracle",
  // Cloud & DevOps
  "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Jenkins", "GitLab", "GitHub Actions",
  // Mobile
  "React Native", "Flutter", "iOS Development", "Android Development", "Xamarin",
  // Data & AI
  "Machine Learning", "Data Analysis", "TensorFlow", "PyTorch", "Pandas", "NumPy", "SQL", "Power BI", "Tableau",
  // Tools & Other
  "Git", "Agile", "Scrum", "JIRA", "REST API", "GraphQL", "Microservices", "Unit Testing", "Jest", "Cypress",
  // Soft Skills
  "Project Management", "Team Leadership", "Communication", "Problem Solving", "Critical Thinking"
];

//
export type JobStatus = "active" | "paused" | "closed";
export type AppStatus = "pending" | "reviewed" | "shortlisted" | "interviewed" | "rejected" | "hired";

export type JobPosting = {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  workModel: "Remote" | "On-site" | "Hybrid";
  salaryMin: number;
  salaryMax: number;
  currency: string;
  status: JobStatus;
  postedDate: string;
  deadline: string;
  applications: number;
  views: number;
  category: string;
};

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  appliedDate: string;
  status: AppStatus;
  experience: string;
  location: string;
  resumeUrl?: string;
  coverLetter: string;
  rating?: number;
  skills: string[];
  education: string;
  currentCompany?: string;
  noticePeriod?: string;
  expectedSalary?: string;
  linkedIn?: string;
  portfolio?: string;
  languages?: string[];
  certifications?: string[];
};

