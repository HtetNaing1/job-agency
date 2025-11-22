"use client";

import { Input } from "antd";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  showLabel?: boolean; // optional toggle for form layout flexibility
}

export default function PasswordInput({
  label = "",
  value,
  placeholder = "Enter your password",
  onChange,
  disabled = false,
  required = false,
  showLabel = true,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      {showLabel && (
        <label className="flex items-center text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          className="h-12 pr-12"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
