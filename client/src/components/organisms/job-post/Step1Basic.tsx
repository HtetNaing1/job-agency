"use client";
import { Form, Input, Select } from "antd";
import { Briefcase, MapPin } from "lucide-react";
import OnboardCard from "@/components/atoms/OnboardCard";
import { JOB_TYPES, WORK_MODELS } from "@/constant/type";

export default function Step1Basic() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white grid place-items-center mx-auto mb-3">
          <Briefcase className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold">Basic Job Information</h2>
        <p className="text-slate-600 text-sm">Start with the essentials about your opening.</p>
      </div>

      <OnboardCard>
        <div className="grid md:grid-cols-2 gap-4">
          <Form.Item name="title" label="Job Title" rules={[{ required: true, message: "Job title is required" }]}>
            <Input placeholder="e.g., Senior Software Engineer" className="h-10" />
          </Form.Item>
          <Form.Item name="company" label="Company Name" rules={[{ required: true, message: "Company name is required" }]}>
            <Input placeholder="e.g., TechCorp Inc." className="h-10" />
          </Form.Item>

          <Form.Item name="location" label="Location" rules={[{ required: true, message: "Location is required" }]}>
            <Input prefix={<MapPin className="w-4 h-4 text-slate-500" />} placeholder="e.g., New York, NY or Remote" className="h-10" />
          </Form.Item>

          <Form.Item name="jobType" label="Job Type" rules={[{ required: true, message: "Select job type" }]}>
            <Select
              options={JOB_TYPES.map((v) => ({ value: v, label: v }))}
              placeholder="Select job type"
              className="[&_.ant-select-selector]:h-10"
            />
          </Form.Item>

          <Form.Item name="workModel" label="Work Model" className="md:col-span-2" rules={[{ required: true, message: "Select work model" }]}>
            <Select
              options={WORK_MODELS.map((v) => ({ value: v, label: v }))}
              placeholder="On-site / Remote / Hybrid"
              className="[&_.ant-select-selector]:h-10"
            />
          </Form.Item>
        </div>
      </OnboardCard>
    </div>
  );
}
