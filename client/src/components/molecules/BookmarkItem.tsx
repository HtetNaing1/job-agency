"use client";

import { List, Avatar, Typography, Space, Tag, Button as AntButton } from "antd";
import { Building2, MapPin } from "lucide-react";
import { BookmarkedJob } from "../templates/JobDashboardTemplate";

const { Text } = Typography;

export default function BookmarkItem({ b }: { b: BookmarkedJob }) {
  return (
    <List.Item
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        minHeight: 110,
      }}
      actions={[<AntButton key="apply" type="primary">Apply Now</AntButton>]}
    >
      <List.Item.Meta
        avatar={<Avatar style={{ backgroundColor: "#722ed1" }}>{b.company.slice(0, 2).toUpperCase()}</Avatar>}
        title={<Text strong>{b.jobTitle}</Text>}
        description={
          <div className="flex flex-col gap-2">
            <Space size="middle" wrap>
              <Space><Building2 className="h-4 w-4" /><Text type="secondary">{b.company}</Text></Space>
              <Space><MapPin className="h-4 w-4" /><Text type="secondary">{b.location}</Text></Space>
            </Space>
            <Space size="small" wrap>
              <Tag bordered={false}>{b.salary}</Tag>
              <Tag bordered={false} className="capitalize">{b.jobType}</Tag>
              <Text type="secondary">Posted {b.postedDate}</Text>
              <Text type="danger">Deadline: {b.deadline}</Text>
            </Space>
          </div>
        }
      />
    </List.Item>
  );
}
