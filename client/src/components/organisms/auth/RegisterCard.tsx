"use client";
import RegisterForm from "@/components/molecules/RegisterForm";

export default function RegisterCard({
  formData,
  onChange,
  onSubmit,
  submitting,
  canSubmit,
  agreed,
  onAgreeChange,
}: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <p className="text-center text-gray-500 mb-6">
        Fill in your details to get started
      </p>
      <RegisterForm
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        submitting={submitting}
        canSubmit={canSubmit}
        agreed={agreed}
        onAgreeChange={onAgreeChange}
      />
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-black hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
}
