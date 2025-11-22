"use client";

import { Select } from "antd";
import { Users } from "lucide-react";

interface RoleSelectProps {
  value: string | null;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  showLabel?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function RoleSelect({
  value,
  onChange,
  label = "I am a",
  required = false,
  showLabel = true,
  disabled = false,
  placeholder = "Select your role",
}: RoleSelectProps) {
  return (
    <div className="w-full">
      {showLabel && (
        <label
          htmlFor="role"
          className="flex items-center text-sm font-medium text-gray-700 mb-1"
        >
          <Users className="h-4 w-4 mr-2" /> {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Select
        id="role"
        placeholder={placeholder}
        className="w-full h-12"
        value={value ?? undefined}
        onChange={onChange}
        disabled={disabled}
        options={[
          { value: "jobseeker", label: "Job Seeker" },
          { value: "employer", label: "Employer / Recruiter" },
          { value: "trainingProvider", label: "Training Provider" },
        ]}
      />
    </div>
  );
}
