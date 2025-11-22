"use client";

import { Progress } from "antd";

type ProfileStrengthCardProps = {
  completeness: number;
  tips: { text: string; ok?: boolean }[];
};

export default function ProfileStrengthCard({
  completeness,
  tips,
}: ProfileStrengthCardProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="font-semibold text-gray-900">Profile Strength</h3>
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>Completeness</span>
          <span>{completeness}%</span>
        </div>
        <Progress percent={completeness} showInfo={false} strokeColor="#0B0B1F" className="mt-2" />

        <ul className="mt-4 space-y-2 text-sm">
          {tips.map((tip, i) => (
            <li key={i} className={tip.ok ? "text-green-600" : "text-orange-600"}>
              • {tip.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
