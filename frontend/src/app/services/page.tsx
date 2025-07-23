"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/custom/card";
import { useQuery } from "@tanstack/react-query";
import { fetchAllServices, fetchServiceCategories } from "@/lib/fetcher";
import { extractPlainText } from "@/lib/utils";
import type { SimpleService, ServiceCategory } from "@/types";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: services = [], isLoading: servicesLoading, isError: servicesError } = useQuery<SimpleService[]>({
    queryKey: ["allServices"],
    queryFn: fetchAllServices,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<ServiceCategory[]>({
    queryKey: ["serviceCategories"],
    queryFn: fetchServiceCategories,
  });

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category?._id === selectedCategory);

  if (servicesLoading || categoriesLoading) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center py-20">Loading services...</div>
      </section>
    );
  }

  if (servicesError) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center py-20 text-red-500">Failed to load services.</div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[#195872] text-3xl md:text-4xl font-bold text-start mb-4">
          Our Professional Services
        </h1>
        <p className="text-start mb-8 max-w-xl text-gray-600">
          Comprehensive solutions tailored to drive measurable results and 
          sustainable growth for your business across various domains.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-[#195872] text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Services ({services.length})
          </button>
          {categories.map((category) => {
            const serviceCount = services.filter(service => service.category?._id === category._id).length;
            return (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category._id
                    ? "text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor: selectedCategory === category._id 
                    ? (category.color || '#195872')
                    : undefined
                }}
              >
                {category.title} ({serviceCount})
              </button>
            );
          })}
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No services found in this category.
        </div>
      ) : (
        <>
          {/* Horizontal Scroll on Small Screens */}
          <div className="md:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory px-1 pb-4">
            {filteredServices.map((service: SimpleService, index: number) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  title={service.name} 
                  description={extractPlainText(service.description)} 
                  imageSrc={service.imageSrc}
                  slug={service.slug?.current}
                  category={service.category ? {
                    title: service.category.title,
                    color: service.category.color
                  } : undefined}
                  showViewButton={true}
                  viewButtonText="View Service"
                  comingSoonText="Service Details Coming Soon"
                />
              </motion.div>
            ))}
          </div>

          {/* Grid View on Medium+ Screens */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service: SimpleService, index: number) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  title={service.name} 
                  description={extractPlainText(service.description)} 
                  imageSrc={service.imageSrc}
                  slug={service.slug?.current}
                  category={service.category ? {
                    title: service.category.title,
                    color: service.category.color
                  } : undefined}
                  showViewButton={true}
                  viewButtonText="View Service"
                  comingSoonText="Service Details Coming Soon"
                />
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Additional Info Section */}
      <div className="mt-16 bg-[#E1F2FE] rounded-2xl p-8">
        <div className="max-w-3xl">
          <h3 className="text-2xl font-bold text-[#195872] mb-4">
            Customised Service Solutions
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We can also offer Customised Services based on your specific requirements
            and business objectives. Our team works closely with organizations to develop
            tailored solutions that address your unique challenges and opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}