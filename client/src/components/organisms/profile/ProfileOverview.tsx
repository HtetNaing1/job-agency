"use client";

import PersonalInfoCard from "@/components/molecules/PersonalInfoCard";
import EducationCard from "@/components/molecules/EducationCard";
import ProfileStrengthCard from "@/components/molecules/ProfileStrengthCard";
import RecentActivityCard from "@/components/molecules/RecentActivityCard";

type Activity = { title: string; when: string };
type Profile = {
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: { degree: string; school: string; year: string };
  certifications: string[];
  completeness: number;
  strengthTips: { text: string; ok?: boolean }[];
  activity: Activity[];
};

export default function ProfileOverview({ profile }: { profile: Profile }) {
  return (
    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left (2 cols) */}
      <div className="md:col-span-2 space-y-6">
        <PersonalInfoCard
          email={profile.email}
          phone={profile.phone}
          location={profile.location}
          summary={profile.summary}
        />
        <EducationCard
          degree={profile.education.degree}
          school={profile.education.school}
          year={profile.education.year}
          certifications={profile.certifications}
        />
      </div>

      {/* Right (sidebar) */}
      <aside className="space-y-6">
        <ProfileStrengthCard completeness={profile.completeness} tips={profile.strengthTips} />
        <RecentActivityCard activity={profile.activity} />
      </aside>
    </div>
  );
}
