"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Divider } from "antd";
import ApplyJobLayout from "../organisms/ApplyJobLayout";
import JobInfoCard from "../molecules/JobInfoCard";
import { JobData } from "@/constant/type";

const jobDetails = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "TechCorp Solutions",
  location: "San Francisco, CA",
  salary: "$120k – $150k",
  type: "Full-time",
  level: "Senior Level",
  size: "100-500 employees",
  description: [
    "We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building the next generation of our web applications using modern technologies.",
  ],
  requirements: [
    "5+ years of experience in React and TypeScript",
    "Experience with modern CSS frameworks",
    "Knowledge of state management libraries",
    "Experience with testing frameworks",
    "Strong problem-solving skills",
  ],
  benefits: [
    "Health, dental, and vision insurance",
    "Flexible work arrangements",
    "401(k) with company matching",
    "Professional development budget",
    "Unlimited PTO",
  ],
} as JobData;

export default function ApplyJobTemplate({
  jobId,
}: {
  jobId: string;
}) {
  const router = useRouter();
  const job: JobData = jobDetails

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={() => router.back()}
          className="group inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Job Search
        </button>
        <>sadf</>

        <JobInfoCard job={job} />

        <Divider className="my-6" />
        <ApplyJobLayout job={job} />
      </div>
    </div>
  );
}
