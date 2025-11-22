"use client";

import { MapPin, Mail, Pencil } from "lucide-react";
import Button from "@/components/atoms/Button";

type ProfileHeaderProps = {
  name: string;
  headline: string;
  location: string;
  email: string;
  onEdit?: () => void;
};

export default function ProfileHeader({
  name,
  headline,
  location,
  email,
  onEdit,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
          {name?.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() || "U"}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-700">{headline}</p>
          <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Mail className="h-4 w-4" /> {email}
            </span>
          </div>
        </div>
      </div>

      <Button label="Edit Profile" icon={<Pencil className="h-4 w-4" />} onClick={onEdit} />
    </div>
  );
}
