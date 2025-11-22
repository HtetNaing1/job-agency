"use client";

import { Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { Camera } from "lucide-react";
import { useState } from "react";

interface AvatarUploaderProps {
  value?: string;                 // base64 or URL
  onChange?: (dataUrl: string) => void;
}

export default function AvatarUploader({ value, onChange }: AvatarUploaderProps) {
  const [fileList, setFileList] = useState<UploadFile[]>(
    value
      ? [{ uid: "-1", name: "avatar.png", status: "done", url: value }]
      : []
  );

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      accept="image/*"
      beforeUpload={() => false}
      maxCount={1}
      onChange={async ({ file, fileList }) => {
        setFileList(fileList);
        // convert selected image to base64
        if (file.originFileObj && onChange) {
          const reader = new FileReader();
          reader.onload = () => onChange(String(reader.result || ""));
          reader.readAsDataURL(file.originFileObj);
        }
      }}
      onRemove={() => {
        setFileList([]);
        onChange?.("");
      }}
    >
      {fileList.length >= 1 ? null : (
        <div className="text-gray-600">
          <Camera className="mx-auto mb-2 h-5 w-5" />
          <div>Upload</div>
        </div>
      )}
    </Upload>
  );
}
