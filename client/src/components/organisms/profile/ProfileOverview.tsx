"use client";

import PersonalInfoCard from "@/components/molecules/PersonalInfoCard";
import EducationCard from "@/components/molecules/EducationCard";
import ProfileStrengthCard from "@/components/molecules/ProfileStrengthCard";
import RecentActivityCard from "@/components/molecules/RecentActivityCard";
import SkillsCard from "@/components/molecules/SkillsCard";
import ExperienceCard from "@/components/molecules/ExperienceCard";

type Activity = { title: string; when: string };
type Experience = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
};

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
  skills?: string[];
  experience?: Experience[];
};

interface ProfileOverviewProps {
  profile: Profile;
  onUpdate?: () => void;
}

export default function ProfileOverview({ profile, onUpdate }: ProfileOverviewProps) {
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

        {profile.skills && profile.skills.length > 0 && onUpdate && (
          <SkillsCard skills={profile.skills} onUpdate={onUpdate} />
        )}

        {profile.experience && profile.experience.length > 0 && (
          <ExperienceCard experiences={profile.experience} />
        )}

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
