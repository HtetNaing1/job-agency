"use client";

import { useMemo, useState } from "react";
import { Typography, Row, Col, Button, List, Modal, message } from "antd";
import { Plus, Briefcase, Users, Eye } from "lucide-react";
import StatCard from "@/components/atoms/StatCard";
import JobListItem from "@/components/organisms/JobListItem";
import FilterBar, { type FilterSelect } from "@/components/molecules/FilterBar";
import JobInfoHeader from "@/components/organisms/JobInfoHeader";
import ApplicationsTable from "@/components/organisms/ApplicationsTable";
import { JobPosting, Application, JobStatus } from "@/constant/type";

const { Title, Text } = Typography;

// --- mock data (replace with API) ---
const JOBS: JobPosting[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    jobType: "Full-time",
    workModel: "Hybrid",
    salaryMin: 120000,
    salaryMax: 160000,
    currency: "USD",
    status: "active",
    postedDate: "2025-01-10",
    deadline: "2025-02-15",
    applications: 3,
    views: 234,
    category: "Technology",
  },
  {
    id: "job-2",
    title: "Product Manager",
    company: "TechCorp Inc.",
    location: "New York, NY",
    jobType: "Full-time",
    workModel: "Remote",
    salaryMin: 130000,
    salaryMax: 170000,
    currency: "USD",
    status: "active",
    postedDate: "2025-01-08",
    deadline: "2025-02-10",
    applications: 2,
    views: 412,
    category: "Product Management",
  },
  {
    id: "job-3",
    title: "UX Designer",
    company: "TechCorp Inc.",
    location: "Los Angeles, CA",
    jobType: "Full-time",
    workModel: "On-site",
    salaryMin: 90000,
    salaryMax: 120000,
    currency: "USD",
    status: "paused",
    postedDate: "2025-01-05",
    deadline: "2025-02-05",
    applications: 2,
    views: 156,
    category: "Design",
  },
  {
    id: "job-4",
    title: "Data Scientist",
    company: "Insight Analytics",
    location: "Seattle, WA",
    jobType: "Full-time",
    workModel: "Hybrid",
    salaryMin: 135000,
    salaryMax: 180000,
    currency: "USD",
    status: "active",
    postedDate: "2025-01-12",
    deadline: "2025-02-20",
    applications: 3,
    views: 298,
    category: "Data Science",
  },
  {
    id: "job-5",
    title: "DevOps Engineer",
    company: "CloudBridge",
    location: "Austin, TX",
    jobType: "Full-time",
    workModel: "Remote",
    salaryMin: 115000,
    salaryMax: 150000,
    currency: "USD",
    status: "active",
    postedDate: "2025-01-03",
    deadline: "2025-02-08",
    applications: 2,
    views: 221,
    category: "Engineering",
  },
  {
    id: "job-6",
    title: "Marketing Specialist",
    company: "BrightWave",
    location: "Chicago, IL",
    jobType: "Contract",
    workModel: "Hybrid",
    salaryMin: 65000,
    salaryMax: 85000,
    currency: "USD",
    status: "closed",
    postedDate: "2024-12-15",
    deadline: "2025-01-15",
    applications: 2,
    views: 189,
    category: "Marketing",
  },
];
const APPS: Application[] = [
  {
    id: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Frontend Developer",
    candidateName: "Sarah Johnson",
    candidateEmail: "sarah.johnson@email.com",
    candidatePhone: "+1 (555) 123-4567",
    appliedDate: "2025-01-20",
    status: "shortlisted",
    experience: "5 years",
    location: "San Francisco, CA",
    resumeUrl: "/resume-sarah.pdf",
    coverLetter:
      "Excited to apply for the Senior Frontend Developer role. Strong in React, TypeScript, accessibility and performance.",
    rating: 4.5,
    skills: ["React", "TypeScript", "GraphQL", "Jest", "Next.js", "Tailwind CSS"],
    education: "BS Computer Science, Stanford University",
    currentCompany: "Tech Solutions Inc.",
    noticePeriod: "2 weeks",
    expectedSalary: "$140,000 - $160,000",
    linkedIn: "https://linkedin.com/in/sarahjohnson",
    portfolio: "https://sarahjohnson.dev",
    languages: ["English", "Spanish"],
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
  },
  {
    id: "app-2",
    jobId: "job-1",
    jobTitle: "Senior Frontend Developer",
    candidateName: "Michael Chen",
    candidateEmail: "michael.chen@email.com",
    candidatePhone: "+1 (555) 987-6543",
    appliedDate: "2025-01-18",
    status: "reviewed",
    experience: "7 years",
    location: "Oakland, CA",
    resumeUrl: "/resume-michael.pdf",
    coverLetter:
      "Led multiple frontend teams delivering scalable apps. Strong in React, testing, and architecture.",
    rating: 4.2,
    skills: ["React", "Node.js", "AWS", "Docker", "Kubernetes"],
    education: "MS Software Engineering, UC Berkeley",
    currentCompany: "Digital Innovations Co.",
    noticePeriod: "1 month",
    expectedSalary: "$150,000 - $170,000",
    linkedIn: "https://linkedin.com/in/michaelchen",
    languages: ["English", "Mandarin"],
    certifications: ["PMP", "Certified Scrum Master"],
  },
  {
    id: "app-3",
    jobId: "job-1",
    jobTitle: "Senior Frontend Developer",
    candidateName: "David Kim",
    candidateEmail: "david.kim@email.com",
    candidatePhone: "+1 (555) 321-9876",
    appliedDate: "2025-01-14",
    status: "pending",
    experience: "4 years",
    location: "San Jose, CA",
    resumeUrl: "/resume-david.pdf",
    coverLetter:
      "Passionate about clean code and UX. Built responsive apps and optimized performance.",
    skills: ["JavaScript", "React", "CSS", "Redux"],
    education: "BS Computer Science, UC Davis",
    currentCompany: "WebDev Studios",
    noticePeriod: "2 weeks",
    expectedSalary: "$120,000 - $140,000",
    linkedIn: "https://linkedin.com/in/davidkim",
    portfolio: "https://davidkim.com",
    languages: ["English", "Korean"],
  },

  // job-2 Product Manager (2)
  {
    id: "app-4",
    jobId: "job-2",
    jobTitle: "Product Manager",
    candidateName: "Emily Rodriguez",
    candidateEmail: "emily.rodriguez@email.com",
    candidatePhone: "+1 (555) 456-7890",
    appliedDate: "2025-01-16",
    status: "interviewed",
    experience: "6 years",
    location: "New York, NY",
    resumeUrl: "/resume-emily.pdf",
    coverLetter:
      "Seasoned PM with track record launching data-informed products and leading cross-functional teams.",
    rating: 4.8,
    skills: ["Product Strategy", "Agile", "User Research", "Analytics", "Roadmap Planning"],
    education: "MBA, Columbia Business School",
    currentCompany: "StartupXYZ",
    noticePeriod: "3 weeks",
    expectedSalary: "$145,000 - $165,000",
    linkedIn: "https://linkedin.com/in/emilyrodriguez",
    languages: ["English", "French"],
    certifications: ["Product Management Certificate", "Lean Six Sigma Green Belt"],
  },
  {
    id: "app-5",
    jobId: "job-2",
    jobTitle: "Product Manager",
    candidateName: "Ravi Patel",
    candidateEmail: "ravi.patel@email.com",
    candidatePhone: "+1 (555) 222-3344",
    appliedDate: "2025-01-19",
    status: "pending",
    experience: "5 years",
    location: "Jersey City, NJ",
    resumeUrl: "/resume-ravi.pdf",
    coverLetter:
      "PM with B2B SaaS experience, strong analytics background and customer discovery practice.",
    skills: ["JIRA", "SQL", "Experimentation", "Stakeholder Management"],
    education: "BS Information Systems, Rutgers University",
    expectedSalary: "$135,000 - $155,000",
    linkedIn: "https://linkedin.com/in/ravipatel",
  },

  // job-3 UX Designer (2)
  {
    id: "app-6",
    jobId: "job-3",
    jobTitle: "UX Designer",
    candidateName: "Hannah Lee",
    candidateEmail: "hannah.lee@email.com",
    candidatePhone: "+1 (555) 111-2233",
    appliedDate: "2025-01-12",
    status: "reviewed",
    experience: "4 years",
    location: "Los Angeles, CA",
    resumeUrl: "/resume-hannah.pdf",
    coverLetter:
      "UX designer focused on accessible design, prototyping, and usability testing.",
    rating: 4.3,
    skills: ["Figma", "Prototyping", "Usability Testing", "Design Systems"],
    education: "BA Interaction Design, UCLA",
    portfolio: "https://hannahlee.design",
  },
  {
    id: "app-7",
    jobId: "job-3",
    jobTitle: "UX Designer",
    candidateName: "Omar Farouk",
    candidateEmail: "omar.farouk@email.com",
    candidatePhone: "+1 (555) 998-7766",
    appliedDate: "2025-01-09",
    status: "pending",
    experience: "3 years",
    location: "Pasadena, CA",
    resumeUrl: "/resume-omar.pdf",
    coverLetter:
      "I love solving user problems with simple, elegant flows. Comfortable with design handoff.",
    skills: ["Wireframing", "Figma", "HTML/CSS"],
    education: "BS Human-Computer Interaction, UC San Diego",
  },

  // job-4 Data Scientist (3)
  {
    id: "app-8",
    jobId: "job-4",
    jobTitle: "Data Scientist",
    candidateName: "Ling Wu",
    candidateEmail: "ling.wu@email.com",
    candidatePhone: "+1 (555) 444-7788",
    appliedDate: "2025-01-18",
    status: "shortlisted",
    experience: "6 years",
    location: "Seattle, WA",
    resumeUrl: "/resume-ling.pdf",
    coverLetter:
      "Data scientist specializing in ML for user growth and personalization.",
    rating: 4.7,
    skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Airflow"],
    education: "MS Data Science, University of Washington",
    currentCompany: "NorthStar Analytics",
  },
  {
    id: "app-9",
    jobId: "job-4",
    jobTitle: "Data Scientist",
    candidateName: "Mateo Silva",
    candidateEmail: "mateo.silva@email.com",
    candidatePhone: "+1 (555) 555-1212",
    appliedDate: "2025-01-17",
    status: "reviewed",
    experience: "4 years",
    location: "Bellevue, WA",
    resumeUrl: "/resume-mateo.pdf",
    coverLetter:
      "Built forecasting pipelines and experimentation frameworks at scale.",
    skills: ["R", "Python", "Forecasting", "Experiment Design"],
    education: "BS Statistics, UW",
  },
  {
    id: "app-10",
    jobId: "job-4",
    jobTitle: "Data Scientist",
    candidateName: "Nora Ahmed",
    candidateEmail: "n.ahmed@email.com",
    candidatePhone: "+1 (555) 909-4545",
    appliedDate: "2025-01-22",
    status: "pending",
    experience: "3 years",
    location: "Seattle, WA",
    resumeUrl: "/resume-nora.pdf",
    coverLetter:
      "Keen on causal inference and uplift modeling. Looking to grow in a product DS role.",
    skills: ["Python", "SQL", "Causal Inference", "Tableau"],
    education: "MS Applied Math, UW",
  },

  // job-5 DevOps Engineer (2)
  {
    id: "app-11",
    jobId: "job-5",
    jobTitle: "DevOps Engineer",
    candidateName: "Jonas Müller",
    candidateEmail: "jonas.mueller@email.com",
    candidatePhone: "+1 (555) 232-7788",
    appliedDate: "2025-01-11",
    status: "interviewed",
    experience: "8 years",
    location: "Austin, TX",
    resumeUrl: "/resume-jonas.pdf",
    coverLetter:
      "Infra as Code evangelist. Built CI/CD for microservices on EKS and GKE.",
    rating: 4.6,
    skills: ["AWS", "Terraform", "Kubernetes", "GitHub Actions", "Prometheus"],
    education: "BS Computer Engineering, UT Austin",
  },
  {
    id: "app-12",
    jobId: "job-5",
    jobTitle: "DevOps Engineer",
    candidateName: "Priya Nair",
    candidateEmail: "priya.nair@email.com",
    candidatePhone: "+1 (555) 667-2211",
    appliedDate: "2025-01-15",
    status: "pending",
    experience: "5 years",
    location: "Dallas, TX",
    resumeUrl: "/resume-priya.pdf",
    coverLetter:
      "Focused on observability, incident response and cost optimization.",
    skills: ["Azure", "Pulumi", "Helm", "Grafana", "ArgoCD"],
    education: "BS Information Technology, UT Dallas",
  },

  // job-6 Marketing Specialist (2)
  {
    id: "app-13",
    jobId: "job-6",
    jobTitle: "Marketing Specialist",
    candidateName: "Olivia Brown",
    candidateEmail: "olivia.brown@email.com",
    candidatePhone: "+1 (555) 765-2234",
    appliedDate: "2024-12-28",
    status: "rejected",
    experience: "3 years",
    location: "Chicago, IL",
    resumeUrl: "/resume-olivia.pdf",
    coverLetter:
      "Content and lifecycle marketer with strong email and CRM chops.",
    skills: ["HubSpot", "SEO", "Copywriting", "A/B Testing"],
    education: "BA Marketing, DePaul University",
  },
  {
    id: "app-14",
    jobId: "job-6",
    jobTitle: "Marketing Specialist",
    candidateName: "Noah Wilson",
    candidateEmail: "noah.wilson@email.com",
    candidatePhone: "+1 (555) 876-1122",
    appliedDate: "2025-01-02",
    status: "hired",
    experience: "4 years",
    location: "Chicago, IL",
    resumeUrl: "/resume-noah.pdf",
    coverLetter:
      "Owned paid + organic funnels. Comfortable with attribution and dashboards.",
    rating: 4.4,
    skills: ["Google Ads", "Meta Ads", "Analytics", "Looker Studio"],
    education: "BS Business, University of Illinois",
  },
];

export default function EmployerDashboardTemplate() {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | JobStatus>("all");

  const activeJobs = useMemo(
    () => JOBS.filter((j) => j.status === "active").length,
    []
  );
  const totalApps = useMemo(
    () => JOBS.reduce((s, j) => s + j.applications, 0),
    []
  );
  const totalViews = useMemo(() => JOBS.reduce((s, j) => s + j.views, 0), []);

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      const q = search.toLowerCase();
      const matchesText =
        j.title.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q);
      const matchesStatus = status === "all" || j.status === status;
      return matchesText && matchesStatus;
    });
  }, [search, status]);

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

  const appsFor = (id: string) => APPS.filter((a) => a.jobId === id);

  const toggleStatus = (job: JobPosting) => {
    const to = job.status === "active" ? "paused" : "active";
    message.success(`Job ${to === "active" ? "activated" : "paused"}`);
  };

  const deleteJob = (job: JobPosting) => {
    Modal.confirm({
      title: "Delete this job?",
      content: "This action cannot be undone.",
      okType: "danger",
      onOk: () => message.success("Job deleted"),
    });
  };

  // —— Detail view ——
  if (selectedJob) {
    const data = appsFor(selectedJob.id);
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
          <ApplicationsTable data={data} />
        </div>
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
