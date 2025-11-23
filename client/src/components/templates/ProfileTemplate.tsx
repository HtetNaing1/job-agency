"use client";

import { useState, useEffect } from "react";
import { Tabs, Spin, message } from "antd";
import ProfileHeader from "@/components/molecules/ProfileHeader";
import ProfileOverview from "@/components/organisms/profile/ProfileOverview";
import DocumentsSection from "@/components/organisms/profile/DocumentsSection";
import EditProfileModal from "@/components/molecules/EditProfileModal";
import { getMyProfile, UserProfile } from "@/services/profileService";

export default function ProfileTemplate() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getMyProfile();
      if (response.err === 0) {
        setProfile(response.data);
      } else {
        message.error(response.message || "Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      message.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  // Calculate profile completeness
  const calculateCompleteness = (profile: UserProfile): number => {
    if (!profile) return 0;

    const fields = [
      profile.name,
      profile.email,
      profile.phone,
      profile.location,
      profile.bio,
      profile.avatar,
      profile.resume,
      profile.skills && profile.skills.length > 0,
      profile.education && profile.education.length > 0,
      profile.certifications && profile.certifications.length > 0,
    ];

    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  // Generate strength tips
  const getStrengthTips = (profile: UserProfile) => {
    const tips: { text: string; ok?: boolean }[] = [];

    if (profile.avatar) {
      tips.push({ text: "Profile photo added", ok: true });
    } else {
      tips.push({ text: "Add a profile photo" });
    }

    if (profile.bio && profile.bio.length > 50) {
      tips.push({ text: "Professional summary completed", ok: true });
    } else {
      tips.push({ text: "Add a professional summary" });
    }

    if (profile.skills && profile.skills.length >= 5) {
      tips.push({ text: "Skills section completed", ok: true });
    } else {
      tips.push({ text: "Add more skills" });
    }

    if (profile.resume) {
      tips.push({ text: "Resume uploaded", ok: true });
    } else {
      tips.push({ text: "Upload your resume" });
    }

    return tips;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile</p>
        </div>
      </div>
    );
  }

  const completeness = calculateCompleteness(profile);
  const strengthTips = getStrengthTips(profile);

  // Get primary education (first one or empty object)
  const primaryEducation = profile.education && profile.education.length > 0
    ? profile.education[0]
    : null;

  // Get certifications as array of strings
  const certifications = profile.certifications
    ? profile.certifications.map(cert => cert.name)
    : [];

  // Mock activity - in a real app, this would come from an API
  const activity = [
    { title: "Profile updated", when: "Recently" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <ProfileHeader
          name={profile.name}
          headline={profile.role}
          location={profile.location || "Not specified"}
          email={profile.email}
          onEdit={() => setEditModalVisible(true)}
        />

        <EditProfileModal
          visible={editModalVisible}
          profile={profile}
          onClose={() => setEditModalVisible(false)}
          onUpdate={fetchProfile}
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
                children: (
                  <ProfileOverview
                    profile={{
                      email: profile.email,
                      phone: profile.phone || "Not specified",
                      location: profile.location || "Not specified",
                      summary: profile.bio || "No bio added yet",
                      education: primaryEducation
                        ? {
                            degree: primaryEducation.degree,
                            school: primaryEducation.institution,
                            year: new Date(primaryEducation.endDate || primaryEducation.startDate).getFullYear().toString(),
                          }
                        : {
                            degree: "No education added",
                            school: "",
                            year: "",
                          },
                      certifications,
                      completeness,
                      strengthTips,
                      activity,
                      skills: profile.skills || [],
                      experience: profile.experience || [],
                    }}
                    onUpdate={fetchProfile}
                  />
                ),
              },
              {
                key: "documents",
                label: <span className="px-4 py-1">Documents</span>,
                children: (
                  <div className="mt-2">
                    <DocumentsSection profile={profile} onUpdate={fetchProfile} />
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
