"use client";
import { Card, Typography, Space } from "antd";
import { ReactNode } from "react";

const { Title, Text } = Typography;

export default function StatCard({
  label,
  value,
  icon,
  gradient,
}: {
  label: string;
  value: number | string;
  icon: ReactNode;
  gradient: "blue" | "green" | "purple";
}) {
  const bg =
    gradient === "blue"
      ? "bg-gradient-to-br from-blue-500 to-cyan-600"
      : gradient === "green"
      ? "bg-gradient-to-br from-green-500 to-emerald-600"
      : "bg-gradient-to-br from-purple-500 to-pink-600";

  return (
    <Card className={`${bg} text-white border-0`}>
      <Space className="w-full" align="start">
        <div className="flex-1">
          <Text style={{ color: "rgba(255,255,255,.8)" }}>{label}</Text>
          <Title level={2} style={{ margin: 0, color: "#fff" }}>{value}</Title>
        </div>
        <div className="opacity-80">{icon}</div>
      </Space>
    </Card>
  );
}
