import { Card } from "antd";
import { Search, Users, Zap, Shield, Target, Award } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description: "Our AI-powered algorithm matches candidates with jobs based on skills, experience, and preferences."
  },
  {
    icon: Users,
    title: "Talent Pool Access",
    description: "Access to a vast network of pre-screened professionals across all industries and skill levels."
  },
  {
    icon: Zap,
    title: "Quick Hiring",
    description: "Streamlined hiring process that reduces time-to-hire by up to 50% with automated workflows."
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "All candidate profiles are verified and background-checked for authenticity and reliability."
  },
  {
    icon: Target,
    title: "Targeted Outreach",
    description: "Reach the right candidates with precision targeting based on location, skills, and career level."
  },
  {
    icon: Award,
    title: "Success Guarantee",
    description: "We guarantee successful placements with our 90-day replacement warranty on all hires."
  }
];

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose JobConnect?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing the way companies find talent and professionals find opportunities. 
            Here's what makes us different.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}