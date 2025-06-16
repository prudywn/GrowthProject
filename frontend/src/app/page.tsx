import HeroSection from "./components/Hero";
import Navbar from "./components/NavBar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
    </div>
  );
}
