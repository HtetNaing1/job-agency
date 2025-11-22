"use client";
import { Card, Space, Button } from "antd";
import { CheckCircle, XCircle, CalendarDays, Star } from "lucide-react";
import { Application, AppStatus } from "@/constant/type";
import { message } from "antd";

export default function StatusActionsPanel({
  app,
  onChange,
}: {
  app: Application;
  onChange?: (s: AppStatus) => void;
}) {
  const change = (s: AppStatus) => {
    onChange?.(s);
    message.success(`Application status updated to ${s}`);
  };

  return (
    <Card title="Update Status">
      <Space direction="vertical" className="w-full">
        {app.status !== "reviewed" && <Button onClick={() => change("reviewed")} icon={<CheckCircle className="w-4 h-4" />}>Mark as Reviewed</Button>}
        {!(["shortlisted", "interviewed", "hired", "rejected"] as AppStatus[]).includes(app.status) && (
          <Button onClick={() => change("shortlisted")} icon={<Star className="w-4 h-4" />}>Shortlist Candidate</Button>
        )}
        {!(["interviewed", "hired", "rejected"] as AppStatus[]).includes(app.status) && (
          <Button onClick={() => change("interviewed")} icon={<CalendarDays className="w-4 h-4" />}>Mark as Interviewed</Button>
        )}
        <div className="h-px bg-slate-200 my-2" />
        {app.status !== "hired" && <Button type="primary" style={{ background: "#16a34a" }} onClick={() => change("hired")} icon={<CheckCircle className="w-4 h-4" />}>Hire Candidate</Button>}
        {app.status !== "rejected" && <Button danger onClick={() => change("rejected")} icon={<XCircle className="w-4 h-4" />}>Reject Application</Button>}
      </Space>
    </Card>
  );
}
