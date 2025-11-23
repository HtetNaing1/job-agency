# Frontend Refinement Plan - Job Agency System
## Based on Project Proposal Requirements

**Student:** Htet Naing (ID: 001474419)
**Date:** November 22, 2025

---

## ✅ Completed Implementation

### 1. API Service Layer (100% Complete)
Created comprehensive service files for all backend communication:

- **`/client/src/services/jobService.ts`**
  - Get all jobs with filters
  - Get recommended jobs (personalized based on profile)
  - Get job by ID
  - Create/update/delete job postings
  - Get my job postings (employer)
  - Bookmark/save jobs
  - Get bookmarked jobs

- **`/client/src/services/applicationService.ts`**
  - Submit job application
  - Get my applications
  - Get application by ID
  - Update application status (pending → reviewed → shortlisted → interviewed → hired/rejected)
  - Schedule interview
  - Withdraw application
  - Delete application
  - Get applications by status
  - Get interview schedule

- **`/client/src/services/profileService.ts`**
  - Get user profile
  - Update profile
  - Complete onboarding
  - Upload resume (once, reuse across applications)
  - Upload avatar
  - Upload cover letter

- **`/client/src/services/uploadService.ts`**
  - Upload single file
  - Upload multiple files
  - Support for resume, cover letter, avatar, documents

### 2. Jobs Page Connection (80% Complete)
- ✅ Connected to backend API
- ✅ Implemented personalized job recommendations
- ✅ Added loading states
- ✅ Pagination support
- ⚠️ Filter sidebar needs prop updates (onFilterChange)
- ⚠️ JobList component needs prop updates (totalPages)

---

## 🚧 Critical Features to Implement (Based on Proposal)

### Priority 1: Job Seeker Features

#### 1.1 Single Resume Upload & Reuse ⭐⭐⭐
**Proposal Requirement:** "By submitting their resume and cover letter to the system once job seekers eliminate repetitive paperwork tasks."

**Implementation Steps:**
1. Update `ProfessionalInfoStep.tsx` in onboarding to include resume upload
2. Save resume URL to user profile via `/api/v1/profile`
3. Update `ApplicationForm.tsx` to:
   - Pre-fill resume from user profile
   - Show "Use existing resume" option
   - Allow uploading new resume if needed
4. Store resume in profile, reference in applications

**Files to Update:**
- `/client/src/components/organisms/onboarding/ProfessionalInfoStep.tsx`
- `/client/src/components/molecules/ApplicationForm.tsx`
- `/client/src/components/templates/ApplyJobTemplate.tsx`

#### 1.2 Application Tracking with Feedback ⭐⭐⭐
**Proposal Requirement:** "They can also track their application progress through a single platform in which they can review employer feedback to learn from rejection and succeed in future job applications."

**Implementation Steps:**
1. Update `JobDashboardTemplate.tsx` to fetch real applications
2. Update `ApplicationList.tsx` to show all status stages
3. Add feedback display section for rejected applications
4. Show interview details for shortlisted/interviewed applications
5. Color code statuses (pending=yellow, reviewed=blue, shortlisted=green, interviewed=purple, hired=green, rejected=red)

**Files to Update:**
- `/client/src/components/templates/JobDashboardTemplate.tsx`
- `/client/src/components/organisms/job-dashboard/ApplicationList.tsx`
- `/client/src/components/molecules/ApplicationItem.tsx`

#### 1.3 Job Bookmarking/Save Feature ⭐⭐
**Proposal Requirement:** Implied from "decreasing the time necessary for finding positions"

**Implementation Steps:**
1. Add bookmark button to `JobCard.tsx`
2. Update `BookmarkList.tsx` to fetch real bookmarked jobs
3. Implement bookmark toggle functionality
4. Show saved status on job cards

**Files to Update:**
- `/client/src/components/organisms/jobs/JobCard.tsx`
- `/client/src/components/organisms/job-dashboard/BookmarkList.tsx`
- `/client/src/components/molecules/BookmarkItem.tsx`

#### 1.4 Advanced Job Filtering ⭐⭐
**Proposal Requirement:** "Advanced job search with filters"

**Implementation Steps:**
1. Update `FilterSidebar.tsx` to accept `onFilterChange` prop
2. Add filters for:
   - Location (city/state/remote)
   - Employment type (full-time, part-time, contract)
   - Salary range (min/max)
   - Experience level
   - Skills (multi-select)
   - Work mode (on-site, hybrid, remote)
3. Apply filters to API calls

**Files to Update:**
- `/client/src/components/organisms/jobs/FilterSidebar.tsx`
- `/client/src/components/molecules/FilterBar.tsx`
- `/client/src/components/molecules/FilterGroup.tsx`

### Priority 2: Employer Features

#### 2.1 Application Management Dashboard ⭐⭐⭐
**Proposal Requirement:** "The system provides employers with instant candidate selection and scheduling of interviews through its platform which resolves manual delay issues."

**Implementation Steps:**
1. Update `EmployerDashboardTemplate.tsx` to fetch real applications
2. Update `ApplicationsTable.tsx` to show all applicants
3. Add status action buttons (Review, Shortlist, Schedule Interview, Hire, Reject)
4. Implement feedback form for rejected candidates
5. Show hiring outcome tracking

**Files to Update:**
- `/client/src/components/templates/EmployerDashboardTemplate.tsx`
- `/client/src/components/organisms/employer-dashboard/ApplicationsTable.tsx`
- `/client/src/components/organisms/employer-dashboard/StatusActionsPanel.tsx`
- `/client/src/components/organisms/employer-dashboard/TimelinePanel.tsx`

#### 2.2 Interview Scheduling System ⭐⭐⭐
**Proposal Requirement:** "The system provides employers with instant candidate selection and scheduling of interviews"

**Implementation Steps:**
1. Create interview scheduling modal/form
2. Fields: Date, Time, Location/Link, Interview Type (in-person/video/phone)
3. Update application status to "interviewed" when scheduled
4. Send notification to job seeker (via status update)
5. Show interview schedule in employer dashboard

**Files to Create:**
- `/client/src/components/organisms/employer-dashboard/InterviewScheduleModal.tsx`

**Files to Update:**
- `/client/src/components/organisms/employer-dashboard/StatusActionsPanel.tsx`

#### 2.3 Hiring Outcome Tracking ⭐⭐
**Proposal Requirement:** "Track hiring outcomes (who was hired for which job)"

**Implementation Steps:**
1. Add "Hired" status action button
2. Track which candidate was hired for each job
3. Close job posting when position is filled
4. Show hiring statistics on employer dashboard
5. Display hired candidate info on job details page

**Files to Update:**
- `/client/src/components/organisms/employer-dashboard/StatusActionsPanel.tsx`
- `/client/src/components/templates/EmployerDashboardTemplate.tsx`
- `/client/src/components/organisms/employer-dashboard/JobInfoHeader.tsx`

#### 2.4 Filtered Job Matching ⭐⭐
**Proposal Requirement:** "The system maintains filtered job matching that gives employers applications directly from candidates who satisfy their criteria thereby cutting down unwanted submissions."

**Implementation Steps:**
1. Backend should filter applications based on job requirements
2. Show match score/percentage on applicant cards
3. Highlight qualified vs unqualified candidates
4. Add filtering options in ApplicationsTable

**Files to Update:**
- `/client/src/components/organisms/employer-dashboard/ApplicationsTable.tsx`

#### 2.5 Job Posting Management ⭐⭐
**Proposal Requirement:** "Centralized job posting platform"

**Implementation Steps:**
1. Update `EmployerJobPostTemplate.tsx` to submit to backend
2. Connect all 4 steps to API
3. Save as draft functionality
4. Edit existing job postings
5. Close/reopen job postings

**Files to Update:**
- `/client/src/components/templates/EmployerJobPostTemplate.tsx`
- `/client/src/components/organisms/job-post/Step1Basic.tsx`
- `/client/src/components/organisms/job-post/Step2Comp.tsx`
- `/client/src/components/organisms/job-post/Step3Details.tsx`
- `/client/src/components/organisms/job-post/Step4Review.tsx`

### Priority 3: Profile & Onboarding

#### 3.1 Complete Onboarding Flow ⭐⭐⭐
**Proposal Requirement:** Users should complete profile on first login

**Implementation Steps:**
1. Update `OnboardingTemplate.tsx` to save to backend
2. Include resume upload in Professional Background step
3. Call `/api/v1/profile/onboarding` on completion
4. Redirect to appropriate dashboard based on role

**Files to Update:**
- `/client/src/components/templates/OnboardingTemplate.tsx`
- `/client/src/components/organisms/onboarding/ProfessionalInfoStep.tsx`
- `/client/src/components/organisms/onboarding/FinalStep.tsx`

#### 3.2 Profile Management ⭐⭐
**Proposal Requirement:** Users should be able to view and edit their profiles

**Implementation Steps:**
1. Update `ProfileTemplate.tsx` to fetch real profile data
2. Add edit functionality
3. Show resume download link
4. Add education, experience, certifications sections
5. Update skills and preferences

**Files to Update:**
- `/client/src/components/templates/ProfileTemplate.tsx`
- `/client/src/components/organisms/profile/ProfileOverview.tsx`
- `/client/src/components/organisms/profile/DocumentsSection.tsx`
- `/client/src/components/molecules/PersonalInfoCard.tsx`

---

## 📋 Implementation Checklist

### Phase 1: Core Job Seeker Features
- [ ] Single resume upload in onboarding
- [ ] Resume reuse in job applications
- [ ] Application tracking with all statuses
- [ ] Employer feedback display
- [ ] Job bookmarking functionality
- [ ] Advanced job filtering

### Phase 2: Core Employer Features
- [ ] Application management dashboard with real data
- [ ] Interview scheduling system
- [ ] Hiring outcome tracking
- [ ] Status update actions (Review, Shortlist, Interview, Hire, Reject)
- [ ] Feedback system for rejected candidates
- [ ] Job posting create/edit/delete

### Phase 3: Additional Features
- [ ] Profile page with edit functionality
- [ ] Onboarding completion with backend save
- [ ] Interview list for job seekers
- [ ] Bookmarked jobs list
- [ ] Employer job list with applications count
- [ ] Application withdrawal
- [ ] Job recommendations based on profile

### Phase 4: UI/UX Enhancements
- [ ] Loading states for all API calls
- [ ] Error handling with user-friendly messages
- [ ] Empty states for no data
- [ ] Success notifications
- [ ] Confirmation dialogs for destructive actions
- [ ] Responsive design verification

---

## 🔧 Technical Implementation Notes

### API Integration Pattern
All components should follow this pattern:

```typescript
"use client";
import { useState, useEffect } from "react";
import { message } from "antd";
import { serviceName } from "@/services";

export default function Component() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await serviceName();

      if (response.err === 0) {
        setData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  return loading ? <Spin /> : <YourComponent data={data} />;
}
```

### File Upload Pattern
```typescript
import { uploadFile } from "@/services/uploadService";

const handleFileUpload = async (file: File) => {
  try {
    const response = await uploadFile(file, 'resume');

    if (response.err === 0) {
      // Save URL to profile
      return response.data.url;
    }
  } catch (error) {
    message.error("Upload failed");
  }
};
```

### Status Colors
```typescript
const STATUS_COLORS = {
  pending: 'orange',
  reviewed: 'blue',
  shortlisted: 'cyan',
  interviewed: 'purple',
  hired: 'green',
  rejected: 'red',
};
```

---

## 🎯 Success Criteria

The frontend refinement will be complete when:

1. ✅ Job seekers can upload resume once during onboarding
2. ✅ Job seekers can apply to jobs without re-uploading resume
3. ✅ Job seekers can track all application statuses
4. ✅ Job seekers can see employer feedback on rejections
5. ✅ Job seekers can bookmark jobs
6. ✅ Job seekers can filter jobs by multiple criteria
7. ✅ Employers can see all applications for their jobs
8. ✅ Employers can update application statuses
9. ✅ Employers can schedule interviews
10. ✅ Employers can provide feedback to candidates
11. ✅ Employers can track who was hired for which job
12. ✅ System provides personalized job recommendations
13. ✅ All pages are connected to backend APIs
14. ✅ Error handling and loading states work correctly

---

## 📚 Next Steps

1. **Complete Job Seeker Features** (Priority 1)
   - Start with single resume upload
   - Then implement application tracking
   - Add bookmarking and filtering

2. **Complete Employer Features** (Priority 2)
   - Focus on application management first
   - Then add interview scheduling
   - Finish with hiring outcome tracking

3. **Polish & Test** (Priority 3)
   - Add loading states and error handling
   - Test complete workflows
   - Fix any bugs or issues

4. **Commit & Deploy**
   - Commit all changes with descriptive messages
   - Push to the designated branch
   - Test on deployed environment

---

## 💡 Additional Recommendations

### Backend Endpoints to Verify
Ensure these endpoints exist and work correctly:
- `GET /api/v1/jobs/recommended` - Personalized recommendations
- `GET /api/v1/jobs/bookmarked` - User's bookmarked jobs
- `POST /api/v1/jobs/bookmark` - Bookmark a job
- `DELETE /api/v1/jobs/bookmark/:id` - Remove bookmark
- `PUT /api/v1/applications/:id/interview` - Schedule interview
- `PUT /api/v1/applications/:id/status` - Update status with feedback
- `POST /api/v1/profile/onboarding` - Complete onboarding
- `POST /api/v1/upload` - File upload

### State Management Consideration
For larger scale, consider adding Zustand stores:
- User profile store
- Application store
- Jobs store
- Bookmarks store

This would reduce prop drilling and improve performance.

### Testing Strategy
- Manual testing of each workflow
- Test error scenarios (network failures, invalid data)
- Test with different user roles (job seeker, employer)
- Cross-browser testing
- Mobile responsiveness testing

---

**Document Created:** November 22, 2025
**Last Updated:** November 22, 2025
**Status:** In Progress
