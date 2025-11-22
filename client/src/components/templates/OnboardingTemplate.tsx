"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Form, message } from "antd";
import OnboardingHeader from "@/components/molecules/OnboardingHeader";
import OnboardingProgress from "@/components/molecules/OnboardingProgress";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { OnboardingData } from "@/constant/type";

const BasicInfoStep = dynamic(
  () => import("@/components/organisms/onboarding/BasicInfoStep"),
  { ssr: false }
);
const ContactInfoStep = dynamic(
  () => import("@/components/organisms/onboarding/ContactInfoStep"),
  { ssr: false }
);
const ProfessionalInfoStep = dynamic(
  () => import("@/components/organisms/onboarding/ProfessionalInfoStep"),
  { ssr: false }
);
const PreferencesStep = dynamic(
  () => import("@/components/organisms/onboarding/PreferencesStep"),
  { ssr: false }
);
const FinalStep = dynamic(
  () => import("@/components/organisms/onboarding/FinalStep"),
  { ssr: false }
);

const TITLES = [
  "Basic Information",
  "Contact Details",
  "Professional Background",
  "Job Preferences",
  "Complete Profile",
] as const;

const WARN_KEY = "onboarding-step-warning";

export default function OnboardingTemplate() {
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();
  const total = TITLES.length;

  const Current = useMemo(() => {
    switch (step) {
      case 1:
        return BasicInfoStep;
      case 2:
        return ContactInfoStep;
      case 3:
        return ProfessionalInfoStep;
      case 4:
        return PreferencesStep;
      case 5:
        return FinalStep;
      default:
        return BasicInfoStep;
    }
  }, [step]);

  // IMPORTANT: do NOT force this to OnboardingData; let DatePicker hold Dayjs
  const initialValues = {
    firstName: "",
    lastName: "",
    gender: undefined, // was ""
    dateOfBirth: undefined, // already fixed earlier

    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",

    experienceLevel: undefined, // was ""
    industry: undefined, // was ""
    currentRole: "",
    skills: [] as string[],
    education: undefined, // was ""

    jobType: [] as string[], // OK for multiple
    salaryRange: undefined, // was ""
    locationPreferences: [] as string[], // OK for multiple
    remoteWork: undefined, // was ""

    profilePicture: [] as any[],
    bio: "",
    linkedinUrl: "",
    portfolioUrl: "",
  };

  const fieldsByStep: Record<number, string[]> = {
    1: ["firstName", "lastName", "gender", "dateOfBirth"],
    2: ["phone", "address", "city", "state", "zipCode"],
    3: ["experienceLevel", "industry", "currentRole", "skills", "education"],
    4: ["jobType", "salaryRange", "locationPreferences", "remoteWork"],
  };

  const warningTextByStep: Record<number, string> = {
    1: "Please complete your name, gender, and date of birth to continue.",
    2: "Please complete your phone and address details to continue.",
    3: "Please complete experience, industry, role, skills and education to continue.",
    4: "Please choose job types, salary range, locations and work arrangement to continue.",
  };

  const showStepWarning = (s: number) => {
    const msg =
      warningTextByStep[s] ??
      "Please complete the required fields to continue.";
    messageApi.open({
      key: WARN_KEY,
      type: "warning",
      content: msg,
      duration: 0,
    });
  };

  const clearWarningIfValid = (s: number) => {
    const names = fieldsByStep[s];
    if (!names) return;
    const errs = form.getFieldsError(names);
    const hasError = errs.some((e) => e.errors.length > 0);
    if (!hasError) messageApi.destroy(WARN_KEY);
  };

  const next = async () => {
    const names = fieldsByStep[step];
    if (names) {
      try {
        await form.validateFields(names);
      } catch {
        showStepWarning(step);
        return;
      }
    }
    messageApi.destroy(WARN_KEY);
    setStep((s) => Math.min(total, s + 1));
  };

  const prev = () => {
    messageApi.destroy(WARN_KEY);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleComplete = async () => {
    // make sure step 4 valid
    if (fieldsByStep[4]) {
      try {
        await form.validateFields(fieldsByStep[4]);
      } catch {
        setStep(4);
        showStepWarning(4);
        return;
      }
    }

    const raw = form.getFieldsValue(true);
    // Convert Dayjs -> string yyyy-mm-dd for API payload
    const values: OnboardingData = {
      ...raw,
      dateOfBirth: raw.dateOfBirth
        ? dayjs(raw.dateOfBirth).format("YYYY-MM-DD")
        : "",
    };

    console.log("Onboarding complete", values);
    message.success("Profile setup complete!");
    messageApi.destroy(WARN_KEY);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/40 text-slate-900">
      {contextHolder}
      <OnboardingHeader step={step} total={total} title={TITLES[step - 1]} />
      <OnboardingProgress step={step} total={total} titles={[...TITLES]} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur border border-slate-200/60 rounded-2xl shadow p-6 md:p-8">
          <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onValuesChange={() => clearWarningIfValid(step)}
          >
            <Current />
          </Form>

          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={step === 1}
              className="px-4 py-2.5 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>

            {step === total ? (
              <button
                onClick={handleComplete}
                className="px-6 py-2.5 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
              >
                Complete Setup
              </button>
            ) : (
              <button
                onClick={next}
                className="px-6 py-2.5 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
