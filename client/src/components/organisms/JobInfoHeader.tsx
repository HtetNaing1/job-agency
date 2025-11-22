"use client";
import { Card, Typography, Space, Button, Modal, Input } from "antd";
import StatusTag from "@/components/atoms/StatusTag";
import JobMetaEmployer from "@/components/molecules/JobMetaEmployer";
import { JobPosting } from "@/constant/type";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { message } from "antd";

const { Title, Text } = Typography;

export default function JobInfoHeader({ job }: { job: JobPosting }) {
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState("");

  const saveDeadline = () => {
    if (!deadline) return message.warning("Pick a new deadline");
    message.success("Deadline updated");
    setOpen(false);
    setDeadline("");
  };

  return (
    <Card className="mb-16 bg-white/90">
      <div className="flex items-start justify-between">
        <div>
          <Space size="small" className="mb-1">
            <Title level={5} style={{ margin: 0 }}>{job.title}</Title>
            <StatusTag status={job.status} />
          </Space>
          <Text type="secondary" className="block mb-2">{job.company}</Text>
          <JobMetaEmployer job={job} />
        </div>
        <Button onClick={() => setOpen(true)} icon={<CalendarIcon className="w-4 h-4" />}>
          Change Deadline
        </Button>

        <Modal title="Change Application Deadline" open={open} onCancel={() => setOpen(false)} onOk={saveDeadline} okText="Update">
          <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </Modal>
      </div>
    </Card>
  );
}
