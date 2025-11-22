"use client";
import OnboardCard from "@/components/atoms/OnboardCard";
import { Form, Input, Typography } from "antd";
import { Phone, MapPin, Home } from "lucide-react";

const { Title, Text } = Typography;

export default function ContactInfoStep() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-grid place-items-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-3">
          <Phone className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">How Can Employers Reach You?</h2>
        <p className="text-slate-600 mt-1 text-sm">Your contact info helps employers connect with you.</p>
      </div>

      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Phone className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Phone Number</Title>
        </div>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Phone is required." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Input placeholder="+1 (555) 123-4567" className="h-10" />
        </Form.Item>
        <Text type="secondary" className="text-xs mt-2 block">Used only for job-related communication.</Text>
      </OnboardCard>

      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Current Address</Title>
        </div>

        <Form.Item
          name="address"
          rules={[{ required: true, message: "Street address is required." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Input placeholder="Street address" className="h-10" />
        </Form.Item>

        <div className="grid md:grid-cols-3 gap-3">
          <Form.Item
            name="city"
            rules={[{ required: true, message: "City is required." }]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input placeholder="City" className="h-10" />
          </Form.Item>
          <Form.Item
            name="state"
            rules={[{ required: true, message: "State is required." }]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input placeholder="State" className="h-10" />
          </Form.Item>
          <Form.Item
            name="zipCode"
            rules={[{ required: true, message: "ZIP Code is required." }]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input placeholder="ZIP Code" className="h-10" />
          </Form.Item>
        </div>
      </OnboardCard>

      <OnboardCard className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-start gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 grid place-items-center">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <Title level={5} style={{ margin: 0 }}>Privacy & Security</Title>
            <Text type="secondary" className="text-xs block mt-1">
              Your details are kept secure and shared only when you apply.
            </Text>
          </div>
        </div>
      </OnboardCard>
    </div>
  );
}
