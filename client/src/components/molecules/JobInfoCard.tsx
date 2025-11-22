"use client";
import { JobData } from "@/constant/type";
import { Building2, MapPin, DollarSign, Clock } from "lucide-react";

export default function JobInfoCard({ job }: { job: JobData }) {
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-gray-700">
        <span className="inline-flex items-center gap-1">
          <Building2 className="h-4 w-4" /> {job.company}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-4 w-4" /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <DollarSign className="h-4 w-4" /> {job.salary}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4" /> {job.type}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {job.level && (
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
            {job.level}
          </span>
        )}
        {job.size && (
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
            {job.size}
          </span>
        )}
      </div>
    </div>
  );
}
