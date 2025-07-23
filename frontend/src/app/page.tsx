import ClientsSay from "@/app/components/ClientsSay";
import Companies from "@/app/components/Companies";
import ReadyToTransform from "@/app/components/Consultation";
import Courses from "@/app/components/Courses";
import HeroSection from "@/app/components/Hero";
import WhyGrowthPartners from "@/app/components/Why";
import ServicesSection from "@/components/ServicesSection";
import { fetchMainServices } from "@/lib/fetcher";
import { sanityFetch } from "@/lib/sanity/client";
import type { SimpleService } from "@/types";

interface HomepageContent {
  servicesSection: {
    title: string;
    description: string;
  };
}

const homepageQuery = `*[_type == "homepageContent"][0] {
  servicesSection {
    title,
    description
  }
}`;

export default async function Home() {
  const content = await sanityFetch<HomepageContent>(homepageQuery);
  const services: SimpleService[] = await fetchMainServices();
  
  // Filter out any services with invalid data to prevent rendering errors
  const validServices = services.filter(service => 
    service && 
    typeof service.name === 'string' && 
    typeof service.description === 'string' && 
    service.category
  );
  
  const servicesSectionProps = content?.servicesSection ? {
    ...content.servicesSection,
    featuredServices: validServices.slice(0, 6) // Show first 6 valid services like courses
  } : null;

  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyGrowthPartners />
      {servicesSectionProps && <ServicesSection {...servicesSectionProps} />}
      <Courses />
      <Companies />
      <ClientsSay />
      <ReadyToTransform />
    </div>
  );
}
