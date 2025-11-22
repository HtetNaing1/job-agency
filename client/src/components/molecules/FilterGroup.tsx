"use client";
import { Checkbox, Select } from "antd";

interface FilterGroupProps {
  title: string;
  options: string[];
}

export default function FilterGroup({ title, options }: FilterGroupProps) {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2 text-gray-600">{title}</p>
      {options.map((opt) => (
        <div key={opt}>
          <Checkbox>{opt}</Checkbox>
        </div>
      ))}
    </div>
  );
}
