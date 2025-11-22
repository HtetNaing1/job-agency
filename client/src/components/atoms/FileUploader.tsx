"use client";
import { Upload } from "antd";
import { UploadCloud } from "lucide-react";

interface FileUploaderProps {
  label: string;
  required?: boolean;
  maxCount?: number;
  accept?: string; // ✅ allows restricting file types (e.g., ".pdf,.docx")
  hint?: string; // ✅ optional text hint below the upload area
  onChange?: (fileList: any) => void; // ✅ event handler
}

export default function FileUploader({
  label,
  required,
  maxCount = 1,
  accept = ".pdf,.doc,.docx",
  hint = "PDF, DOC, or DOCX (max 5MB)",
  onChange,
}: FileUploaderProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Upload.Dragger
        beforeUpload={() => false} // disables auto-upload
        maxCount={maxCount}
        accept={accept}
        onChange={(info) => onChange?.(info.fileList)}
        className="!p-0"
      >
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400">
          <UploadCloud className="h-6 w-6 text-gray-500 mx-auto" />
          <div className="mt-2 text-gray-800 font-medium">
            Click or drag to upload
          </div>
          {hint && (
            <div className="text-xs text-gray-500 mt-1">
              {hint}
            </div>
          )}
        </div>
      </Upload.Dragger>
    </div>
  );
}
