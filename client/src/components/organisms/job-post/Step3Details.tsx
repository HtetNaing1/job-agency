"use client";
import { Form, Input } from "antd";
import { Users } from "lucide-react";
import OnboardCard from "@/components/atoms/OnboardCard";
import TagsInput from "@/components/atoms/TagsInput";

const { TextArea } = Input;

export default function Step3Details() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-amber-500 text-white grid place-items-center mx-auto mb-3">
          <Users className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold">Job Details</h2>
        <p className="text-slate-600 text-sm">Describe the role and required skills.</p>
      </div>

      <OnboardCard>
        <Form.Item name="description" label="Job Description" rules={[{ required: true }]}>
          <TextArea placeholder="Describe the role, team, and impact…" className="min-h-[120px]" />
        </Form.Item>

        <Form.Item name="requirements" label="Requirements" rules={[{ required: true, type: "array", min: 1, message: "Add at least 1 requirement" }]} initialValue={[]}>
          <TagsInput placeholder="Add a requirement and press Enter" />
        </Form.Item>

        <Form.Item name="responsibilities" label="Key Responsibilities" rules={[{ required: true, type: "array", min: 1, message: "Add at least 1 responsibility" }]} initialValue={[]}>
          <TagsInput placeholder="Add a responsibility and press Enter" />
        </Form.Item>

        <Form.Item name="skills" label="Required Skills & Technologies" initialValue={[]}>
          <TagsInput placeholder="e.g., React, Python, Project Management" />
        </Form.Item>
      </OnboardCard>
    </div>
  );
}
