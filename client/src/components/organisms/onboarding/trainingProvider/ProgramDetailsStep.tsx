"use client";
import OnboardCard from "@/components/atoms/OnboardCard";
import { Form, Input, Select, InputNumber, Typography } from "antd";
import { DollarSign, Users, Clock } from "lucide-react";

const { Title, Text } = Typography;
const { TextArea } = Input;

const pricingModels = [
  { value: "per-course", label: "Per Course" },
  { value: "subscription", label: "Subscription/Membership" },
  { value: "per-student", label: "Per Student" },
  { value: "corporate", label: "Corporate Packages" },
  { value: "free", label: "Free" },
  { value: "mixed", label: "Mixed (Free + Paid)" },
];

const programDurations = [
  { value: "1-4-weeks", label: "1-4 weeks" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "6-12-months", label: "6-12 months" },
  { value: "1-year+", label: "1 year or more" },
  { value: "self-paced", label: "Self-paced (varies)" },
];

export default function ProgramDetailsStep() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-grid place-items-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-3">
          <DollarSign className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">Program Details</h2>
        <p className="text-slate-600 mt-1 text-sm">
          Share information about your programs and pricing.
        </p>
      </div>

      {/* Pricing Model */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Pricing Model
          </Title>
        </div>
        <Text className="text-sm">How do you charge for your programs?</Text>
        <Form.Item
          name="pricingModel"
          rules={[{ required: true, message: "Pricing model is required." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select placeholder="Select pricing model" options={pricingModels} />
        </Form.Item>
      </OnboardCard>

      {/* Program Duration & Capacity */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Typical Program Duration
          </Title>
        </div>
        <Text className="text-sm">How long do your programs typically last?</Text>
        <Form.Item
          name="programDuration"
          rules={[{ required: true, message: "Program duration is required." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select placeholder="Select typical duration" options={programDurations} />
        </Form.Item>
      </OnboardCard>

      {/* Student Capacity */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Student Capacity
          </Title>
        </div>
        <Text className="text-sm">
          How many students can you accommodate per program/cohort?
        </Text>
        <Form.Item
          name="studentCapacity"
          rules={[
            { required: true, message: "Student capacity is required." },
            { type: "number", min: 1, message: "Must be at least 1." },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <InputNumber
            min={1}
            placeholder="e.g., 20"
            className="w-full h-10"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </OnboardCard>

      {/* Special Programs or Partnerships */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>
            Special Programs or Partnerships
          </Title>
        </div>
        <Text className="text-sm">
          Do you have any special programs, employer partnerships, or placement assistance?
        </Text>
        <Form.Item
          name="specialPrograms"
          rules={[{ required: false }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <TextArea
            rows={4}
            placeholder="e.g., Job placement assistance, corporate partnerships, scholarship programs..."
            maxLength={500}
            showCount
          />
        </Form.Item>
      </OnboardCard>
    </div>
  );
}
