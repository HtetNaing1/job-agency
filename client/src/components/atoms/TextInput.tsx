"use client";
import { Input } from "antd";
import { ReactNode } from "react";

interface TextInputProps {
  label?: string;
  icon?: ReactNode;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  type?: string; // new 👈 allows password/email/number
  disabled?: boolean; // new 👈 for disabled state
}

export default function TextInput({
  label,
  icon,
  value,
  placeholder,
  onChange,
  className = "h-12",
  type = "text", // default to text
  disabled = false,
}: TextInputProps) {
  return (
    <div className="">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Input
        type={type}
        prefix={icon}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}
