import { Hero } from "@/components/organisms/home/Hero";
import { Features } from "@/components/organisms/home/Features"
import { JobCategories } from "@/components/organisms/home/JobCategories";
import { Footer } from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Hero />
      <Features />
      <JobCategories />
      <Footer />
    </div>
  );
}