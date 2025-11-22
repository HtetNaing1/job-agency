"use client";

import { Form } from "antd";
import TextInput from "../atoms/TextInput";
import PasswordInput from "../atoms/PasswordInput";
import RoleSelect from "../atoms/RoleSelect";
import CheckboxWrapper from "../atoms/CheckboxWrapper";
import AuthButton from "../atoms/AuthButton";
import { Mail, Lock, UserRound, Building2 } from "lucide-react";

interface RegisterFormProps {
  formData: any;
  onChange: (field: string, value: string) => void;
  onSubmit: (values: any) => void;
  submitting: boolean;
  canSubmit: boolean;
  agreed: boolean;
  onAgreeChange: (checked: boolean) => void;
}

export default function RegisterForm({
  formData,
  onChange,
  onSubmit,
  submitting,
  canSubmit,
  agreed,
  onAgreeChange,
}: RegisterFormProps) {
  const [form] = Form.useForm();
  const isEmployer = formData.role === "employer";
  const isTrainingProvider = formData.role === "trainingProvider";

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      className="space-y-4"
      initialValues={formData}
    >
      {/* Role */}
      <Form.Item
        name="role"
        rules={[{ required: true, message: "Please select your role" }]}
      >
        <RoleSelect value={formData.role} onChange={(v) => onChange("role", v)} />
      </Form.Item>

      {/* Full Name */}
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: "Full name is required" }]}
      >
        <TextInput
          icon={<UserRound className="h-4 w-4" />}
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(v) => onChange("fullName", v)}
        />
      </Form.Item>

      {/* Email */}
      <Form.Item
        name="email"
        label="Email Address"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <TextInput
          icon={<Mail className="h-4 w-4" />}
          placeholder="Enter your email"
          value={formData.email}
          onChange={(v) => onChange("email", v)}
        />
      </Form.Item>

      {/* Conditional Inputs */}
      {isEmployer && (
        <Form.Item
          name="company"
          label="Company Name"
          rules={[{ required: true, message: "Company name is required" }]}
        >
          <TextInput
            icon={<Building2 className="h-4 w-4" />}
            placeholder="Enter your company name"
            value={formData.company}
            onChange={(v) => onChange("company", v)}
          />
        </Form.Item>
      )}

      {isTrainingProvider && (
        <Form.Item
          name="trainingProvider"
          label="Training Provider Name"
          rules={[{ required: true, message: "Training provider name is required" }]}
        >
          <TextInput
            icon={<Building2 className="h-4 w-4" />}
            placeholder="Enter your training provider name"
            value={formData.trainingProvider}
            onChange={(v) => onChange("trainingProvider", v)}
          />
        </Form.Item>
      )}

      {/* Password */}
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Password is required" },
          { min: 8, message: "Password must be at least 8 characters long" },
        ]}
      >
        <PasswordInput
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(v) => onChange("password", v)}
        />
      </Form.Item>

      {/* Confirm Password */}
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <PasswordInput
          placeholder="Confirm your password"
          value={formData.confirm}
          onChange={(v) => onChange("confirm", v)}
        />
      </Form.Item>

      {/* Terms Agreement */}
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error("You must agree to the terms")),
          },
        ]}
      >
        <CheckboxWrapper
          checked={agreed}
          onChange={onAgreeChange}
          label={
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="font-medium hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="font-medium hover:underline">Privacy Policy</a>
            </span>
          }
        />
      </Form.Item>

      {/* Submit */}
      <Form.Item>
        <AuthButton
          label="Create Account"
          loading={submitting}
          disabled={!canSubmit}
        />
      </Form.Item>
    </Form>
  );
}
