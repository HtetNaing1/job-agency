"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button, Form, message } from "antd";
import StepBar from "@/components/molecules/StepBar";
import { JobFormData } from "@/constant/type";
import { createJob } from "@/services/jobService";

const Step1Basic = dynamic(() => import("@/components/organisms/job-post/Step1Basic"), { ssr: false });
const Step2Comp  = dynamic(() => import("@/components/organisms/job-post/Step2Comp"),  { ssr: false });
const Step3Details = dynamic(() => import("@/components/organisms/job-post/Step3Details"), { ssr: false });
const Step4Review = dynamic(() => import("@/components/organisms/job-post/Step4Review"), { ssr: false });

const TITLES = ["Basic Info","Compensation","Details","Review & Publish"];

export default function EmployerJobPostTemplate() {
  const router = useRouter();
  const [form] = Form.useForm<JobFormData>();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const total = 4;
  const Current = useMemo(() => {
    switch (step) {
      case 1: return Step1Basic;
      case 2: return Step2Comp;
      case 3: return Step3Details;
      case 4: return Step4Review;
      default: return Step1Basic;
    }
  }, [step]);

  const next = async () => {
    try {
      if (step === 1) await form.validateFields(["title","company","location","jobType","workModel"]);
      if (step === 2) await form.validateFields(["salaryMin","salaryMax","currency","experienceLevel","category"]);
      if (step === 3) await form.validateFields(["description","requirements","responsibilities"]);
      setStep((s) => Math.min(total, s + 1));
    } catch {/* keep user on step */}
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    try {
      setSubmitting(true);
      await form.validateFields();
      const values = form.getFieldsValue(true);

      // Map JobFormData to backend Job schema
      const jobData = {
        title: values.title,
        company: values.company,
        location: values.location,
        employmentType: values.jobType,
        workMode: values.workModel,
        description: values.description,
        requirements: values.requirements,
        responsibilities: values.responsibilities,
        skills: values.skills,
        experience: values.experienceLevel,
        education: "", // Optional field
        salaryMin: values.salaryMin,
        salaryMax: values.salaryMax,
        benefits: values.benefits,
        applicationDeadline: values.applicationDeadline,
        status: "active",
      };

      const response = await createJob(jobData);

      if (response.err === 0) {
        message.success("Job posted successfully!");
        form.resetFields();
        setStep(1);

        // Redirect to employer dashboard after 1 second
        setTimeout(() => {
          router.push("/employer/dashboard");
        }, 1000);
      } else {
        message.error(response.message || "Failed to post job");
      }
    } catch (error: any) {
      console.error("Error posting job:", error);
      if (error?.message === "Not authenticated") {
        message.error("Please log in to post a job");
        router.push("/login");
      } else {
        message.error("Failed to post job. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/40">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Post a New Job</h1>
          <p className="text-slate-600">Create an attractive job posting to find the perfect candidate</p>
        </div>

        <StepBar step={step} total={total} />

        <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow p-6">
          <Form
            layout="vertical"
            form={form}
            initialValues={{
              currency: "USD",
              benefits: [],
              requirements: [],
              responsibilities: [],
              skills: [],
            }}
          >
            <Current />

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              <Button onClick={prev} disabled={step === 1 || submitting} className="h-10">Previous</Button>
              {step === total ? (
                <Button type="primary" onClick={submit} loading={submitting} className="h-10 px-6 bg-blue-600">
                  Post Job
                </Button>
              ) : (
                <Button type="primary" onClick={next} className="h-10 px-6 bg-blue-600">
                  Next Step
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
