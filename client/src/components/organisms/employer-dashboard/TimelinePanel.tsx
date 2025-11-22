"use client";
import { Card, Space, Tag } from "antd";
import { Clock } from "lucide-react";
import { Application } from "@/constant/type";

export default function TimelinePanel({ app }: { app: Application }) {
  return (
    <Card title={<span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Timeline</span>}>
      <Space direction="vertical" className="w-full">
        <div><Tag color="blue">•</Tag> Application Submitted — {app.appliedDate}</div>
        {app.status !== "pending" && <div><Tag color="purple">•</Tag> Application Reviewed</div>}
        {["shortlisted", "interviewed", "hired"].includes(app.status) && <div><Tag color="geekblue">•</Tag> Candidate Shortlisted</div>}
        {["interviewed", "hired"].includes(app.status) && <div><Tag color="orange">•</Tag> Interview Completed</div>}
        {app.status === "hired" && <div><Tag color="green">•</Tag> Candidate Hired</div>}
        {app.status === "rejected" && <div><Tag color="red">•</Tag> Application Rejected</div>}
      </Space>
    </Card>
  );
}
