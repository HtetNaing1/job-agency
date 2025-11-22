"use client";
import { Form, Divider, Select } from "antd";
import TextInput from "../atoms/TextInput";
import FileUploader from "../atoms/FileUploader";
import Button from "../atoms/Button";

export default function ApplicationForm({ jobId }: { jobId: string }) {
  return (
    <Form
      layout="vertical"
      className="mt-6"
      onFinish={(values) =>
        console.log("Submit application", { jobId, ...values })
      }
    >
      <h4 className="text-base font-medium text-gray-900 mb-3">
        Personal Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "First name is required" }]}
        >
          <TextInput
            label="First Name"
            placeholder="First name"
            onChange={() => {}}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Last name is required" }]}
        >
          <TextInput
            label="Last Name"
            placeholder="Last name"
            onChange={() => {}}
          />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
          <TextInput
            label="Email Address"
            placeholder="Email"
            onChange={() => {}}
          />
        </Form.Item>
        <Form.Item name="phone" rules={[{ required: true }]}>
          <TextInput
            label="Phone Number"
            placeholder="Phone"
            onChange={() => {}}
          />
        </Form.Item>
      </div>

      <Divider className="my-5" />

      <FileUploader label="Resume / CV" required />
      <FileUploader label="Cover Letter (Optional)" />

      <Divider className="my-5" />

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
      </div>
      <Form.Item label="Salary Expectation" name="salary">
        <TextInput placeholder="e.g., $120,000" onChange={() => {}} />
      </Form.Item>

      <Form.Item label="Key Skills" name="skills">
        <TextInput
          placeholder="e.g., React, TypeScript, Node.js..."
          onChange={() => {}}
        />
      </Form.Item>

      <div className="mt-6 flex justify-end gap-3">
        <Button label="Cancel" />
        <Button type="primary" htmlType="submit" label="Submit Application" />
      </div>
    </Form>
  );
}
