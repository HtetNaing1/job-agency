"use client";
import OnboardCard from "@/components/atoms/OnboardCard";
import { Form, Input, Upload, Typography } from "antd";
import { Star, Camera, FileText, Link2, UploadCloud } from "lucide-react";

const { TextArea } = Input;
const { Title, Text } = Typography;

function normFile(e: any) {
  // AntD fires either an array or an event object with { fileList }
  if (Array.isArray(e)) return e;
  return e?.fileList ?? [];
}

export default function FinalStep() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-grid place-items-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-3">
          <Star className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">Almost There!</h2>
        <p className="text-slate-600 mt-1 text-sm">
          Add finishing touches to make your profile stand out.
        </p>
      </div>

      {/* Profile Picture */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Camera className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Profile Picture (Optional)</Title>
        </div>
        <Form.Item
          name="profilePicture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload.Dragger
            beforeUpload={() => false}   // keep client-side only
            maxCount={1}
            multiple={false}
            accept=".png,.jpg,.jpeg"
            className="!p-0"
          >
            <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center">
              <UploadCloud className="w-5 h-5 text-gray-500 mx-auto" />
              <div className="mt-2">Click or drag to upload</div>
              <Text type="secondary" className="text-xs block">
                PNG/JPG up to 5MB
              </Text>
            </div>
          </Upload.Dragger>
        </Form.Item>
      </OnboardCard>

      {/* Bio */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Professional Bio</Title>
        </div>
        <Form.Item name="bio">
          <TextArea
            placeholder="Brief description of your background, skills, and goals."
            rows={5}
          />
        </Form.Item>
        <Text type="secondary" className="text-xs">Aim for 100–200 characters.</Text>
      </OnboardCard>

      {/* Links */}
      <OnboardCard>
        <div className="flex items-center gap-2 mb-2">
          <Link2 className="w-4 h-4 text-blue-600" />
          <Title level={5} style={{ margin: 0 }}>Professional Links</Title>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <Form.Item
            name="linkedinUrl"
            rules={[{ type: "url", message: "Enter a valid URL." }]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input placeholder="https://linkedin.com/in/yourprofile" className="h-10" />
          </Form.Item>
          <Form.Item
            name="portfolioUrl"
            rules={[{ type: "url", message: "Enter a valid URL." }]}
            validateTrigger={["onChange", "onBlur"]}
          >
            <Input placeholder="https://yourportfolio.com" className="h-10" />
          </Form.Item>
        </div>
      </OnboardCard>
    </div>
  );
}
