"use client";
import OnboardCard from "@/components/atoms/OnboardCard";
import { Form, Input, Select, DatePicker, Typography } from "antd";
import { User, Calendar, Users } from "lucide-react";

const { Title, Text } = Typography;

export default function BasicInfoStep() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-grid place-items-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-3">
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">Let's Get to Know You</h2>
        <p className="text-slate-600 mt-1 text-sm">
          We’ll start with a few basics to personalize your experience.
        </p>
      </div>

      {/* Full Name */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Full Name</Title>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "First name is required." }]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input placeholder="First name" className="h-10" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Last name is required." }]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input placeholder="Last name" className="h-10" />
          </Form.Item>
        </div>
      </OnboardCard>

      {/* Gender */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Gender</Title>
        </div>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Please choose a gender." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select
            placeholder="Choose your gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "non-binary", label: "Non-binary" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ]}
          />
        </Form.Item>
      </OnboardCard>

      {/* Date of Birth */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Date of Birth</Title>
        </div>
        <Text className="text-sm">When were you born?</Text>
        <Form.Item
          name="dateOfBirth"
          rules={[{ required: true, message: "Date of birth is required." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <DatePicker className="w-full h-10" placeholder="YYYY-MM-DD" format="YYYY-MM-DD" />
        </Form.Item>
        <Text type="secondary" className="text-xs">
          Helps provide age-appropriate recommendations and compliance.
        </Text>
      </OnboardCard>
    </div>
  );
}
