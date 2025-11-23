import { get, post, put } from "@/config/api/httpRequest/httpMethod";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'jobseeker' | 'employer' | 'trainingProvider';
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;

  // Job seeker specific fields
  resume?: string;
  skills?: string[];
  experience?: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }[];
  education?: {
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
  }[];

  // Employer specific fields
  companyName?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  companyDescription?: string;

  // Training provider specific fields
  trainingProvider?: string;
  courses?: string[];

  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  err: number;
  message: string;
  data: UserProfile;
}

// Get current user profile
export const getMyProfile = async (): Promise<ProfileResponse> => {
  return get<ProfileResponse>('/api/v1/profile');
};

// Get user profile by ID
export const getUserProfile = async (id: string): Promise<ProfileResponse> => {
  return get<ProfileResponse>(`/api/v1/profile/${id}`);
};

// Update profile
export const updateProfile = async (profileData: Partial<UserProfile>): Promise<ProfileResponse> => {
  return put<Partial<UserProfile>, ProfileResponse>('/api/v1/profile', profileData);
};

// Complete onboarding
export const completeOnboarding = async (onboardingData: Partial<UserProfile>): Promise<ProfileResponse> => {
  return post<Partial<UserProfile>, ProfileResponse>('/api/v1/profile/onboarding', onboardingData);
};

// Upload resume
export const uploadResume = async (file: File): Promise<{ err: number; message: string; data: { url: string } }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'resume');

  return post<FormData, { err: number; message: string; data: { url: string } }>('/api/v1/upload', formData);
};

// Upload avatar
export const uploadAvatar = async (file: File): Promise<{ err: number; message: string; data: { url: string } }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'avatar');

  return post<FormData, { err: number; message: string; data: { url: string } }>('/api/v1/upload', formData);
};

// Upload cover letter
export const uploadCoverLetter = async (file: File): Promise<{ err: number; message: string; data: { url: string } }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'coverLetter');

  return post<FormData, { err: number; message: string; data: { url: string } }>('/api/v1/upload', formData);
};
