"use client";
import OnboardCard from "@/components/atoms/OnboardCard";
import { Form, Input, Select, Typography } from "antd";
import { Building2, Users, Globe, FileText } from "lucide-react";

const { Title, Text } = Typography;
const { TextArea } = Input;

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Design",
  "Sales",
  "Operations",
  "Human Resources",
  "Legal",
  "Manufacturing",
  "Retail",
  "Consulting",
  "Real Estate",
  "Media & Entertainment",
].map((i) => ({ value: i.toLowerCase(), label: i }));

export default function CompanyInfoStep() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-grid place-items-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-3">
          <Building2 className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">Tell Us About Your Company</h2>
        <p className="text-slate-600 mt-1 text-sm">
          Help candidates understand your organization better.
        </p>
      </div>

      {/* Company Size */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Company Size
          </Title>
        </div>
        <Text className="text-sm">How many employees does your company have?</Text>
        <Form.Item
          name="companySize"
          rules={[{ required: true, message: "Company size is required." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select placeholder="Select company size" options={companySizes} />
        </Form.Item>
      </OnboardCard>

      {/* Industry & Website */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Industry & Website
          </Title>
        </div>
        <div className="space-y-3">
          <Form.Item
            name="industry"
            rules={[{ required: true, message: "Industry is required." }]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Select placeholder="Select your industry" options={industries} showSearch />
          </Form.Item>
          <Form.Item
            name="website"
            rules={[
              { required: false },
              { type: "url", message: "Please enter a valid URL." },
            ]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input
              placeholder="https://yourcompany.com"
              className="h-10"
              prefix={<Globe className="w-4 h-4 text-slate-400" />}
            />
          </Form.Item>
        </div>
      </OnboardCard>

      {/* Company Description */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Company Description
          </Title>
        </div>
        <Text className="text-sm">
          Describe your company, its mission, and what makes it a great place to work.
        </Text>
        <Form.Item
          name="companyDescription"
          rules={[{ required: true, message: "Company description is required." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <TextArea
            rows={5}
            placeholder="Tell candidates about your company culture, values, and what you do..."
            maxLength={1000}
            showCount
          />
        </Form.Item>
      </OnboardCard>
    </div>
  );
}
