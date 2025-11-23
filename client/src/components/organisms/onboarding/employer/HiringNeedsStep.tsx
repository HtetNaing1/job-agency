"use client";
import OnboardCard from "@/components/atoms/OnboardCard";
import { Form, Input, Select, Typography } from "antd";
import { Briefcase, Target, Clock } from "lucide-react";

const { Title, Text } = Typography;

const departments = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Customer Success",
  "Operations",
  "Human Resources",
  "Finance",
  "Legal",
  "Data & Analytics",
  "IT & Security",
].map((d) => ({ value: d.toLowerCase().replace(/\s+/g, "-"), label: d }));

const hiringTimelines = [
  { value: "immediate", label: "Immediate (within 1 month)" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "planning", label: "Just planning ahead" },
];

export default function HiringNeedsStep() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-grid place-items-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-3">
          <Target className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">What Are You Looking For?</h2>
        <p className="text-slate-600 mt-1 text-sm">
          Help us understand your hiring needs and priorities.
        </p>
      </div>

      {/* Positions Seeking */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Positions You're Hiring For
          </Title>
        </div>
        <Text className="text-sm">
          What roles are you currently looking to fill? (Add multiple)
        </Text>
        <Form.Item
          name="positionsSeeking"
          rules={[
            {
              required: true,
              type: "array",
              message: "Add at least one position.",
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select
            mode="tags"
            tokenSeparators={[","]}
            placeholder="e.g., Software Engineer, Product Manager (press Enter to add)"
          />
        </Form.Item>
      </OnboardCard>

      {/* Department Focus */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Primary Hiring Departments
          </Title>
        </div>
        <Text className="text-sm">Which departments are you focusing on?</Text>
        <Form.Item
          name="departmentFocus"
          rules={[
            {
              required: true,
              type: "array",
              message: "Select at least one department.",
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select
            mode="multiple"
            placeholder="Select departments"
            options={departments}
            maxTagCount="responsive"
          />
        </Form.Item>
      </OnboardCard>

      {/* Hiring Timeline */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Hiring Timeline
          </Title>
        </div>
        <Text className="text-sm">When are you looking to fill these positions?</Text>
        <Form.Item
          name="hiringTimeline"
          rules={[{ required: true, message: "Hiring timeline is required." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select placeholder="Select timeline" options={hiringTimelines} />
        </Form.Item>
      </OnboardCard>
    </div>
  );
}
