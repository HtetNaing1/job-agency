import { get, post, put, remove } from "@/config/api/httpRequest/httpMethod";

export type ApplicationStatus =
  | 'pending'
  | 'reviewed'
  | 'shortlisted'
  | 'interviewed'
  | 'hired'
  | 'rejected';

export interface Application {
  _id: string;
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
  };
  applicant: {
    _id: string;
    name: string;
    email: string;
  };
  resume: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt: string;
  employerNotes?: string;
  feedback?: string;
  interviewDate?: string;
  interviewTime?: string;
  interviewLocation?: string;
  interviewType?: 'in-person' | 'video' | 'phone';
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationResponse {
  err: number;
  message: string;
  data: Application[];
}

export interface SingleApplicationResponse {
  err: number;
  message: string;
  data: Application;
}

// Submit a job application
export const submitApplication = async (applicationData: {
  jobId: string;
  resume?: string;
  coverLetter?: string;
}): Promise<SingleApplicationResponse> => {
  return post<any, SingleApplicationResponse>('/api/v1/applications', applicationData);
};

// Get my applications (job seeker)
export const getMyApplications = async (): Promise<ApplicationResponse> => {
  return get<ApplicationResponse>('/api/v1/applications');
};

// Get application by ID
export const getApplicationById = async (id: string): Promise<SingleApplicationResponse> => {
  return get<SingleApplicationResponse>(`/api/v1/applications/${id}`);
};

// Update application status (employer only)
export const updateApplicationStatus = async (
  id: string,
  status: ApplicationStatus,
  feedback?: string,
  employerNotes?: string
): Promise<SingleApplicationResponse> => {
  return put<any, SingleApplicationResponse>(`/api/v1/applications/${id}/status`, {
    status,
    feedback,
    employerNotes,
  });
};

// Schedule interview (employer only)
export const scheduleInterview = async (
  id: string,
  interviewData: {
    interviewDate: string;
    interviewTime: string;
    interviewLocation?: string;
    interviewType: 'in-person' | 'video' | 'phone';
    message?: string;
  }
): Promise<SingleApplicationResponse> => {
  return put<any, SingleApplicationResponse>(`/api/v1/applications/${id}/interview`, interviewData);
};

// Withdraw application (job seeker)
export const withdrawApplication = async (id: string): Promise<{ err: number; message: string }> => {
  return put<any, { err: number; message: string }>(`/api/v1/applications/${id}/withdraw`, {});
};

// Delete application (job seeker)
export const deleteApplication = async (id: string): Promise<{ err: number; message: string }> => {
  return remove<{ err: number; message: string }>(`/api/v1/applications/${id}`);
};

// Get applications by status
export const getApplicationsByStatus = async (status: ApplicationStatus): Promise<ApplicationResponse> => {
  return get<ApplicationResponse>(`/api/v1/applications?status=${status}`);
};

// Get interview schedule
export const getInterviews = async (): Promise<ApplicationResponse> => {
  return get<ApplicationResponse>('/api/v1/applications?hasInterview=true');
};
