import ClientsSay from "@/app/components/ClientsSay";
import Companies from "@/app/components/Companies";
import ReadyToTransform from "@/app/components/Consultation";
import Courses from "@/app/components/Courses";
import HeroSection from "@/app/components/Hero";
import WhyGrowthPartners from "@/app/components/Why";
import ServicesSection, {
  ServicesSectionProps,
} from "@/components/ServicesSection";
import { sanityFetch } from "@/lib/sanity/client";

interface HomepageContent {
  servicesSection: ServicesSectionProps;
}

const homepageQuery = `*[_type == "homepageContent"][0] {
  servicesSection {
    title,
    description,
    featuredServices[]->{
      _id,
      title,
      shortDescription,
      slug,
      mainImage
    }
  }
}`;

export default async function Home() {
  const content = await sanityFetch<HomepageContent>(homepageQuery);
  const servicesSection = content?.servicesSection;

  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyGrowthPartners />
      {servicesSection && <ServicesSection {...servicesSection} />}
      <Courses />
      <Companies />
      <ClientsSay />
      <ReadyToTransform />
    </div>
  );
}
