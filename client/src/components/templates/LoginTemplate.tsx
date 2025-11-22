"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import dynamic from "next/dynamic";
import { login } from "@/lib/auth";

// 🔹 Lazy load organisms/molecules to improve performance
const LoginCard = dynamic(() => import("../organisms/LoginCard"), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse h-[420px]" />
  ),
});

const AuthHeader = dynamic(() => import("../molecules/AuthHeader"), {
  ssr: false,
  loading: () => <div className="h-16 w-full mb-6 bg-gray-100 animate-pulse rounded-xl" />,
});

export default function LoginTemplate() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: null as string | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit = formData.email.trim().length > 0 && formData.password.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;

    try {
      setSubmitting(true);
      await login(formData.email.trim(), formData.password);

      // Handle redirect after login (middleware ?next=/dashboard)
      const next = searchParams.get("next");
      message.success("Signed in successfully");
      setTimeout(() => router.push(next || "/jobs"), 500);
    } catch (err: any) {
      message.error(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthHeader title="Sign in to your account to continue" />

        <LoginCard
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          canSubmit={!!canSubmit}
        />

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>By signing in, you agree to our</p>
          <div className="space-x-4 mt-1">
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
