import { Hero } from "../components/organisms/Hero";
import { Features } from "../components/organisms/Features"
import { JobCategories } from "../components/organisms/JobCategories";
import { Footer } from "../components/organisms/Footer";
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