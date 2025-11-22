// components/organisms/DocumentsSection.tsx
"use client";

import { Typography } from "antd";
import FileUploader from "@/components/atoms/FileUploader";

const { Title, Text } = Typography;

export default function DocumentsSection() {
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
      <FileUploader label="Resume / CV" required maxCount={1} />

      {/* Cover Letter */}
      <FileUploader label="Cover Letter Template" maxCount={1} />
    </div>
  );
}
