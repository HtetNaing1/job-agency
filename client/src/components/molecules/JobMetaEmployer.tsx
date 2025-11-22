"use client";
import { Space } from "antd";
import { MapPin, Briefcase, DollarSign, Clock } from "lucide-react";
import { JobPosting } from "@/constant/type";

export default function JobMeta({ job }: { job: JobPosting }) {
  return (
    <Space size="large" wrap className="text-slate-600">
      <span><MapPin className="inline w-4 h-4 mr-1" />{job.location}</span>
      <span><Briefcase className="inline w-4 h-4 mr-1" />{job.jobType} • {job.workModel}</span>
      <span><DollarSign className="inline w-4 h-4 mr-1" />{job.currency} {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}</span>
      <span><Clock className="inline w-4 h-4 mr-1" />Deadline: {job.deadline}</span>
    </Space>
  );
}
