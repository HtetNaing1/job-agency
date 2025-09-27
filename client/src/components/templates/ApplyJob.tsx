"use client";

import { Form, Input, Select, Upload, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { MapPin, Building2, DollarSign, Clock, ArrowLeft } from "lucide-react";
import Button from "../atoms/Button"
import { useRouter } from "next/navigation";

type JobData = {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  level?: string;
  size?: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
};

export default function ApplyJob({
  jobId = "1",
  job = {
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120k – $150k",
    type: "Full-time",
    level: "Senior Level",
    size: "100-500 employees",
    description:
      "We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building the next generation of our web applications using modern technologies.",
    requirements: [
      "5+ years of experience in React and TypeScript",
      "Experience with modern CSS frameworks",
      "Knowledge of state management libraries",
      "Experience with testing frameworks",
      "Strong problem-solving skills",
    ],
    benefits: [
      "Health, dental, and vision insurance",
      "Flexible work arrangements",
      "401(k) with company matching",
      "Professional development budget",
      "Unlimited PTO",
    ],
  } as JobData,
}: {
  jobId?: string;
  job?: JobData;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back link */}
        <button
          onClick={() => router.back()}
          className="group inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Job Search
        </button>

        {/* Job Header */}
        <h1 className="mt-4 text-2xl font-bold text-gray-900">{job.title}</h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-gray-700">
          <span className="inline-flex items-center gap-1">
            <Building2 className="h-4 w-4" /> {job.company}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <DollarSign className="h-4 w-4" /> {job.salary}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> {job.type}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.level && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
              {job.level}
            </span>
          )}
          {job.size && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
              {job.size}
            </span>
          )}
        </div>

        <Divider className="my-6" />

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column: job details */}
          <aside className="md:col-span-1 space-y-6">
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="text-gray-500 font-semibold mb-2">Job Details</h3>
              <p className="text-gray-800">{job.description}</p>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="text-gray-500 font-semibold mb-2">Requirements</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                {job.requirements?.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="text-gray-500 font-semibold mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                {job.benefits?.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          </aside>

          {/* Right column: application form */}
          <section className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-7">
              <h3 className="text-lg font-semibold text-gray-900">
                Apply for this Position
              </h3>
              <p className="text-gray-600 mt-1">
                Fill out the form below to submit your application. Fields marked
                with * are required.
              </p>

              <Form
                layout="vertical"
                className="mt-6"
                onFinish={(values) => {
                  console.log("Submit application", { jobId, ...values });
                }}
              >
                {/* Personal Information */}
                <h4 className="text-base font-medium text-gray-900 mb-3">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    label="First Name *"
                    name="firstName"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="First name" className="h-11" />
                  </Form.Item>
                  <Form.Item
                    label="Last Name *"
                    name="lastName"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Last name" className="h-11" />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    label="Email Address *"
                    name="email"
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input placeholder="Email" className="h-11" />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number *"
                    name="phone"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Phone" className="h-11" />
                  </Form.Item>
                </div>

                <Divider className="my-5" />

                {/* Resume Upload */}
                <Form.Item
                  label="Resume / CV *"
                  name="resume"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e?.fileList}
                  rules={[{ required: true, message: "Please upload your resume" }]}
                >
                  <Upload.Dragger beforeUpload={() => false} maxCount={1} className="!p-0">
                    <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center">
                      <UploadOutlined className="text-xl" />
                      <div className="mt-2 text-gray-800">Click to upload your resume</div>
                      <div className="text-xs text-gray-500 mt-1">
                        PDF, DOC, or DOCX (max 5MB)
                      </div>
                    </div>
                  </Upload.Dragger>
                </Form.Item>

                <Form.Item label="Cover Letter (Optional)" name="coverLetter">
                  <Upload beforeUpload={() => false} maxCount={1}>
                    <Button label="Upload cover letter" />
                  </Upload>
                </Form.Item>

                <Divider className="my-5" />

                {/* Additional Info */}
                <h4 className="text-base font-medium text-gray-900 mb-3">
                  Additional Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item label="Availability" name="availability">
                    <Select
                      className="h-11"
                      placeholder="Select Availability"
                      options={[
                        { value: "immediate", label: "Immediate" },
                        { value: "2weeks", label: "2 Weeks Notice" },
                        { value: "1month", label: "1 Month Notice" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item label="Salary Expectation" name="salary">
                    <Input placeholder="e.g., $120,000" className="h-8" />
                  </Form.Item>
                </div>

                <Form.Item label="Willing to relocate?" name="relocate">
                  <Select
                    className="h-11"
                    placeholder="Select"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      { value: "maybe", label: "Maybe" },
                    ]}
                  />
                </Form.Item>

                <Form.Item label="Key Skills" name="skills">
                  <Input placeholder="e.g., React, TypeScript, Node.js, Python..." className="h-11" />
                </Form.Item>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-3">
                  <Button label="Cancel" onClick={() => router.back()} />
                  <Button type="primary" htmlType="submit" label="Submit Application" />
                </div>
              </Form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
