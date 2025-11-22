"use client";

import { List, Avatar, Typography, Space, Button as AntButton } from "antd";
import { Calendar, Clock, Phone, Video, Home } from "lucide-react";
import { Interview } from "../templates/JobDashboardTemplate";

const { Text } = Typography;

const ICONS = {
  phone: <Phone className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  "in-person": <Home className="h-4 w-4" />,
};

export default function InterviewItem({ i }: { i: Interview }) {
  return (
    <List.Item
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        minHeight: 110,
      }}
    >
      <List.Item.Meta
        avatar={<Avatar style={{ backgroundColor: "#13c2c2" }}>{i.company.slice(0, 2).toUpperCase()}</Avatar>}
        title={<Text strong>{i.jobTitle}</Text>}
        description={
          <div className="flex flex-col gap-2">
            <Text type="secondary">{i.company}</Text>
            <Space size="middle" wrap>
              <Space><Calendar className="h-4 w-4" /> {i.date}</Space>
              <Space><Clock className="h-4 w-4" /> {i.time} ({i.duration})</Space>
              <Space>{ICONS[i.type]} <span className="capitalize">{i.type}</span></Space>
            </Space>
            {i.meetingLink && (
              <a href={i.meetingLink} target="_blank" rel="noreferrer">Join meeting</a>
            )}
            {i.address && <Text type="secondary">{i.address}</Text>}
          </div>
        }
      />
      <Space>
        <AntButton>Reschedule</AntButton>
        <AntButton type="primary">
          {i.type === "video" ? "Join Call" : i.type === "phone" ? "Call Details" : "Directions"}
        </AntButton>
      </Space>
    </List.Item>
  );
}
