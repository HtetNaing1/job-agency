"use client";

import { useState } from "react";
import { Tag, Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Award } from "lucide-react";
import { updateProfile } from "@/services/profileService";

interface SkillsCardProps {
  skills: string[];
  onUpdate: () => void;
}

export default function SkillsCard({ skills, onUpdate }: SkillsCardProps) {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddSkill = async () => {
    if (inputValue && !skills.includes(inputValue)) {
      try {
        setLoading(true);
        const newSkills = [...skills, inputValue];
        const response = await updateProfile({ skills: newSkills });

        if (response.err === 0) {
          message.success("Skill added successfully!");
          setInputValue("");
          setInputVisible(false);
          onUpdate();
        } else {
          message.error(response.message || "Failed to add skill");
        }
      } catch (error) {
        console.error("Error adding skill:", error);
        message.error("Failed to add skill");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveSkill = async (skillToRemove: string) => {
    try {
      setLoading(true);
      const newSkills = skills.filter(skill => skill !== skillToRemove);
      const response = await updateProfile({ skills: newSkills });

      if (response.err === 0) {
        message.success("Skill removed successfully!");
        onUpdate();
      } else {
        message.error(response.message || "Failed to remove skill");
      }
    } catch (error) {
      console.error("Error removing skill:", error);
      message.error("Failed to remove skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h3 className="flex items-center gap-2 text-gray-900 font-semibold mb-4">
        <Award className="h-5 w-5" /> Skills
      </h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Tag
            key={index}
            closable={!loading}
            onClose={() => handleRemoveSkill(skill)}
            className="text-sm py-1 px-3"
          >
            {skill}
          </Tag>
        ))}

        {inputVisible ? (
          <Input
            type="text"
            size="small"
            className="w-32"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleAddSkill}
            onPressEnter={handleAddSkill}
            disabled={loading}
            autoFocus
          />
        ) : (
          <Button
            size="small"
            type="dashed"
            onClick={() => setInputVisible(true)}
            icon={<PlusOutlined />}
            disabled={loading}
          >
            Add Skill
          </Button>
        )}
      </div>
    </section>
  );
}
