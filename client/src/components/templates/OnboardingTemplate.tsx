"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Form, message, Spin } from "antd";
import OnboardingHeader from "@/components/molecules/OnboardingHeader";
import OnboardingProgress from "@/components/molecules/OnboardingProgress";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { OnboardingData } from "@/constant/type";
import { getMyProfile, completeOnboarding } from "@/services/profileService";
import { useRouter } from "next/navigation";

// Job Seeker Steps
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

// Employer Steps
const CompanyInfoStep = dynamic(
  () => import("@/components/organisms/onboarding/employer/CompanyInfoStep"),
  { ssr: false }
);
const HiringNeedsStep = dynamic(
  () => import("@/components/organisms/onboarding/employer/HiringNeedsStep"),
  { ssr: false }
);

// Training Provider Steps
const TrainingInfoStep = dynamic(
  () => import("@/components/organisms/onboarding/trainingProvider/TrainingInfoStep"),
  { ssr: false }
);
const ProgramDetailsStep = dynamic(
  () => import("@/components/organisms/onboarding/trainingProvider/ProgramDetailsStep"),
  { ssr: false }
);

const JOB_SEEKER_TITLES = [
  "Basic Information",
  "Contact Details",
  "Professional Background",
  "Job Preferences",
  "Complete Profile",
] as const;

const EMPLOYER_TITLES = [
  "Basic Information",
  "Contact Details",
  "Company Information",
  "Hiring Needs",
  "Complete Profile",
] as const;

const TRAINING_PROVIDER_TITLES = [
  "Basic Information",
  "Contact Details",
  "Training Programs",
  "Program Details",
  "Complete Profile",
] as const;

const WARN_KEY = "onboarding-step-warning";

export default function OnboardingTemplate() {
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  const [userRole, setUserRole] = useState<"jobseeker" | "employer" | "trainingProvider" | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  // Fetch user profile to determine role
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getMyProfile();
        if (response.err === 0 && response.data) {
          setUserRole(response.data.role);
        } else {
          messageApi.error("Failed to load user profile");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        messageApi.error("Failed to load user profile");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [messageApi, router]);

  // Get titles based on role
  const TITLES = useMemo(() => {
    if (!userRole) return JOB_SEEKER_TITLES;
    switch (userRole) {
      case "employer":
        return EMPLOYER_TITLES;
      case "trainingProvider":
        return TRAINING_PROVIDER_TITLES;
      default:
        return JOB_SEEKER_TITLES;
    }
  }, [userRole]);

  const total = TITLES.length;

  // Get current step component based on role and step number
  const Current = useMemo(() => {
    if (!userRole) return BasicInfoStep;

    // Steps 1, 2, and 5 are shared across all roles
    if (step === 1) return BasicInfoStep;
    if (step === 2) return ContactInfoStep;
    if (step === 5) return FinalStep;

    // Role-specific steps (3 and 4)
    if (userRole === "jobseeker") {
      if (step === 3) return ProfessionalInfoStep;
      if (step === 4) return PreferencesStep;
    } else if (userRole === "employer") {
      if (step === 3) return CompanyInfoStep;
      if (step === 4) return HiringNeedsStep;
    } else if (userRole === "trainingProvider") {
      if (step === 3) return TrainingInfoStep;
      if (step === 4) return ProgramDetailsStep;
    }

    return BasicInfoStep;
  }, [step, userRole]);

  // Get initial values based on user role
  const getInitialValues = () => {
    const baseValues = {
      firstName: "",
      lastName: "",
      gender: undefined,
      dateOfBirth: undefined,
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      profilePicture: [] as any[],
      bio: "",
      linkedinUrl: "",
    };

    if (userRole === "employer") {
      return {
        ...baseValues,
        companySize: undefined,
        industry: undefined,
        website: "",
        companyDescription: "",
        positionsSeeking: [] as string[],
        departmentFocus: [] as string[],
        hiringTimeline: undefined,
      };
    } else if (userRole === "trainingProvider") {
      return {
        ...baseValues,
        courses: [] as string[],
        certificationTypes: [] as string[],
        trainingFormats: [] as string[],
        pricingModel: undefined,
        programDuration: undefined,
        studentCapacity: undefined,
        specialPrograms: "",
      };
    } else {
      // jobseeker
      return {
        ...baseValues,
        experienceLevel: undefined,
        industry: undefined,
        currentRole: "",
        skills: [] as string[],
        education: undefined,
        jobType: [] as string[],
        salaryRange: undefined,
        locationPreferences: [] as string[],
        remoteWork: undefined,
        portfolioUrl: "",
      };
    }
  };

  // Get fields by step based on role
  const getFieldsByStep = (): Record<number, string[]> => {
    const baseFields = {
      1: ["firstName", "lastName", "gender", "dateOfBirth"],
      2: ["phone", "address", "city", "state", "zipCode"],
    };

    if (userRole === "employer") {
      return {
        ...baseFields,
        3: ["companySize", "industry", "website", "companyDescription"],
        4: ["positionsSeeking", "departmentFocus", "hiringTimeline"],
      };
    } else if (userRole === "trainingProvider") {
      return {
        ...baseFields,
        3: ["courses", "certificationTypes", "trainingFormats"],
        4: ["pricingModel", "programDuration", "studentCapacity"],
      };
    } else {
      // jobseeker
      return {
        ...baseFields,
        3: ["experienceLevel", "industry", "currentRole", "skills", "education"],
        4: ["jobType", "salaryRange", "locationPreferences", "remoteWork"],
      };
    }
  };

  // Get warning text by step based on role
  const getWarningTextByStep = (): Record<number, string> => {
    const baseWarnings = {
      1: "Please complete your name, gender, and date of birth to continue.",
      2: "Please complete your phone and address details to continue.",
    };

    if (userRole === "employer") {
      return {
        ...baseWarnings,
        3: "Please complete your company information to continue.",
        4: "Please complete your hiring needs to continue.",
      };
    } else if (userRole === "trainingProvider") {
      return {
        ...baseWarnings,
        3: "Please complete your training program information to continue.",
        4: "Please complete your program details to continue.",
      };
    } else {
      // jobseeker
      return {
        ...baseWarnings,
        3: "Please complete experience, industry, role, skills and education to continue.",
        4: "Please choose job types, salary range, locations and work arrangement to continue.",
      };
    }
  };

  const initialValues = useMemo(() => getInitialValues(), [userRole]);
  const fieldsByStep = useMemo(() => getFieldsByStep(), [userRole]);
  const warningTextByStep = useMemo(() => getWarningTextByStep(), [userRole]);

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
    const onboardingData = {
      ...raw,
      dateOfBirth: raw.dateOfBirth
        ? dayjs(raw.dateOfBirth).format("YYYY-MM-DD")
        : "",
      role: userRole,
    };

    try {
      const response = await completeOnboarding(onboardingData);

      if (response.err === 0) {
        message.success("Profile setup complete!");
        messageApi.destroy(WARN_KEY);

        // Redirect based on role
        setTimeout(() => {
          if (userRole === "employer") {
            router.push("/employer-dashboard");
          } else if (userRole === "trainingProvider") {
            router.push("/jobs"); // TODO: Create training provider dashboard
          } else {
            router.push("/jobs");
          }
        }, 1500);
      } else {
        message.error(response.message || "Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      message.error("Failed to complete onboarding. Please try again.");
    }
  };

  // Show loading spinner while fetching user role
  if (loading || !userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/40 text-slate-900 flex items-center justify-center">
        <Spin size="large" tip="Loading your profile..." />
      </div>
    );
  }

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
