"use client";

import { useState } from "react";
import { Input, Checkbox, Select, Pagination, Divider } from "antd";
import { Briefcase, MapPin, DollarSign, Clock, Building2 } from "lucide-react";
import Button from "@/components/atoms/Button";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
  type: string;
  description: string;
  tags: string[];
};

const JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 – $160,000",
    posted: "2 days ago",
    type: "Full-time",
    description:
      "We're looking for an experienced frontend developer to join our dynamic team and build amazing user experiences.",
    tags: ["Senior", "Technology", "51-200 employees"],
  },
  {
    id: "2",
    title: "Product Manager",
    company: "InnovateLabs",
    location: "New York, NY",
    salary: "$100,000 – $140,000",
    posted: "1 day ago",
    type: "Full-time",
    description:
      "Lead product strategy and development for our cutting-edge SaaS platform.",
    tags: ["Mid-level", "Technology", "11-50 employees"],
  },
  {
    id: "3",
    title: "Marketing Specialist",
    company: "GrowthAgency",
    location: "Remote",
    salary: "$70,000 – $90,000",
    posted: "3 days ago",
    type: "Contract",
    description:
      "Drive marketing campaigns and brand awareness for exciting startup clients.",
    tags: ["Mid-level", "Marketing", "11-50 employees"],
  },
];

export default function JobSearch() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="md:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-lg mb-4 text-gray-600">Filters</h2>

            {/* Keyword */}
            <div className="mb-4">
              <Input
                prefix={<Briefcase className="h-4 w-4 text-gray-400" />}
                placeholder="Job title, keywords..."
                className="h-11"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <Input
                prefix={<MapPin className="h-4 w-4 text-gray-400" />}
                placeholder="City, state, or remote"
                className="h-11"
              />
            </div>

            {/* Job type */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2 text-gray-600">Job Type</p>
              {[
                "Full-time",
                "Part-time",
                "Contract",
                "Internship",
                "Remote",
              ].map((jt) => (
                <div key={jt}>
                  <Checkbox>{jt}</Checkbox>
                </div>
              ))}
            </div>

            {/* Dropdown filters */}
            <div className="flex flex-col gap-3">
              <Select
                className="w-full mb-3"
                defaultValue="Any experience"
                options={[
                  { value: "any", label: "Any experience" },
                  { value: "entry", label: "Entry level" },
                  { value: "mid", label: "Mid-level" },
                  { value: "senior", label: "Senior" },
                ]}
              />
              <Select
                className="w-full mb-3"
                defaultValue="Any industry"
                options={[
                  { value: "any", label: "Any industry" },
                  { value: "tech", label: "Technology" },
                  { value: "design", label: "Design" },
                  { value: "marketing", label: "Marketing" },
                ]}
              />
              <Select
                className="w-full mb-3"
                defaultValue="Any size"
                options={[
                  { value: "any", label: "Any size" },
                  { value: "1-50", label: "1–50 employees" },
                  { value: "51-200", label: "51–200 employees" },
                  { value: "201-500", label: "201–500 employees" },
                ]}
              />
              <Select
                className="w-full mb-4"
                defaultValue="Any time"
                options={[
                  { value: "any", label: "Any time" },
                  { value: "1", label: "Past 24 hours" },
                  { value: "7", label: "Past week" },
                  { value: "30", label: "Past month" },
                ]}
              />
            </div>
            <Divider/>
              <Button
                label="Apply Filters"
                type="primary"
                className="w-full h-11 mb-2"
              />
              <Button label="Clear All" className="w-full h-11" />
          </div>
        </aside>

        {/* Job Listings */}
        <main className="md:col-span-9 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-800">
              Showing {JOBS.length} of {JOBS.length} jobs
            </p>
            <Select
              value={sort}
              onChange={setSort}
              className="w-40"
              options={[
                { value: "newest", label: "Newest first" },
                { value: "oldest", label: "Oldest first" },
                { value: "salary", label: "Highest salary" },
              ]}
            />
          </div>

          {/* Job Cards */}
          {JOBS.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-600">
                  {job.title}
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-gray-800">
                    {job.type}
                  </span>
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-800 mt-1">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" /> {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" /> {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {job.posted}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-800">{job.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                label="Apply Now"
                type="primary"
                className="ml-6 shrink-0 h-10"
              />
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center pt-6">
            <Pagination
              current={page}
              total={30}
              pageSize={6}
              onChange={(p) => setPage(p)}
              showSizeChanger={false}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
