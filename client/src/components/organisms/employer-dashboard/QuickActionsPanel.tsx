"use client";
import { Card, Space, Button, message, Modal, Input } from "antd";
import { Mail, CalendarDays, Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Application } from "@/constant/type";

export default function QuickActionsPanel({ app }: { app: Application }) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [ivOpen, setIvOpen] = useState(false);

  return (
    <Card title="Quick Actions">
      <Space direction="vertical" className="w-full">
        <Button type="primary" onClick={() => setEmailOpen(true)} icon={<Mail className="w-4 h-4" />}>
          Send Email
        </Button>
        <Button onClick={() => setIvOpen(true)} icon={<CalendarDays className="w-4 h-4" />}>
          Schedule Interview
        </Button>
        <Button onClick={() => message.success("Downloading resume…")} icon={<Download className="w-4 h-4" />}>
          Download Resume
        </Button>
        {app.portfolio && (
          <Button icon={<ExternalLink className="w-4 h-4" />}>
            <a href={app.portfolio} target="_blank" rel="noreferrer">View Portfolio</a>
          </Button>
        )}
      </Space>

      {/* Email modal */}
      <Modal
        title={`Send Email to ${app.candidateName}`}
        open={emailOpen}
        onCancel={() => setEmailOpen(false)}
        onOk={() => {
          const s = (document.getElementById("email-subj") as HTMLInputElement)?.value?.trim();
          const b = (document.getElementById("email-body") as HTMLTextAreaElement)?.value?.trim();
          if (!s || !b) return message.warning("Fill subject and message");
          message.success("Email sent");
          setEmailOpen(false);
        }}
        okText="Send Email"
      >
        <Space direction="vertical" className="w-full">
          <Input disabled value={app.candidateEmail} />
          <Input id="email-subj" placeholder="Subject" />
          <Input.TextArea id="email-body" placeholder="Write your message…" rows={6} />
        </Space>
      </Modal>

      {/* Interview modal */}
      <Modal
        title={`Schedule Interview — ${app.candidateName}`}
        open={ivOpen}
        onCancel={() => setIvOpen(false)}
        onOk={() => {
          const d = (document.getElementById("iv-date") as HTMLInputElement)?.value;
          const t = (document.getElementById("iv-time") as HTMLInputElement)?.value;
          if (!d || !t) return message.warning("Select date and time");
          message.success("Interview scheduled");
          setIvOpen(false);
        }}
        okText="Schedule"
      >
        <Space className="w-full">
          <Input id="iv-date" type="date" />
          <Input id="iv-time" type="time" />
        </Space>
        <Input className="mt-3" placeholder="Location / Meeting link (optional)" />
      </Modal>
    </Card>
  );
}
