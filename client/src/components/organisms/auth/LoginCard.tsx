"use client";

import AuthForm from "@/components/molecules/AuthForm";

interface LoginCardProps {
  formData: {
    email: string;
    password: string;
    role: string | null;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  canSubmit: boolean;
}

export default function LoginCard({
  formData,
  onChange,
  onSubmit,
  submitting,
  canSubmit,
}: LoginCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
      <p className="text-center text-gray-500 mb-6">
        Enter your credentials to access your account
      </p>

      <AuthForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        submitting={submitting}
        canSubmit={canSubmit}
      />

      <p className="text-center text-sm text-gray-600 mt-6">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="font-medium text-black hover:underline hover:text-blue-600 transition-colors"
        >
          Register here
        </a>
      </p>
    </div>
  );
}
