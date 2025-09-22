"use client";

import { useState } from "react";
import { Input, Select } from "antd";
import { Briefcase, Eye, EyeOff, Mail, Lock, Users } from "lucide-react";
import Button from "../atoms/Button";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: null as string | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in attempt:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
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
          <h1 className="text-2xl font-bold text-black">
            Sign in to your account to continue
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-center text-gray-500 mb-6">
            Enter your credentials to access your account
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
                value={formData.role}
                onChange={(val) => handleInputChange("role", val)}
              >
                <Select.Option value="jobseeker">Job Seeker</Select.Option>
                <Select.Option value="employer">Employer</Select.Option>
              </Select>
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Mail className="h-4 w-4 mr-2" /> Email Address
              </label>
              <Input
                placeholder="Enter your email"
                className="h-12"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Lock className="h-4 w-4 mr-2" /> Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 pr-12"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            {/* Sign in button */}
            <Button type="primary" className="w-full" label="Sign In" />
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="font-medium text-black hover:underline"
            >
              Sign up here
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>By signing in, you agree to our</p>
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
