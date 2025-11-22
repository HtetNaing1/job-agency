"use client";
import { Divider } from "antd";
import JobDetailsSection from "@/components/molecules/JobDetailsSection";
import ApplicationForm from "@/components/molecules/ApplicationForm";
import { JobData } from "@/constant/type";

export default function ApplyJobLayout({ job }: { job: JobData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left column */}
      <aside className="md:col-span-1 space-y-6">
        <JobDetailsSection title="Job Details" items={job.description || []} />
        <JobDetailsSection title="Requirements" items={job.requirements || []} />
        <JobDetailsSection title="Benefits" items={job.benefits || []} />
      </aside>

      {/* Right column */}
      <section className="md:col-span-2">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900">Apply for this Position</h3>
          <p className="text-gray-600 mt-1">Fill out the form below to submit your application.</p>
          <ApplicationForm jobId="1" />
        </div>
      </section>
    </div>
  );
}
