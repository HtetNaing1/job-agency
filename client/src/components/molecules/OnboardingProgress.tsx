"use client";
import { Progress } from "antd";
import { Check } from "lucide-react";

export default function OnboardingProgress({
  step,
  total,
  titles,
}: { step: number; total: number; titles: string[] }) {
  const pct = Math.round((step / total) * 100);

  return (
    <div className="relative z-10 bg-white/80 backdrop-blur border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-600">Profile Completion</span>
          <span className="text-xs font-medium text-blue-600">{pct}%</span>
        </div>
        <Progress percent={pct} showInfo={false} strokeColor="#2563eb" trailColor="#e5e7eb" />
        <div className="flex items-center justify-between mt-3">
          {titles.map((_, i) => {
            const n = i + 1;
            const state = step > n ? "done" : step === n ? "active" : "idle";
            return (
              <div key={n} className="flex items-center">
                <div
                  className={[
                    "w-7 h-7 rounded-full text-xs grid place-items-center border",
                    state === "done" && "bg-green-500 border-green-500 text-white",
                    state === "active" && "bg-blue-600 border-blue-600 text-white",
                    state === "idle" && "bg-slate-200 border-slate-300 text-slate-600",
                  ].join(" ")}
                >
                  {state === "done" ? <Check className="w-3.5 h-3.5" /> : n}
                </div>
                {i < titles.length - 1 && (
                  <div className={`mx-2 h-0.5 w-12 md:w-16 ${step > n ? "bg-green-500" : "bg-slate-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
