"use client";
import OnboardCard from "@/components/atoms/OnboardCard";
import { Form, Input, Select, Typography } from "antd";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const { Title, Text } = Typography;

const certificationTypes = [
  "Professional Certifications",
  "Technical Certifications",
  "Industry Certifications",
  "Academic Degrees",
  "Vocational Training",
  "Skill-based Training",
  "Compliance Training",
  "Leadership Development",
].map((c) => ({ value: c.toLowerCase().replace(/\s+/g, "-"), label: c }));

const trainingFormats = [
  { value: "in-person", label: "In-Person" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "Hybrid (In-Person + Online)" },
  { value: "self-paced", label: "Self-Paced Online" },
  { value: "virtual-classroom", label: "Virtual Classroom" },
];

export default function TrainingInfoStep() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-grid place-items-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-3">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">About Your Training Programs</h2>
        <p className="text-slate-600 mt-1 text-sm">
          Tell us about the courses and certifications you offer.
        </p>
      </div>

      {/* Courses Offered */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Courses Offered
          </Title>
        </div>
        <Text className="text-sm">
          What courses or training programs do you provide? (Add multiple)
        </Text>
        <Form.Item
          name="courses"
          rules={[
            {
              required: true,
              type: "array",
              message: "Add at least one course.",
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select
            mode="tags"
            tokenSeparators={[","]}
            placeholder="e.g., Web Development Bootcamp, Data Science, AWS Certification (press Enter to add)"
          />
        </Form.Item>
      </OnboardCard>

      {/* Certification Types */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Types of Certifications
          </Title>
        </div>
        <Text className="text-sm">
          What types of certifications or credentials do you provide?
        </Text>
        <Form.Item
          name="certificationTypes"
          rules={[
            {
              required: true,
              type: "array",
              message: "Select at least one certification type.",
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select
            mode="multiple"
            placeholder="Select certification types"
            options={certificationTypes}
            maxTagCount="responsive"
          />
        </Form.Item>
      </OnboardCard>

      {/* Training Formats */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Training Formats
          </Title>
        </div>
        <Text className="text-sm">How do you deliver your training programs?</Text>
        <Form.Item
          name="trainingFormats"
          rules={[
            {
              required: true,
              type: "array",
              message: "Select at least one training format.",
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select
            mode="multiple"
            placeholder="Select training formats"
            options={trainingFormats}
            maxTagCount="responsive"
          />
        </Form.Item>
      </OnboardCard>
    </div>
  );
}
