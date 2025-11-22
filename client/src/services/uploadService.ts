import { post } from "@/config/api/httpRequest/httpMethod";

export interface UploadResponse {
  err: number;
  message: string;
  data: {
    url: string;
    filename: string;
    path: string;
  };
}

export type FileType = 'resume' | 'coverLetter' | 'avatar' | 'document';

// Upload file
export const uploadFile = async (
  file: File,
  type: FileType = 'document'
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  return post<FormData, UploadResponse>('/api/v1/upload', formData);
};

// Upload multiple files
export const uploadMultipleFiles = async (
  files: File[],
  type: FileType = 'document'
): Promise<{ err: number; message: string; data: { url: string; filename: string }[] }> => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  formData.append('type', type);

  return post<FormData, any>('/api/v1/upload/multiple', formData);
};
