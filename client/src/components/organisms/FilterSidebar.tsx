"use client";
import { Divider, Select } from "antd";
import { Briefcase, MapPin } from "lucide-react";
import Button from "../atoms/Button";
import TextInput from "../atoms/TextInput";
import FilterGroup from "../molecules/FilterGroup";

export default function FilterSidebar() {
  return (
    <aside className="md:col-span-3 space-y-6 mt-4">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="font-semibold text-lg mb-4 text-gray-600">Filters</h2>

        {/* ✅ Reuse TextInput Atom */}
        <div className="flex flex-col gap-4">
          <TextInput
            label=""
            icon={<Briefcase className="h-4 w-4 text-gray-400" />}
            placeholder="Job title, keywords..."
            onChange={() => {}}
          />
          <TextInput
            label=""
            icon={<MapPin className="h-4 w-4 text-gray-400" />}
            placeholder="City, state, or remote"
            onChange={() => {}}
          />

          <FilterGroup
            title="Job Type"
            options={[
              "Full-time",
              "Part-time",
              "Contract",
              "Internship",
              "Remote",
            ]}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Select
            className="w-full mb-3"
            defaultValue="Any experience"
            options={[
              { value: "any", label: "Any experience" },
              { value: "entry", label: "Entry level" },
              { value: "mid", label: "Mid-level" },
              { value: "senior", label: "Senior" },
            ]}
          />
          <Select
            className="w-full mb-3"
            defaultValue="Any industry"
            options={[
              { value: "any", label: "Any industry" },
              { value: "tech", label: "Technology" },
              { value: "design", label: "Design" },
              { value: "marketing", label: "Marketing" },
            ]}
          />
        </div>

        <Divider />
        <Button
          label="Apply Filters"
          type="primary"
          className="w-full h-11 mb-2"
        />
        <Button label="Clear All" className="w-full h-11" />
      </div>
    </aside>
  );
}
