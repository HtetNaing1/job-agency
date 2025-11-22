"use client";
import Button from "@/components/atoms/Button";
import JobMeta from "@/components/molecules/JobMeta";
import { useRouter } from "next/navigation";

interface JobCardProps {
  job: {
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
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-start">
      <div className="flex-1">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-600">
          {job.title}
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-gray-800">
            {job.type}
          </span>
        </h3>

        <JobMeta
          company={job.company}
          location={job.location}
          salary={job.salary}
          posted={job.posted}
        />

        <p className="mt-2 text-sm text-gray-800">{job.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {job.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-600"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <Button
        label="Apply Now"
        type="primary"
        className="ml-6 shrink-0 h-10"
        onClick={() => router.push(`/jobs/${job.id}/apply`)}
      />
    </div>
  );
}
