"use client";
import { Dropdown, Button } from "antd";
import { Eye, Edit, Pause, Play, Trash2, MoreHorizontal } from "lucide-react";
import { JobPosting } from "@/constant/type";

export default function JobActionsMenu({
  job,
  onView,
  onToggle,
  onDelete,
  onEdit,
}: {
  job: JobPosting;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onEdit?: () => void;
}) {
  const items = [
    { key: "view", label: <span><Eye className="w-4 h-4 mr-1 inline" /> View Applications</span>, onClick: onView },
    { key: "edit", label: <span><Edit className="w-4 h-4 mr-1 inline" /> Edit Job</span>, onClick: onEdit },
    {
      key: "toggle",
      label: job.status === "active"
        ? <span><Pause className="w-4 h-4 mr-1 inline" /> Pause Job</span>
        : <span><Play className="w-4 h-4 mr-1 inline" /> Activate Job</span>,
      onClick: onToggle,
    },
    { key: "delete", danger: true, label: <span><Trash2 className="w-4 h-4 mr-1 inline" /> Delete Job</span>, onClick: onDelete },
  ];

  return (
    <Dropdown trigger={["click"]} menu={{ items }}>
      <Button onClick={(e) => e.stopPropagation()} icon={<MoreHorizontal className="w-4 h-4" />} />
    </Dropdown>
  );
}
