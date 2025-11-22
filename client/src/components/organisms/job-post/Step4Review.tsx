"use client";
import { Form, Card, Checkbox, DatePicker, Input, Row, Col, Tag } from "antd";
import { CheckCircle, Building2, MapPin, Clock, DollarSign } from "lucide-react";
import OnboardCard from "@/components/atoms/OnboardCard";
import { BENEFITS } from "@/constant/type";
import dayjs from "dayjs";

export default function Step4Review() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white grid place-items-center mx-auto mb-3">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold">Benefits & Final Details</h2>
        <p className="text-slate-600 text-sm">Add perks and application info, then review.</p>
      </div>

      <OnboardCard>
        <Form.Item name="benefits" label="Benefits & Perks" initialValue={[]}>
          <Checkbox.Group className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {BENEFITS.map((b) => (
              <Checkbox key={b} value={b}>{b}</Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="applicationDeadline" label="Application Deadline" rules={[{ required: true }]}>
              <DatePicker className="w-full h-10" format="YYYY-MM-DD" disabledDate={(d) => d && d < dayjs().startOf("day")} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="contactEmail" label="Contact Email" rules={[{ required: true }, { type: "email" }]}>
              <Input placeholder="hr@company.com" className="h-10" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="companyWebsite" label="Company Website (optional)">
          <Input placeholder="https://www.company.com" className="h-10" />
        </Form.Item>
      </OnboardCard>

      {/* Live Preview */}
      <Form.Item noStyle shouldUpdate>
        {({ getFieldsValue }) => {
          const v = getFieldsValue(true);
          return (
            <Card className="border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-semibold mb-2">
                <Building2 className="w-5 h-5" /> Job Preview
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-lg font-semibold">{v.title || "Job Title"}</div>
                  <div className="text-slate-600">{v.company || "Company Name"}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {v.location && <Tag icon={<MapPin className="w-3 h-3" />}>{v.location}</Tag>}
                  {v.jobType && <Tag icon={<Clock className="w-3 h-3" />}>{v.jobType}</Tag>}
                  {v.workModel && <Tag>{v.workModel}</Tag>}
                </div>
                {v.salaryMin && v.salaryMax && (
                  <div className="text-emerald-600 font-medium">
                    <DollarSign className="inline w-4 h-4 -mt-1" /> {v.currency || "USD"} {Number(v.salaryMin).toLocaleString()} – {Number(v.salaryMax).toLocaleString()} / year
                  </div>
                )}
              </div>
            </Card>
          );
        }}
      </Form.Item>
    </div>
  );
}
