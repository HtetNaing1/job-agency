"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { register } from "@/lib/auth";

// ⚡ Lazy-load heavy UI components
const AuthHeader = dynamic(() => import("../molecules/AuthHeader"), {
  loading: () => <div className="h-8 bg-gray-200 rounded-md w-1/3 mx-auto mb-4 animate-pulse" />,
});
const RegisterCard = dynamic(() => import("../organisms/RegisterCard"), {
  loading: () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse min-h-[500px]" />
  ),
});

export default function RegisterTemplate() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    role: null as string | null,
    fullName: "",
    email: "",
    company: "",
    trainingProvider: "",
    password: "",
    confirm: "",
  });

  const handleInputChange = (field: string, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }));
  };

  const isEmployer = formData.role === "employer";
  const isTrainingProvider = formData.role === "trainingProvider";

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
    (!isEmployer || formData.company.trim()) &&
    (!isTrainingProvider || formData.trainingProvider.trim());

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;

    try {
      setSubmitting(true);
      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role as "jobseeker" | "employer" | "trainingProvider",
        companyName: isEmployer ? formData.company.trim() : null,
        trainingProvider: isTrainingProvider
          ? formData.trainingProvider.trim()
          : null,
      };

      await register(payload);
      message.success("Account created successfully!");
      setTimeout(() => router.push("/login"), 500);
    } catch (err: any) {
      message.error(err?.message || "Failed to create account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-md">
        <AuthHeader title="Sign Up" />
        <RegisterCard
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          canSubmit={!!canSubmit}
          agreed={agreed}
          onAgreeChange={setAgreed}
        />
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
