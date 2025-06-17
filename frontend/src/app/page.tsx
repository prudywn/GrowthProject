import HeroSection from "./components/Hero";
import Navbar from "./components/NavBar";
import WhyGrowthPartners from "./components/Why";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyGrowthPartners />
    </div>
  );
}
