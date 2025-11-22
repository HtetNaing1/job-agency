"use client";

import { Card, List, Typography } from "antd";
import { JobApplication } from "../templates/JobDashboardTemplate";
import ApplicationItem from "@/components/molecules/ApplicationItem";

const { Text } = Typography;

export default function ApplicationsList({ applications }: { applications: JobApplication[] }) {
  return (
    <Card title="Job Applications" variant="outlined">
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        Track the status of your job applications
      </Text>
      <List
        dataSource={applications}
        renderItem={(a) => <ApplicationItem key={a.id} a={a} />}
      />
    </Card>
  );
}
