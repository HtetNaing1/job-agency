"use client";
import { Form, InputNumber, Select, Card } from "antd";
import { DollarSign } from "lucide-react";
import OnboardCard from "@/components/atoms/OnboardCard";
import { CATEGORIES, CURRENCIES, EXPERIENCE } from "@/constant/type";

export default function Step2Comp() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white grid place-items-center mx-auto mb-3">
          <DollarSign className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold">Compensation & Requirements</h2>
        <p className="text-slate-600 text-sm">Define salary range and seniority.</p>
      </div>

      <OnboardCard>
        <div className="grid md:grid-cols-3 gap-4">
          <Form.Item name="salaryMin" label="Minimum Salary" rules={[{ required: true, message: "Enter minimum salary" }]}>
            <InputNumber className="w-full h-10" min={0} controls={false} placeholder="50000" />
          </Form.Item>
          <Form.Item
            name="salaryMax"
            label="Maximum Salary"
            dependencies={["salaryMin"]}
            rules={[
              { required: true, message: "Enter maximum salary" },
              ({ getFieldValue }) => ({
                validator(_, v) {
                  const min = getFieldValue("salaryMin");
                  if (!v || !min || Number(v) >= Number(min)) return Promise.resolve();
                  return Promise.reject(new Error("Max must be ≥ Min"));
                },
              }),
            ]}
          >
            <InputNumber className="w-full h-10" min={0} controls={false} placeholder="80000" />
          </Form.Item>
          <Form.Item name="currency" label="Currency" initialValue={"USD"}>
            <Select options={CURRENCIES.map((c) => ({ value: c, label: c }))} className="[&_.ant-select-selector]:h-10" />
          </Form.Item>

          <Form.Item name="experienceLevel" label="Experience Level" className="md:col-span-2" rules={[{ required: true }]}>
            <Select options={EXPERIENCE.map((e) => ({ value: e, label: e }))} placeholder="Select level" className="[&_.ant-select-selector]:h-10" />
          </Form.Item>
          <Form.Item name="category" label="Job Category" rules={[{ required: true }]}>
            <Select showSearch options={CATEGORIES.map((c) => ({ value: c, label: c }))} placeholder="Select category" className="[&_.ant-select-selector]:h-10" />
          </Form.Item>
        </div>
      </OnboardCard>

      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) => {
          const min = getFieldValue("salaryMin");
          const max = getFieldValue("salaryMax");
          const cur = getFieldValue("currency") || "USD";
          if (!min || !max) return null;
          return (
            <Card className="border-slate-200">
              <div className="text-sm text-slate-600">Salary Range Preview</div>
              <div className="font-medium">{cur} {Number(min).toLocaleString()} – {Number(max).toLocaleString()} / year</div>
            </Card>
          );
        }}
      </Form.Item>
    </div>
  );
}
