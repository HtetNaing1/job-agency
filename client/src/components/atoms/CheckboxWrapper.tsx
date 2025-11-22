"use client";
import { Checkbox } from "antd";

interface CheckboxWrapperProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
}

export default function CheckboxWrapper({ checked, onChange, label }: CheckboxWrapperProps) {
  return (
    <div className="pt-1">
      <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)}>
        {label}
      </Checkbox>
    </div>
  );
}
