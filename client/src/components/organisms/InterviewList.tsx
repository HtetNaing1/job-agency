"use client";

import { Card, List } from "antd";
import { Interview } from "../templates/JobDashboardTemplate";
import InterviewItem from "@/components/molecules/InterviewItem";

export default function InterviewsList({ interviews }: { interviews: Interview[] }) {
  return (
    <Card title="Upcoming Interviews" variant="outlined">
      <List
        dataSource={interviews}
        renderItem={(i) => <InterviewItem key={i.id} i={i} />}
      />
    </Card>
  );
}
