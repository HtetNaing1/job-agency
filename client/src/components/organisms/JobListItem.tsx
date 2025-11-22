"use client";
import { Card, Typography, Space } from "antd";
import StatusTag from "@/components/atoms/StatusTag";
import JobMetaEmployer from "@/components/molecules/JobMetaEmployer";
import JobActionsMenu from "@/components/molecules/JobActionsMenu";
import { JobPosting } from "@/constant/type";
import { Users, Eye } from "lucide-react";

const { Title, Text } = Typography;

export default function JobListItem({
  job,
  onClick,
  onView,
  onToggle,
  onDelete,
  onEdit,
}: {
  job: JobPosting;
  onClick: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onEdit?: () => void;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow bg-white/95 mb-4 cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Space size="small" className="mb-1">
            <Title level={5} style={{ margin: 0 }}>{job.title}</Title>
            <StatusTag status={job.status} />
          </Space>
          <Text type="secondary" className="block mb-3">{job.company}</Text>
          <div className="mb-3"><JobMetaEmployer job={job} /></div>
          <Space size="large" className="text-slate-500">
            <span><Users className="inline w-4 h-4 mr-1" />{job.applications} applications</span>
            <span><Eye className="inline w-4 h-4 mr-1" />{job.views} views</span>
          </Space>
        </div>

        <JobActionsMenu job={job} onView={onView} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </Card>
  );
}
