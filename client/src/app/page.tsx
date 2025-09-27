import { Header } from "../components/organisms/Header";
import { Hero } from "../components/organisms/Hero";
import { Features } from "../components/organisms/Features"
import { JobCategories } from "../components/organisms/JobCategories";
import { Footer } from "../components/organisms/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <JobCategories />
      <Footer />
    </div>
  );
}