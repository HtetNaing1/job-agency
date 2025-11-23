import { get, post, put, remove } from "@/config/api/httpRequest/httpMethod";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  workMode: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  experience: string;
  education: string;
  salaryMin?: number;
  salaryMax?: number;
  benefits?: string[];
  applicationDeadline?: string;
  postedBy: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilters {
  search?: string;
  location?: string;
  employmentType?: string;
  workMode?: string;
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
  experience?: string;
  page?: number;
  limit?: number;
}

export interface JobResponse {
  err: number;
  message: string;
  data: {
    jobs: Job[];
    total: number;
    page: number;
    totalPages: number;
  };
}

export interface SingleJobResponse {
  err: number;
  message: string;
  data: Job;
}

// Get all jobs with filters
export const getAllJobs = async (filters?: JobFilters): Promise<JobResponse> => {
  const queryParams = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/api/v1/jobs?${queryString}` : '/api/v1/jobs';

  return get<JobResponse>(url);
};

// Get recommended jobs based on user profile
export const getRecommendedJobs = async (): Promise<JobResponse> => {
  return get<JobResponse>('/api/v1/jobs/recommended');
};

// Get job by ID
export const getJobById = async (id: string): Promise<SingleJobResponse> => {
  return get<SingleJobResponse>(`/api/v1/jobs/${id}`);
};

// Create new job posting (employer only)
export const createJob = async (jobData: Partial<Job>): Promise<SingleJobResponse> => {
  return post<Partial<Job>, SingleJobResponse>('/api/v1/jobs', jobData);
};

// Update job posting (employer only)
export const updateJob = async (id: string, jobData: Partial<Job>): Promise<SingleJobResponse> => {
  return put<Partial<Job>, SingleJobResponse>(`/api/v1/jobs/${id}`, jobData);
};

// Delete job posting (employer only)
export const deleteJob = async (id: string): Promise<{ err: number; message: string }> => {
  return remove<{ err: number; message: string }>(`/api/v1/jobs/${id}`);
};

// Get my job postings (employer only)
export const getMyJobs = async (): Promise<JobResponse> => {
  return get<JobResponse>('/api/v1/jobs/my-postings');
};

// Get applications for a specific job (employer only)
export const getJobApplications = async (jobId: string): Promise<any> => {
  return get<any>(`/api/v1/jobs/${jobId}/applications`);
};

// Save/bookmark a job
export const bookmarkJob = async (jobId: string): Promise<{ err: number; message: string }> => {
  return post<{ jobId: string }, { err: number; message: string }>('/api/v1/jobs/bookmark', { jobId });
};

// Remove bookmark
export const removeBookmark = async (jobId: string): Promise<{ err: number; message: string }> => {
  return remove<{ err: number; message: string }>(`/api/v1/jobs/bookmark/${jobId}`);
};

// Get bookmarked jobs
export const getBookmarkedJobs = async (): Promise<JobResponse> => {
  return get<JobResponse>('/api/v1/jobs/bookmarked');
};
