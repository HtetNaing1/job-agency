"use client";
import OnboardCard from "@/components/atoms/OnboardCard";
import { Form, Input, Select, Typography } from "antd";
import { Briefcase, Building2, Code, GraduationCap } from "lucide-react";

const { Title } = Typography;

const experienceLevels = [
  { value: "entry", label: "Entry (0–2 yrs)" },
  { value: "mid", label: "Mid (3–5 yrs)" },
  { value: "senior", label: "Senior (6–10 yrs)" },
  { value: "lead", label: "Lead (10+ yrs)" },
];

const industries = [
  "Technology","Healthcare","Finance","Education","Marketing","Design","Sales","Operations","Human Resources","Legal","Manufacturing","Retail","Consulting","Real Estate","Media & Entertainment",
].map((i) => ({ value: i.toLowerCase(), label: i }));

const educationLevels = [
  "High School","Associate Degree","Bachelor's Degree","Master's Degree","PhD/Doctorate","Professional Certification","Trade School","Some College",
].map((e) => ({ value: e.toLowerCase(), label: e }));

export default function ProfessionalInfoStep() {
  return (
    <div className="space-y-6">
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Experience Level</Title>
        </div>
        <Form.Item
          name="experienceLevel"
          rules={[{ required: true, message: "Experience level is required." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select placeholder="Select your experience level" options={experienceLevels} />
        </Form.Item>
      </OnboardCard>

      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Industry & Role</Title>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <Form.Item
            name="industry"
            rules={[{ required: true, message: "Industry is required." }]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Select placeholder="Select industry" options={industries} showSearch />
          </Form.Item>
          <Form.Item
            name="currentRole"
            rules={[{ required: true, message: "Current role is required." }]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input placeholder="e.g., Software Engineer" className="h-10" />
          </Form.Item>
        </div>
      </OnboardCard>

      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Code className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Skills</Title>
        </div>
        <Form.Item
          name="skills"
          rules={[{ required: true, type: "array", message: "Add at least one skill." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select
            mode="tags"
            tokenSeparators={[","]}
            placeholder="Add skills (press Enter to add)"
          />
        </Form.Item>
      </OnboardCard>

      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Education</Title>
        </div>
        <Form.Item
          name="education"
          rules={[{ required: true, message: "Education level is required." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select placeholder="Select education level" options={educationLevels} />
        </Form.Item>
      </OnboardCard>
    </div>
  );
}
