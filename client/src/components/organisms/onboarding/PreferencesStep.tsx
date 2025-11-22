"use client";
import OnboardCard from "@/components/atoms/OnboardCard";
import { Form, Select, Typography, Radio, Checkbox } from "antd";
import { Target, DollarSign, MapPin, Clock } from "lucide-react";

const { Title } = Typography;

const jobTypes = ["Full-time","Part-time","Contract","Freelance","Internship","Temporary"].map((v)=>({value:v,label:v}));
const salaryRanges = [
  "$0 - $30,000","$30,000 - $50,000","$50,000 - $70,000","$70,000 - $100,000","$100,000 - $150,000","$150,000 - $200,000","$200,000+",
].map((v)=>({value:v,label:v}));
const locations = [
  "San Francisco, CA","New York, NY","Los Angeles, CA","Seattle, WA","Chicago, IL","Boston, MA","Austin, TX","Denver, CO","Remote (Anywhere)","Other",
].map((l)=>({value:l,label:l}));

export default function PreferencesStep() {
  return (
    <div className="space-y-6">
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Job Types</Title>
        </div>
        <Form.Item
          name="jobType"
          rules={[{ required: true, type: "array", message: "Select at least one job type." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select mode="multiple" placeholder="Select job types" options={jobTypes} />
        </Form.Item>
      </OnboardCard>

      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Salary Expectations</Title>
        </div>
        <Form.Item
          name="salaryRange"
          rules={[{ required: true, message: "Choose a salary range." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select placeholder="Select salary range" options={salaryRanges} />
        </Form.Item>
      </OnboardCard>

      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Preferred Locations</Title>
        </div>
        <Form.Item
          name="locationPreferences"
          rules={[{ required: true, type: "array", message: "Select at least one location." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Select mode="multiple" placeholder="Select preferred locations" options={locations} />
        </Form.Item>
      </OnboardCard>

      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Work Arrangement</Title>
        </div>
        <Form.Item
          name="remoteWork"
          rules={[{ required: true, message: "Choose a work arrangement." }]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <Radio.Group className="flex flex-col gap-2">
            <Radio value="remote-only">Remote only</Radio>
            <Radio value="hybrid">Hybrid</Radio>
            <Radio value="on-site">On-site</Radio>
            <Radio value="flexible">Flexible</Radio>
          </Radio.Group>
        </Form.Item>
      </OnboardCard>
    </div>
  );
}
