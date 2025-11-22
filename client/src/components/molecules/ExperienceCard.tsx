"use client";

import { Divider } from "antd";
import { Briefcase } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

interface ExperienceCardProps {
  experiences: Experience[];
}

export default function ExperienceCard({ experiences }: ExperienceCardProps) {
  if (!experiences || experiences.length === 0) {
    return (
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="flex items-center gap-2 text-gray-900 font-semibold">
          <Briefcase className="h-5 w-5" /> Work Experience
        </h3>
        <p className="mt-4 text-gray-500">No work experience added yet</p>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
        <Briefcase className="h-5 w-5" /> Work Experience
      </h3>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index}>
            <h4 className="text-lg font-semibold text-gray-900">{exp.title}</h4>
            <p className="text-gray-700 font-medium">{exp.company}</p>
            <p className="text-sm text-gray-600">
              {exp.location} • {formatDate(exp.startDate)} -{" "}
              {exp.current ? "Present" : formatDate(exp.endDate || "")}
            </p>
            <p className="mt-2 text-gray-700">{exp.description}</p>
            {index < experiences.length - 1 && <Divider className="my-4" />}
          </div>
        ))}
      </div>
    </section>
  );
}
