"use client";

import { Divider } from "antd";
import { Mail, Phone, MapPin, UserRound } from "lucide-react";

type PersonalInfoCardProps = {
  email: string;
  phone: string;
  location: string;
  summary: string;
};

export default function PersonalInfoCard({
  email,
  phone,
  location,
  summary,
}: PersonalInfoCardProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="flex items-center gap-2 text-gray-900 font-semibold">
        <UserRound className="h-5 w-5" /> Personal Information
      </h3>

      <div className="mt-4 space-y-3 text-gray-800">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-gray-500" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{location}</span>
        </div>
      </div>

      <Divider className="my-6" />

      <div>
        <h4 className="font-semibold text-gray-900">Professional Summary</h4>
        <p className="mt-2 text-gray-700">{summary}</p>
      </div>
    </section>
  );
}
