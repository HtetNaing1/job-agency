"use client";
import { Tag } from "antd";
import { AppStatus, JobStatus } from "@/constant/type";

type AnyStatus = AppStatus | JobStatus;

const COLORS: Record<AnyStatus, string> = {
  active: "green",
  paused: "gold",
  closed: "default",
  pending: "blue",
  reviewed: "purple",
  shortlisted: "geekblue",
  interviewed: "orange",
  rejected: "red",
  hired: "green",
};

export default function StatusTag({ status }: { status: AnyStatus }) {
  const color = COLORS[status] ?? "default";
  return <Tag color={color}>{status}</Tag>;
}
