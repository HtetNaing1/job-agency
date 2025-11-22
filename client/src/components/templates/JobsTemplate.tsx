"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { message, Spin } from "antd";
import { getAllJobs, getRecommendedJobs, Job, JobFilters } from "@/services/jobService";
import Cookies from "js-cookie";

const FilterSidebar = dynamic(() => import("../organisms/jobs/FilterSidebar"), {
  ssr: false,
});
const JobList = dynamic(() => import("../organisms/jobs/JobList"), { ssr: false });

export default function JobsTemplate() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState<JobFilters>({
    page: 1,
    limit: 10,
  });

  const isLoggedIn = !!Cookies.get("accessToken");

  // Fetch jobs based on filters
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getAllJobs({ ...filters, page, sort });

      if (response.err === 0) {
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
      } else {
        message.error(response.message || "Failed to load jobs");
      }
    } catch (error: any) {
      console.error("Error fetching jobs:", error);
      message.error(error?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // Fetch recommended jobs if user is logged in
  const fetchRecommendedJobs = async () => {
    try {
      setLoading(true);
      const response = await getRecommendedJobs();

      if (response.err === 0) {
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
      } else {
        // If recommendations fail, fall back to all jobs
        fetchJobs();
      }
    } catch (error) {
      // If recommendations fail, fall back to all jobs
      fetchJobs();
    }
  };

  useEffect(() => {
    if (isLoggedIn && page === 1 && Object.keys(filters).length === 2) {
      // Show recommended jobs on first load for logged-in users
      fetchRecommendedJobs();
    } else {
      fetchJobs();
    }
  }, [page, filters, sort]);

  const handleFilterChange = (newFilters: Partial<JobFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page when filters change
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <FilterSidebar onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="col-span-1 md:col-span-9 flex items-center justify-center min-h-[400px]">
            <Spin size="large" />
          </div>
        ) : (
          <JobList
            jobs={jobs}
            page={page}
            setPage={setPage}
            sort={sort}
            setSort={setSort}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}
