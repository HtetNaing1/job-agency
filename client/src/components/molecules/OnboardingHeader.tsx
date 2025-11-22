"use client";
import { Briefcase } from "lucide-react";

export default function OnboardingHeader({
  step,
  total,
  title,
}: { step: number; total: number; title: string }) {
  return (
    <div className="relative z-10 bg-white/80 backdrop-blur border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center">
              <Briefcase className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <p className="font-semibold leading-tight text-slate-900">JobConnect</p>
              <p className="text-xs text-slate-500">Profile Setup</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Step {step} of {total}</div>
            <div className="text-sm font-medium text-slate-700">{title}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
