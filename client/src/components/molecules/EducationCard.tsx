"use client";

import { Divider } from "antd";
import { GraduationCap } from "lucide-react";

type EducationCardProps = {
  degree: string;
  school: string;
  year: string;
  certifications?: string[];
};

export default function EducationCard({
  degree,
  school,
  year,
  certifications = [],
}: EducationCardProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="flex items-center gap-2 text-gray-900 font-semibold">
        <GraduationCap className="h-5 w-5" /> Education
      </h3>

      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-900">{degree}</h4>
        <p className="text-gray-600">
          {school} • {year}
        </p>
      </div>

      {certifications.length > 0 && (
        <>
          <Divider className="my-6" />
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Certifications</h4>
            <p className="text-gray-700">{certifications.join(", ")}</p>
          </div>
        </>
      )}
    </section>
  );
}
