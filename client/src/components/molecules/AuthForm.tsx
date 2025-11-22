"use client";
import { Form } from "antd";
import TextInput from "../atoms/TextInput";
import PasswordInput from "../atoms/PasswordInput";
import RoleSelect from "../atoms/RoleSelect";
import AuthButton from "../atoms/AuthButton";
import { Mail } from "lucide-react";

export default function AuthForm({
  formData,
  onChange,
  onSubmit,
  submitting,
  canSubmit,
}: {
  formData: { email: string; password: string; role: string | null };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void; // 👈 changed from (e: React.FormEvent) → simpler callback
  submitting: boolean;
  canSubmit: boolean;
}) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      className="space-y-4"
      initialValues={formData}
      onFinish={onSubmit} // ✅ now works fine (no event needed)
    >
      {/* Role */}
      <Form.Item
        name="role"
        rules={[{ required: true, message: "Please select your role" }]}
      >
        <RoleSelect value={formData.role} onChange={(v) => onChange("role", v)} />
      </Form.Item>

      {/* Email */}
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <TextInput
          label="Email Address"
          icon={<Mail className="h-4 w-4" />}
          placeholder="Enter your email"
          value={formData.email}
          onChange={(v) => onChange("email", v)}
        />
      </Form.Item>

      {/* Password */}
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(v) => onChange("password", v)}
        />
      </Form.Item>

      {/* Forgot password */}
      <div className="flex justify-end">
        <a
          href="/forgot-password"
          className="text-sm text-gray-600 hover:underline"
        >
          Forgot your password?
        </a>
      </div>

      {/* Submit button */}
      <Form.Item>
        <AuthButton
          label="Sign In"
          loading={submitting}
          disabled={!canSubmit}
        />
      </Form.Item>
    </Form>
  );
}
