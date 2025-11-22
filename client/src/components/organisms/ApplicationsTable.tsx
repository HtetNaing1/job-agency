"use client";
import { Table, Space, Typography, Avatar, Modal } from "antd";
import StatusTag from "@/components/atoms/StatusTag";
import { Application } from "@/constant/type";
import { Star } from "lucide-react";

const { Text } = Typography;

export default function ApplicationsTable({ data }: { data: Application[] }) {
  return (
    <Table
      rowKey="id"
      dataSource={data}
      pagination={false}
      columns={[
        {
          title: "Candidate",
          dataIndex: "candidateName",
          render: (_: unknown, r: Application) => (
            <Space>
              <Avatar style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff" }}>
                {r.candidateName.split(" ").map(n => n[0]).join("")}
              </Avatar>
              <div>
                <div className="font-medium">{r.candidateName}</div>
                <Text type="secondary">{r.candidateEmail}</Text>
              </div>
            </Space>
          ),
        },
        { title: "Applied Date", dataIndex: "appliedDate" },
        { title: "Experience", dataIndex: "experience" },
        { title: "Status", dataIndex: "status", render: (v) => <StatusTag status={v} /> },
        {
          title: "Rating",
          dataIndex: "rating",
          render: (v: number | undefined) =>
            v ? (
              <Space size={4}>
                <Star className="w-4 h-4" style={{ color: "#F59E0B" }} />
                <span>{v}</span>
              </Space>
            ) : "--",
        },
      ]}
      onRow={(rec) => ({
        onClick: () =>
          Modal.info({
            title: rec.candidateName,
            content: (
              <div className="space-y-2">
                <div>{rec.candidateEmail}</div>
                <div>{rec.experience}</div>
                <div><StatusTag status={rec.status} /></div>
              </div>
            ),
          }),
      })}
    />
  );
}
