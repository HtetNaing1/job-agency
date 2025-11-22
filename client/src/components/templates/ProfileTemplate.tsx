"use client";

import { useState } from "react";
import { Tabs } from "antd";
import ProfileHeader from "@/components/molecules/ProfileHeader";
import ProfileOverview from "@/components/organisms/profile/ProfileOverview";
import DocumentsSection from "@/components/organisms/profile/DocumentsSection";

type Activity = { title: string; when: string };
type Profile = {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  education: { degree: string; school: string; year: string };
  certifications: string[];
  completeness: number;
  strengthTips: { text: string; ok?: boolean }[];
  activity: Activity[];
};

const MOCK: Profile = {
  name: "Sarah Johnson",
  headline: "Senior Frontend Developer",
  location: "San Francisco, CA",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  summary:
    "Experienced frontend developer with 5+ years of experience building responsive web applications using React, TypeScript, and modern CSS frameworks. Passionate about creating user-friendly interfaces and collaborating with cross-functional teams.",
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "University of California, Berkeley",
    year: "2019",
  },
  certifications: ["AWS Certified Developer", "Google Analytics Certified"],
  completeness: 85,
  strengthTips: [
    { text: "Profile photo added", ok: true },
    { text: "Summary completed", ok: true },
    { text: "Add more skills" },
  ],
  activity: [
    { title: "Applied to TechCorp Solutions", when: "3 days ago" },
    { title: "Updated profile summary", when: "1 week ago" },
    { title: "Uploaded new resume", when: "2 weeks ago" },
  ],
};

export default function ProfileTemplate() {
  const [profile] = useState(MOCK);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <ProfileHeader
          name={profile.name}
          headline={profile.headline}
          location={profile.location}
          email={profile.email}
          onEdit={() => {}}
        />

        <div className="mt-6">
          <Tabs
            defaultActiveKey="overview"
            className={`
              ant-tabs-profile
              [&_.ant-tabs-nav]:bg-gray-100 [&_.ant-tabs-nav]:rounded-2xl [&_.ant-tabs-nav]:px-2
              [&_.ant-tabs-tab]:rounded-xl
              [&_.ant-tabs-nav-list]:w-full
              [&_.ant-tabs-tab]:flex-1
              [&_.ant-tabs-tab-btn]:w-full [&_.ant-tabs-tab-btn]:text-center
            `}
            items={[
              {
                key: "overview",
                label: <span className="px-4 py-1">Overview</span>,
                children: <ProfileOverview profile={profile} />,
              },
              {
                key: "documents",
                label: <span className="px-4 py-1">Documents</span>,
                children: (
                  <div className="mt-2">
                    <DocumentsSection />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
