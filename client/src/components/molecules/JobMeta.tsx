"use client";
import { MapPin, DollarSign, Clock, Building2 } from "lucide-react";

interface JobMetaProps {
  company: string;
  location: string;
  salary: string;
  posted: string;
}

export default function JobMeta({ company, location, salary, posted }: JobMetaProps) {
  const meta = [
    { icon: <Building2 className="h-4 w-4" />, text: company },
    { icon: <MapPin className="h-4 w-4" />, text: location },
    { icon: <DollarSign className="h-4 w-4" />, text: salary },
    { icon: <Clock className="h-4 w-4" />, text: posted },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-800 mt-1">
      {meta.map((m, i) => (
        <span key={i} className="flex items-center gap-1">
          {m.icon} {m.text}
        </span>
      ))}
    </div>
  );
}
