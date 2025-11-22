"use client";

import { Button, Row, Col, Typography, Card, Space, Tag, Rate } from "antd";
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Calendar as CalendarIcon, GraduationCap, FileText, Star } from "lucide-react";
import QuickActionsPanel from "@/components/organisms/QuickActionsPanel";
import StatusActionsPanel from "@/components/organisms/StatusActionsPanel";
import TimelinePanel from "@/components/organisms/TimelinePanel";
import { Application, AppStatus } from "@/constant/type";
import { useState } from "react";

const { Title, Text, Paragraph } = Typography;

export default function ApplicantProfilePage({
  application,
  onBack,
  onStatusChange,
}: {
  application: Application;
  onBack: () => void;
  onStatusChange?: (id: string, s: AppStatus) => void;
}) {
  const [rating, setRating] = useState<number>(application.rating || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button type="text" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Applications
        </Button>

        <Row gutter={[16, 16]}>
          {/* Left column */}
          <Col xs={24} lg={16}>
            <Card className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <Title level={3} style={{ marginBottom: 4 }}>{application.candidateName}</Title>
                  <Text type="secondary" className="block">Applied for: {application.jobTitle}</Text>
                  <div className="mt-2"><Tag color="geekblue">{application.status}</Tag></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 mt-4 text-slate-600">
                    <div><Mail className="inline w-4 h-4 mr-1" /> {application.candidateEmail}</div>
                    {application.candidatePhone && <div><Phone className="inline w-4 h-4 mr-1" /> {application.candidatePhone}</div>}
                    <div><MapPin className="inline w-4 h-4 mr-1" /> {application.location}</div>
                    <div><CalendarIcon className="inline w-4 h-4 mr-1" /> Applied: {application.appliedDate}</div>
                    {application.currentCompany && <div><Briefcase className="inline w-4 h-4 mr-1" /> {application.currentCompany}</div>}
                  </div>
                </div>

                <div className="text-right">
                  <Rate value={rating} onChange={setRating} character={<Star className="w-4 h-4" style={{ color: "#F59E0B" }} />} />
                  {rating ? <div className="text-sm text-slate-500 mt-1">{rating}/5</div> : null}
                </div>
              </div>
            </Card>

            <Card className="mb-6" title="Professional Summary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Text type="secondary">Experience</Text><div>{application.experience}</div></div>
                <div><Text type="secondary">Education</Text><div>{application.education}</div></div>
                {application.noticePeriod && <div><Text type="secondary">Notice Period</Text><div>{application.noticePeriod}</div></div>}
                {application.expectedSalary && <div><Text type="secondary">Expected Salary</Text><div>{application.expectedSalary}</div></div>}
              </div>
            </Card>

            <Card className="mb-6" title="Skills & Expertise">
              <Space wrap>{application.skills.map((s, i) => <Tag key={i} color="blue">{s}</Tag>)}</Space>
            </Card>

            {application.languages?.length ? (
              <Card className="mb-6" title="Languages">
                <Space wrap>{application.languages.map((l, i) => <Tag key={i}>{l}</Tag>)}</Space>
              </Card>
            ) : null}

            {application.certifications?.length ? (
              <Card className="mb-6" title={<span className="flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Certifications</span>}>
                <ul className="list-disc pl-5">{application.certifications.map((c, i) => <li key={i}>{c}</li>)}</ul>
              </Card>
            ) : null}

            <Card title={<span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Cover Letter</span>}>
              <Paragraph style={{ whiteSpace: "pre-line", marginBottom: 0 }}>{application.coverLetter}</Paragraph>
            </Card>
          </Col>

          {/* Right column */}
          <Col xs={24} lg={8}>
            <QuickActionsPanel app={application} />
            <div className="h-4" />
            <StatusActionsPanel app={application} onChange={(s) => onStatusChange?.(application.id, s)} />
            <div className="h-4" />
            <TimelinePanel app={application} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
