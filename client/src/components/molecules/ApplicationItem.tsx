"use client";

import { List, Avatar, Tag, Typography, Space, Dropdown } from "antd";
import { Building2, MapPin, Calendar, Clock, Eye, MoreHorizontal, Check, X } from "lucide-react";
import { JobApplication } from "../templates/JobDashboardTemplate";

const { Text } = Typography;

export const STATUS_LABEL: Record<JobApplication["status"], string> = {
  pending: "Application Pending",
  reviewed: "Under Review",
  interview: "Interview Scheduled",
  rejected: "Not Selected",
  accepted: "Offer Received",
  withdrawn: "Withdrawn",
};

const STATUS_COLOR: Record<JobApplication["status"], string> = {
  pending: "gold",
  reviewed: "blue",
  interview: "green",
  rejected: "red",
  accepted: "cyan",
  withdrawn: "default",
};

export default function ApplicationItem({ a }: { a: JobApplication }) {
  const menuItems = [
    {
      key: "view",
      label: (
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" /> View Details
        </div>
      ),
    },
    ...(a.status === "pending"
      ? [
          {
            key: "withdraw",
            danger: true,
            label: (
              <div className="flex items-center gap-2 text-red-600">
                <X className="h-4 w-4" /> Withdraw Application
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <List.Item
      className="rounded-xl"
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        minHeight: 110, // keep consistent height
      }}
      actions={[
        <Dropdown key="actions" menu={{ items: menuItems }} trigger={["click"]}>
          <button className="p-2 hover:bg-gray-50 rounded-md">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </Dropdown>,
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar style={{ backgroundColor: "#1677ff" }}>
            {a.company.slice(0, 2).toUpperCase()}
          </Avatar>
        }
        title={
          <Space size="small" wrap>
            <Text strong>{a.jobTitle}</Text>
            <Tag color={STATUS_COLOR[a.status] as any} bordered={false}>
              <Space size={6}>
                {a.status === "pending" && <Clock className="h-4 w-4" />}
                {a.status === "reviewed" && <Eye className="h-4 w-4" />}
                {a.status === "interview" && <Calendar className="h-4 w-4" />}
                {a.status === "rejected" && <X className="h-4 w-4" />}
                {a.status === "accepted" && <Check className="h-4 w-4" />}
                {STATUS_LABEL[a.status]}
              </Space>
            </Tag>
          </Space>
        }
        description={
          <div className="flex flex-col gap-2">
            <Space size="middle" wrap>
              <Space>
                <Building2 className="h-4 w-4" />
                <Text type="secondary">{a.company}</Text>
              </Space>
              <Space>
                <MapPin className="h-4 w-4" />
                <Text type="secondary">{a.location}</Text>
              </Space>
              <Space>
                <Calendar className="h-4 w-4" />
                <Text type="secondary">Applied {a.appliedDate}</Text>
              </Space>
            </Space>
            <Space size="small" wrap>
              <Tag bordered={false}>{a.salary}</Tag>
              <Tag bordered={false} className="capitalize">
                {a.jobType.replace("-", " ")}
              </Tag>
              <Text type="secondary">Last update: {a.lastUpdate}</Text>
            </Space>
          </div>
        }
      />
    </List.Item>
  );
}
