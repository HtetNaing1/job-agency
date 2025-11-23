"use client";

import { useMemo, useState, useEffect } from "react";
import { Typography, Row, Col, Button, List, Modal, message, Spin } from "antd";
import { Plus, Briefcase, Users, Eye } from "lucide-react";
import StatCard from "@/components/atoms/StatCard";
import JobListItem from "@/components/organisms/employer-dashboard/JobListItem";
import FilterBar, { type FilterSelect } from "@/components/molecules/FilterBar";
import JobInfoHeader from "@/components/organisms/employer-dashboard/JobInfoHeader";
import ApplicationsTable from "@/components/organisms/employer-dashboard/ApplicationsTable";
import { JobPosting, Application, JobStatus } from "@/constant/type";
import { getMyJobs, deleteJob as deleteJobAPI, updateJob, type Job } from "@/services/jobService";
import { getJobApplications } from "@/services/jobService";

const { Title, Text } = Typography;

// Helper function to map API Job to JobPosting
const mapJobToJobPosting = (job: Job): JobPosting => {
  return {
    id: job._id,
    title: job.title,
    company: job.company,
    location: job.location,
    jobType: job.employmentType,
    workModel: job.workMode as "Remote" | "On-site" | "Hybrid",
    salaryMin: job.salaryMin || 0,
    salaryMax: job.salaryMax || 0,
    currency: "USD",
    status: job.status as JobStatus,
    postedDate: new Date(job.createdAt).toISOString().split('T')[0],
    deadline: job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().split('T')[0] : "",
    applications: 0, // Will be populated separately
    views: 0, // Mock for now
    category: job.skills?.[0] || "General",
  };
};

export default function EmployerDashboardTemplate() {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | JobStatus>("all");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(false);

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getMyJobs();
        if (response.err === 0) {
          const mappedJobs = response.data.jobs.map(mapJobToJobPosting);

          // Fetch application counts for each job
          const jobsWithCounts = await Promise.all(
            mappedJobs.map(async (job) => {
              try {
                const appsResponse = await getJobApplications(job.id);
                return {
                  ...job,
                  applications: appsResponse.data?.length || 0,
                };
              } catch {
                return job;
              }
            })
          );

          setJobs(jobsWithCounts);
        } else {
          message.error(response.message || "Failed to fetch jobs");
        }
      } catch (error) {
        message.error("Failed to load your job postings");
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch applications when a job is selected
  useEffect(() => {
    const fetchApplications = async () => {
      if (!selectedJob) {
        setApplications([]);
        return;
      }

      try {
        setLoadingApplications(true);
        const response = await getJobApplications(selectedJob.id);
        if (response.err === 0 && Array.isArray(response.data)) {
          // Map backend applications to frontend Application type
          const mappedApps: Application[] = response.data.map((app: any) => ({
            id: app._id,
            jobId: selectedJob.id,
            jobTitle: selectedJob.title,
            candidateName: app.applicant?.name || "Unknown",
            candidateEmail: app.applicant?.email || "",
            candidatePhone: app.applicant?.phone || "",
            appliedDate: new Date(app.appliedAt).toISOString().split('T')[0],
            status: app.status,
            resumeUrl: app.resume,
            coverLetter: app.coverLetter,
            experience: app.applicant?.experience || "",
            location: app.applicant?.location || "",
            skills: app.applicant?.skills || [],
            education: app.applicant?.education || "",
          }));
          setApplications(mappedApps);
        } else {
          setApplications([]);
        }
      } catch (error) {
        message.error("Failed to load applications");
        console.error("Error fetching applications:", error);
        setApplications([]);
      } finally {
        setLoadingApplications(false);
      }
    };

    fetchApplications();
  }, [selectedJob]);

  const activeJobs = useMemo(
    () => jobs.filter((j) => j.status === "active").length,
    [jobs]
  );
  const totalApps = useMemo(
    () => jobs.reduce((s, j) => s + j.applications, 0),
    [jobs]
  );
  const totalViews = useMemo(() => jobs.reduce((s, j) => s + j.views, 0), [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const q = search.toLowerCase();
      const matchesText =
        j.title.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q);
      const matchesStatus = status === "all" || j.status === status;
      return matchesText && matchesStatus;
    });
  }, [search, status, jobs]);

  const selects: FilterSelect[] = [
    {
      key: "status",
      value: status, // "all" | "active" | "paused" | "closed"
      width: 180,
      ariaLabel: "Filter by status",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "paused", label: "Paused" },
        { value: "closed", label: "Closed" },
      ],
    },
  ];

  const handleSelectChange = (key: string, value: string) => {
    if (key === "status") setStatus(value as "all" | JobStatus);
  };

  const toggleStatus = async (job: JobPosting) => {
    try {
      const newStatus = job.status === "active" ? "paused" : "active";
      await updateJob(job.id, { status: newStatus });

      // Update local state
      setJobs(jobs.map(j =>
        j.id === job.id ? { ...j, status: newStatus as JobStatus } : j
      ));

      message.success(`Job ${newStatus === "active" ? "activated" : "paused"}`);
    } catch (error) {
      message.error("Failed to update job status");
      console.error("Error updating job status:", error);
    }
  };

  const deleteJob = (job: JobPosting) => {
    Modal.confirm({
      title: "Delete this job?",
      content: "This action cannot be undone.",
      okType: "danger",
      onOk: async () => {
        try {
          await deleteJobAPI(job.id);
          setJobs(jobs.filter(j => j.id !== job.id));
          message.success("Job deleted successfully");
        } catch (error) {
          message.error("Failed to delete job");
          console.error("Error deleting job:", error);
        }
      },
    });
  };

  // —— Detail view ——
  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button
            type="text"
            onClick={() => setSelectedJob(null)}
            className="mb-6"
          >
            ← Back to Jobs
          </Button>
          <JobInfoHeader job={selectedJob} />
          {loadingApplications ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" tip="Loading applications..." />
            </div>
          ) : (
            <ApplicationsTable data={applications} />
          )}
        </div>
      </div>
    );
  }

  // —— Loading view ——
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <Spin size="large" tip="Loading your jobs..." />
      </div>
    );
  }

  // —— List view ——
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Employer Dashboard
            </Title>
            <Text type="secondary">
              Manage your job postings and applications
            </Text>
          </div>
          <Button type="primary" icon={<Plus className="w-4 h-4" />}>
            Post New Job
          </Button>
        </div>

        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} md={8}>
            <StatCard
              label="Active Jobs"
              value={activeJobs}
              gradient="blue"
              icon={<Briefcase className="w-8 h-8" color="#BFDBFE" />}
            />
          </Col>
          <Col xs={24} md={8}>
            <StatCard
              label="Total Applications"
              value={totalApps}
              gradient="green"
              icon={<Users className="w-8 h-8" color="#BBF7D0" />}
            />
          </Col>
          <Col xs={24} md={8}>
            <StatCard
              label="Total Views"
              value={totalViews}
              gradient="purple"
              icon={<Eye className="w-8 h-8" color="#F5D0FE" />}
            />
          </Col>
        </Row>

        <div className="mb-6">
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search jobs..."
            selects={selects}
            onSelectChange={handleSelectChange}
            compact={false}
          />
        </div>

        <List
          dataSource={filtered}
          renderItem={(job) => (
            <JobListItem
              job={job}
              onClick={() => setSelectedJob(job)}
              onView={() => setSelectedJob(job)}
              onToggle={() => toggleStatus(job)}
              onDelete={() => deleteJob(job)}
            />
          )}
        />
      </div>
    </div>
  );
}
