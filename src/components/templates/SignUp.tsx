"use client";

import { useState } from "react";
import { Input, Select, Checkbox } from "antd";
import {
  Briefcase,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Users,
  UserRound,
  Building2,
} from "lucide-react";
import Button from "../atoms/Button";

export default function SignUp() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState<{
    role: string | null;
    fullName: string;
    email: string;
    company: string;
    password: string;
    confirm: string;
  }>({
    role: null, // use null so Select shows placeholder
    fullName: "",
    email: "",
    company: "",
    password: "",
    confirm: "",
  });

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | null
  ) => {
    setFormData((p) => ({ ...p, [field]: value as any }));
  };

  const isEmployer = formData.role === "employer";
  const passwordOk =
    formData.password.length >= 8 && formData.password === formData.confirm;

  const canSubmit =
    !!formData.role &&
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.password &&
    formData.confirm &&
    passwordOk &&
    agreed &&
    (!isEmployer || formData.company.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    console.log("Sign up:", formData);
    // TODO: your signup action
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-md">
        {/* Logo + Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <a href="/">
              <div className="bg-blue-500 text-white p-3 rounded-2xl">
                <Briefcase className="h-8 w-8" />
              </div>
            </a>
          </div>
          <h1 className="text-2xl font-bold text-black">Sign Up</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-center text-gray-500 mb-6">
            Fill in your details to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Users className="h-4 w-4 mr-2" /> I am a
              </label>
              <Select
                placeholder="Select your role"
                className="w-full h-12"
                value={formData.role ?? undefined}
                onChange={(val) => handleInputChange("role", val)}
                options={[
                  { value: "employer", label: "Employer / Recruiter" },
                  { value: "jobseeker", label: "Job Seeker" },
                ]}
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <UserRound className="h-4 w-4 mr-2" /> Full Name
              </label>
              <Input
                placeholder="Enter your full name"
                className="h-12"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Mail className="h-4 w-4 mr-2" /> Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            {/* Company */}
            {isEmployer && (
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Building2 className="h-4 w-4 mr-2" /> Company Name
                </label>
                <Input
                  placeholder="Enter your company name"
                  className="h-12"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Lock className="h-4 w-4 mr-2" /> Password
              </label>
              <div className="relative">
                <Input
                  type={showPwd ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="h-12 pr-12"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPwd ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Lock className="h-4 w-4 mr-2" /> Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showPwd2 ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="h-12 pr-12"
                  value={formData.confirm}
                  onChange={(e) => handleInputChange("confirm", e.target.value)}
                  status={
                    formData.confirm
                      ? formData.confirm === formData.password
                        ? ""
                        : "error"
                      : ""
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPwd2((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPwd2 ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="pt-1">
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              >
                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="font-medium hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </Checkbox>
            </div>

            {/* Submit */}
            <Button
              type="primary"
              className="w-full h-12 text-base font-medium disabled:opacity-60"
              disabled={!canSubmit}
              label="Create Account"
            />
          </form>

          {/* Switch to Sign In */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-medium text-black hover:underline"
            >
              Sign in here
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>By creating an account, you agree to our</p>
          <div className="space-x-4 mt-1">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <span>·</span>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
