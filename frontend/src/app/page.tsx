import ClientsSay from "./components/ClientsSay";
import Companies from "./components/Companies";
import ReadyToTransform from "./components/Consultation";
import Courses from "./components/Courses";
import HeroSection from "./components/Hero";

import WhyGrowthPartners from "./components/Why";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyGrowthPartners />
      <Courses />
      <Companies />
      <ClientsSay />
      <ReadyToTransform />
    </div>
  );
}
