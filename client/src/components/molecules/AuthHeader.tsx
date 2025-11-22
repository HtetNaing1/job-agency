"use client";
import { Briefcase } from "lucide-react";

export default function AuthHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center mb-4">
        <a href="/">
          <div className="bg-blue-500 text-white p-3 rounded-2xl">
            <Briefcase className="h-8 w-8" />
          </div>
        </a>
      </div>
      <h1 className="text-2xl font-bold text-black">{title}</h1>
    </div>
  );
}
