"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Button from "../atoms/Button";
import { Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if access token exists on mount
    setIsLoggedIn(!!Cookies.get("accessToken"));
  }, []);

  const navigate = (path: string) => router.push(path);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <Briefcase className="h-8 w-8" />
            </div>
            <span className="font-bold text-xl text-blue-500">JobConnect</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/jobs"
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              Find Jobs
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              Post a Job
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              About
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button
                  icon="userRound"
                  label="Profile"
                  rounded
                  onClick={() => navigate("/profile")}
                />
                <Button
                  icon="logout"
                  label="Logout"
                  rounded
                  onClick={handleLogout}
                />
              </>
            ) : (
              <>
                <Button
                  icon="userRound"
                  label="Login"
                  rounded
                  onClick={() => navigate("/login")}
                />
                <Button
                  icon="userPlus"
                  label="Register"
                  rounded
                  onClick={() => navigate("/register")}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
