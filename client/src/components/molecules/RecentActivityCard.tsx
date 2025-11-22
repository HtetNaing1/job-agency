"use client";

import { Divider } from "antd";

type Activity = { title: string; when: string };

export default function RecentActivityCard({ activity }: { activity: Activity[] }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="font-semibold text-gray-900">Recent Activity</h3>
      <ul className="mt-4">
        {activity.map((a, i) => (
          <li key={i} className="py-3">
            <div className="font-medium text-gray-900">{a.title}</div>
            <div className="text-sm text-gray-500">{a.when}</div>
            {i !== activity.length - 1 && <Divider className="my-3" />}
          </li>
        ))}
      </ul>
    </section>
  );
}
