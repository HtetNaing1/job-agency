"use client";
import { Pagination, Select } from "antd";
import JobCard from "./JobCard";

export default function JobList({
  jobs,
  page,
  setPage,
  sort,
  setSort,
}: any) {
  return (
    <main className="md:col-span-9 space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-800">Showing {jobs.length} of {jobs.length} jobs</p>
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

      {jobs.map((job: any) => (
        <JobCard key={job.id} job={job} />
      ))}

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
  );
}
