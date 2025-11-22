// components/organisms/DocumentsSection.tsx
"use client";

import { useState } from "react";
import { Typography, message, Spin } from "antd";
import { Upload } from "antd";
import type { UploadFile } from "antd";
import FileUploader from "@/components/atoms/FileUploader";
import { uploadResume, uploadCoverLetter, updateProfile, UserProfile } from "@/services/profileService";

const { Title, Text } = Typography;

interface DocumentsSectionProps {
  profile: UserProfile;
  onUpdate: () => void;
}

export default function DocumentsSection({ profile, onUpdate }: DocumentsSectionProps) {
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingCoverLetter, setUploadingCoverLetter] = useState(false);

  const handleResumeUpload = async (fileList: UploadFile[]) => {
    if (fileList.length === 0) return;

    const file = fileList[0].originFileObj;
    if (!file) return;

    try {
      setUploadingResume(true);
      const uploadResponse = await uploadResume(file as File);

      if (uploadResponse.err === 0) {
        // Update profile with resume URL
        const updateResponse = await updateProfile({
          resume: uploadResponse.data.url,
        });

        if (updateResponse.err === 0) {
          message.success("Resume uploaded successfully!");
          onUpdate();
        } else {
          message.error(updateResponse.message || "Failed to update profile");
        }
      } else {
        message.error(uploadResponse.message || "Failed to upload resume");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      message.error("Failed to upload resume");
    } finally {
      setUploadingResume(false);
    }
  };

  const handleCoverLetterUpload = async (fileList: UploadFile[]) => {
    if (fileList.length === 0) return;

    const file = fileList[0].originFileObj;
    if (!file) return;

    try {
      setUploadingCoverLetter(true);
      const uploadResponse = await uploadCoverLetter(file as File);

      if (uploadResponse.err === 0) {
        message.success("Cover letter uploaded successfully!");
        // Note: You may want to add a coverLetter field to the profile schema
        // For now, just show success message
      } else {
        message.error(uploadResponse.message || "Failed to upload cover letter");
      }
    } catch (error) {
      console.error("Error uploading cover letter:", error);
      message.error("Failed to upload cover letter");
    } finally {
      setUploadingCoverLetter(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Header */}
      <Title level={5} className="flex items-center gap-2 mb-1">
        📄 Documents & Files
      </Title>
      <Text type="secondary" className="block mb-6">
        Upload and manage your application documents
      </Text>

      {/* Resume */}
      <div className="mb-6">
        <Spin spinning={uploadingResume}>
          <FileUploader
            label="Resume / CV"
            required
            maxCount={1}
            onChange={handleResumeUpload}
          />
        </Spin>
        {profile.resume && (
          <div className="mt-2 text-sm text-green-600">
            ✓ Resume uploaded
            {" - "}
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View current resume
            </a>
          </div>
        )}
      </div>

      {/* Cover Letter */}
      <div>
        <Spin spinning={uploadingCoverLetter}>
          <FileUploader
            label="Cover Letter Template"
            maxCount={1}
            onChange={handleCoverLetterUpload}
          />
        </Spin>
      </div>
    </div>
  );
}
