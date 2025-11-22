"use client";
import { ReactNode } from "react";

export default function OnboardCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <section className={`bg-white/90 backdrop-blur border border-slate-200/60 rounded-xl p-5 ${className}`}>
      {children}
    </section>
  );
}
