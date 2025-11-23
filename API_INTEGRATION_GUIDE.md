# API Integration Guide

## Overview
This document describes how the frontend (Next.js) connects to the backend (Express) API.

## Backend API (Port 5000)

### Base URL
- **Development**: `http://localhost:5000`
- **Configured in**: `client/.env.local` as `NEXT_PUBLIC_BACKEND_URL`

### Available Endpoints

#### 1. Authentication (`/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - User logout

#### 2. Jobs (`/api/v1/jobs`)
- `GET /api/v1/jobs` - Get all jobs (with optional filters)
- `GET /api/v1/jobs/:id` - Get job by ID
- `POST /api/v1/jobs` - Create job (employer only)
- `PUT /api/v1/jobs/:id` - Update job (employer only)
- `DELETE /api/v1/jobs/:id` - Delete job (employer only)
- `GET /api/v1/jobs/my-postings` - Get my job postings (employer only)
- `GET /api/v1/jobs/:id/applications` - Get applications for a job (employer only)

#### 3. Applications (`/api/v1/applications`)
- `POST /api/v1/applications` - Submit application (job seeker only)
- `GET /api/v1/applications` - Get my applications
- `GET /api/v1/applications/stats` - Get application statistics (job seeker only)
- `GET /api/v1/applications/:id` - Get application by ID
- `PUT /api/v1/applications/:id/status` - Update application status (employer only)
- `PUT /api/v1/applications/:id/withdraw` - Withdraw application (job seeker only)
- `DELETE /api/v1/applications/:id` - Delete application (job seeker only)

#### 4. Profile (`/api/v1/profile`)
- `GET /api/v1/profile` - Get current user profile
- `GET /api/v1/profile/:id` - Get user profile by ID
- `PUT /api/v1/profile` - Update profile
- `POST /api/v1/profile/onboarding` - Complete onboarding

#### 5. Upload (`/api/v1/upload`)
- `POST /api/v1/upload` - Generic file upload (accepts `type` parameter: resume, avatar, coverLetter, document)
- `POST /api/v1/upload/resume` - Upload resume (legacy)
- `POST /api/v1/upload/avatar` - Upload avatar (legacy)

## Frontend Services (client/src/services/)

### 1. Authentication (lib/auth.ts)
```typescript
import { register, login, logout, refreshAccessToken } from '@/lib/auth';

// Usage:
await register({ name, email, password, role, companyName });
await login(email, password);
await logout(refreshToken);
await refreshAccessToken(refreshToken);
```

### 2. Job Service (services/jobService.ts)
```typescript
import { getAllJobs, getJobById, createJob, updateJob, deleteJob } from '@/services/jobService';

// Usage:
const jobs = await getAllJobs({ search: 'developer', location: 'Remote' });
const job = await getJobById(jobId);
await createJob(jobData);
await updateJob(jobId, jobData);
await deleteJob(jobId);
```

### 3. Application Service (services/applicationService.ts)
```typescript
import { submitApplication, getMyApplications, updateApplicationStatus } from '@/services/applicationService';

// Usage:
await submitApplication({ jobId, resume, coverLetter });
const applications = await getMyApplications();
await updateApplicationStatus(applicationId, 'shortlisted');
```

### 4. Profile Service (services/profileService.ts)
```typescript
import { getMyProfile, updateProfile, completeOnboarding } from '@/services/profileService';

// Usage:
const profile = await getMyProfile();
await updateProfile({ name, phone, location, bio });
await completeOnboarding(onboardingData);
```

### 5. Upload Service (services/uploadService.ts)
```typescript
import { uploadFile } from '@/services/uploadService';

// Usage:
const result = await uploadFile(file, 'resume');
const result = await uploadFile(file, 'avatar');
```

## Authentication Flow

1. **Login/Register**: User logs in or registers
   - Frontend calls `/auth/login` or `/auth/register`
   - Backend returns `accessToken` and `refreshToken`
   - Tokens are stored in cookies using `js-cookie`

2. **Authenticated Requests**:
   - Frontend automatically includes `accessToken` in Authorization header
   - Uses `fetchRequest` from `httpConfig.ts` which handles:
     - Adding Authorization header
     - Token refresh on 401 errors
     - Automatic retry with new token

3. **Token Refresh**:
   - When API returns 401, `fetchRequest` automatically calls `/auth/refresh`
   - New tokens are stored in cookies
   - Request is retried with new token

## CORS Configuration

The backend is configured to accept requests from the frontend:
- **Origin**: `http://localhost:3000` (or CLIENT_URL from .env)
- **Credentials**: Enabled
- **Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS
- **Headers**: Content-Type, Authorization, X-Refresh-Token, X-Temp-Token

## Environment Variables

### Backend (.env.development.local)
```env
PORT=5000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/job-agency
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production-67890
CLIENT_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## File Upload Details

### Supported File Types
- **Resume/Cover Letter**: PDF, DOC, DOCX (max 5MB)
- **Avatar**: JPEG, JPG, PNG, WEBP (max 2MB)

### Upload Directories
Files are stored in `server/uploads/`:
- `resumes/` - Resume files
- `avatars/` - Profile avatars
- `coverLetters/` - Cover letter files
- `documents/` - Other documents

### Access Uploaded Files
Uploaded files are accessible at: `http://localhost:5000/uploads/{type}/{filename}`

## Testing the Connection

To test if the frontend and backend are properly connected:

1. Start the backend server:
   ```bash
   cd server
   npm install
   npm start
   ```

2. Start the frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. Navigate to `http://localhost:3000` in your browser

4. Try to:
   - Register a new user
   - Login
   - View jobs
   - Create a job (as employer)
   - Apply to a job (as job seeker)

## Common Issues

### CORS Errors
- Ensure backend is running on port 5000
- Verify CLIENT_URL in backend .env matches frontend URL
- Check that cookies are being sent with credentials: true

### Authentication Errors
- Verify tokens are being stored in cookies
- Check Authorization header is being sent
- Ensure JWT secrets are set in backend .env

### File Upload Errors
- Check file size limits
- Verify file type is allowed
- Ensure uploads directory has write permissions
