"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const FilterSidebar = dynamic(() => import("../organisms/jobs/FilterSidebar"), {
  ssr: false,
});
const JobList = dynamic(() => import("../organisms/jobs/JobList"), { ssr: false });

const JOBS = [
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

export default function JobsTemplate() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <FilterSidebar />
        <JobList
          jobs={JOBS}
          page={page}
          setPage={setPage}
          sort={sort}
          setSort={setSort}
        />
      </div>
    </div>
  );
}
