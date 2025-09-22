import { Card } from "antd";
import Button from "../atoms/Button";
import { Code, Palette, TrendingUp, Stethoscope, Wrench, GraduationCap, ChefHat, Building } from "lucide-react";

const categories = [
  {
    icon: Code,
    title: "Technology",
    jobs: "2,450 jobs",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Palette,
    title: "Design & Creative",
    jobs: "1,320 jobs",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: TrendingUp,
    title: "Sales & Marketing",
    jobs: "1,890 jobs",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    jobs: "980 jobs",
    color: "bg-red-100 text-red-600"
  },
  {
    icon: Wrench,
    title: "Engineering",
    jobs: "1,560 jobs",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: GraduationCap,
    title: "Education",
    jobs: "780 jobs",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: ChefHat,
    title: "Hospitality",
    jobs: "650 jobs",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: Building,
    title: "Finance",
    jobs: "1,200 jobs",
    color: "bg-gray-100 text-gray-600"
  }
];

export function JobCategories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse Jobs by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore opportunities across different industries and find the perfect match for your skills and interests.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-none">
                <div className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.jobs}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="large" label="View All Categories"/>
        </div>
      </div>
    </section>
  );
}