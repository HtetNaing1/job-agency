"use client";

import { useMemo, useState } from "react";
import { Tabs, Typography } from "antd";
import Button from "@/components/atoms/Button";
import { Search } from "lucide-react";

import FilterBar from "@/components/molecules/FilterBar";
import ApplicationsList from "../organisms/job-dashboard/ApplicationList";
import InterviewsList from "../organisms/job-dashboard/InterviewList";
import BookmarksList from "../organisms/job-dashboard/BookmarkList";

const { Title, Text } = Typography;

export type AppStatus = "pending" | "reviewed" | "interview" | "rejected" | "accepted" | "withdrawn";
export type JobType = "full-time" | "part-time" | "contract" | "remote";

export type JobApplication = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: AppStatus;
  salary: string;
  jobType: JobType;
  lastUpdate: string;
};

export type Interview = {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  duration: string;
  type: "phone" | "video" | "in-person";
  meetingLink?: string;
  address?: string;
};

export type BookmarkedJob = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  jobType: JobType;
  postedDate: string;
  deadline: string;
  saved: boolean;
};

// Mock data
const APPLICATIONS: JobApplication[] = [
  { id: "1", jobTitle: "Senior Frontend Developer", company: "TechCorp Solutions", location: "San Francisco, CA", appliedDate: "1/15/2024", status: "interview", salary: "$120k – $150k", jobType: "full-time", lastUpdate: "1/18/2024" },
  { id: "2", jobTitle: "Full Stack Developer", company: "StartupXYZ", location: "Remote", appliedDate: "1/12/2024", status: "reviewed", salary: "$100k – $130k", jobType: "remote", lastUpdate: "1/16/2024" },
  { id: "3", jobTitle: "React Developer", company: "Digital Agency Co", location: "San Jose, CA", appliedDate: "1/10/2024", status: "pending", salary: "$90k – $110k", jobType: "full-time", lastUpdate: "1/10/2024" },
  { id: "4", jobTitle: "Frontend Engineer", company: "Enterprise Corp", location: "Palo Alto, CA", appliedDate: "1/8/2024", status: "rejected", salary: "$110k – $140k", jobType: "full-time", lastUpdate: "1/14/2024" },
  { id: "5", jobTitle: "UI/UX Developer", company: "Creative Studios", location: "Los Angeles, CA", appliedDate: "1/5/2024", status: "accepted", salary: "$95k – $125k", jobType: "full-time", lastUpdate: "1/17/2024" },
];

const INTERVIEWS: Interview[] = [
  { id: "i1", jobTitle: "Senior Frontend Developer", company: "TechCorp Solutions", date: "1/22/2024", time: "2:00 PM", duration: "45 minutes", type: "video", meetingLink: "https://zoom.us/j/123456789" },
  { id: "i2", jobTitle: "Full Stack Developer", company: "StartupXYZ", date: "1/25/2024", time: "10:30 AM", duration: "30 minutes", type: "phone" },
  { id: "i3", jobTitle: "Frontend Engineer", company: "Innovation Labs", date: "1/28/2024", time: "1:00 PM", duration: "60 minutes", type: "in-person", address: "123 Tech Street, San Francisco, CA 94105" },
];

const BOOKMARKS: BookmarkedJob[] = [
  { id: "b1", jobTitle: "Senior React Developer", company: "InnovateTech", location: "Seattle, WA", salary: "$130k – $160k", jobType: "full-time", postedDate: "1/18/2024", deadline: "2/15/2024", saved: true },
  { id: "b2", jobTitle: "Frontend Architect", company: "Cloud Systems Inc", location: "Remote", salary: "$150k – $180k", jobType: "remote", postedDate: "1/16/2024", deadline: "2/20/2024", saved: true },
  { id: "b3", jobTitle: "JavaScript Engineer", company: "WebFlow Solutions", location: "Austin, TX", salary: "$110k – $140k", jobType: "full-time", postedDate: "1/14/2024", deadline: "2/10/2024", saved: true },
];

export default function JobsDashboardTemplate() {
  const [activeTab, setActiveTab] = useState<"applied" | "interviews" | "bookmarks">("applied");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | AppStatus>("all");

  const filteredApps = useMemo(() => {
    const q = search.toLowerCase();
    return APPLICATIONS.filter((a) => {
      const matchesSearch = a.jobTitle.toLowerCase().includes(q) || a.company.toLowerCase().includes(q);
      const matchesStatus = status === "all" ? true : a.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Title level={2} style={{ marginBottom: 4 }}>Job Dashboard</Title>
              <Text type="secondary">Track your applications, interviews, and saved jobs</Text>
            </div>
            <Button type="primary" icon={<Search className="h-4 w-4" />} label="Find New Jobs" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={(k) => setActiveTab(k as any)}
          items={[
            { key: "applied", label: `Applied Jobs (${APPLICATIONS.length})` },
            { key: "interviews", label: `Interviews (${INTERVIEWS.length})` },
            { key: "bookmarks", label: `Bookmarked (${BOOKMARKS.filter(b => b.saved).length})` },
          ]}
          className="mb-4"
        />

        {/* Reusable filter bar (shown for Applied tab) */}
        {activeTab === "applied" && (
          <FilterBar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search applications…"
            selects={[
              {
                key: "status",
                value: status,
                options: [
                  { value: "all", label: "All Status" },
                  { value: "pending", label: "Pending" },
                  { value: "reviewed", label: "Under Review" },
                  { value: "interview", label: "Interview" },
                  { value: "accepted", label: "Accepted" },
                  { value: "rejected", label: "Rejected" },
                ],
                ariaLabel: "Filter by status",
              },
            ]}
            onSelectChange={(key, val) => {
              if (key === "status") setStatus(val as "all" | AppStatus);
            }}
          />
        )}

        {/* Content panels */}
        {activeTab === "applied" && <ApplicationsList applications={filteredApps} />}
        {activeTab === "interviews" && <InterviewsList interviews={INTERVIEWS} />}
        {activeTab === "bookmarks" && <BookmarksList bookmarks={BOOKMARKS.filter((b) => b.saved)} />}
      </div>
    </div>
  );
}
