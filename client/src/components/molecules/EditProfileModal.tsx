"use client";

import { Modal, Form, Input, message } from "antd";
import { UserProfile, updateProfile } from "@/services/profileService";
import { useState } from "react";

interface EditProfileModalProps {
  visible: boolean;
  profile: UserProfile;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditProfileModal({
  visible,
  profile,
  onClose,
  onUpdate,
}: EditProfileModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const response = await updateProfile(values);

      if (response.err === 0) {
        message.success("Profile updated successfully!");
        onUpdate();
        onClose();
      } else {
        message.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Profile"
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={600}
      okText="Save Changes"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: profile.name,
          phone: profile.phone,
          location: profile.location,
          bio: profile.bio,
        }}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="+1 (555) 123-4567" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter your location" }]}
        >
          <Input placeholder="City, State" />
        </Form.Item>

        <Form.Item
          label="Professional Summary"
          name="bio"
          rules={[
            { required: true, message: "Please enter your professional summary" },
            { min: 50, message: "Summary should be at least 50 characters" },
          ]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Tell us about your professional background and experience..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
