"use client";
import { Check } from "lucide-react";

export default function StepBar({ step, total }: { step: number; total: number }) {
  const pct = (step / total) * 100;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <div key={n} className={`w-8 h-8 grid place-items-center rounded-full border-2 text-sm
            ${n < step ? "bg-blue-600 text-white border-blue-600" : n === step ? "bg-blue-600 text-white border-blue-600" : "border-slate-300 text-slate-500"}`}>
            {n < step ? <Check className="w-4 h-4" /> : n}
          </div>
        ))}
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
