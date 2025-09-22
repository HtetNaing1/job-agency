"use client";

import Button from "../atoms/Button";
import { Menu, Search, User, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/sign-in");
  };

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
            <span className="font-bold text-xl text-primary text-blue-500">
              JobConnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/jobs"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Find Jobs
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Post a Job
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Companies
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition-colors"
            >
              About
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              block
              className="hidden sm:flex"
              icon="userRound"
              label="Sign In"
              rounded
              onClick={handleSignInClick}
            />
            <Button
              block
              className="hidden sm:flex"
              icon="userPlus"
              label="Sign Up"
              rounded
              onClick={handleSignUpClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
