import Button from "../atoms/Button";
import { Input } from "antd";
import { Search, MapPin, Briefcase, Users } from "lucide-react";
import { ImageWithFallback } from "../atoms/imageWithFallback";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Find Your Dream Job or Perfect Candidate
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Connect with top employers and talented professionals. We make
                job searching and hiring simple, fast, and effective.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Input
                    placeholder="Job title or keyword"
                    className="pl-10"
                    prefix={<Search className="text-gray-300 w-5 h-5" />}
                  />
                </div>
                <div className="relative">
                  <Input
                    placeholder="Location"
                    className="pl-10"
                    prefix={<MapPin className="text-gray-300 w-5 h-5" />}
                  />
                </div>
                <Button label="Search Jobs" icon="search" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div className="font-bold text-2xl text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="font-bold text-2xl text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Job Seekers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
                <div className="font-bold text-2xl text-gray-900">5K+</div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1603202662706-62ead3176b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc1NzY1MTg2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional business team meeting"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
