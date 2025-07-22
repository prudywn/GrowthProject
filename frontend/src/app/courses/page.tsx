"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/custom/card";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCourses, fetchCourseCategories } from "@/lib/fetcher";
import type { SimpleCourse, CourseCategory } from "@/types";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: courses = [], isLoading: coursesLoading, isError: coursesError } = useQuery<SimpleCourse[]>({
    queryKey: ["allCourses"],
    queryFn: fetchAllCourses,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<CourseCategory[]>({
    queryKey: ["courseCategories"],
    queryFn: fetchCourseCategories,
  });

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => course.category._id === selectedCategory);

  if (coursesLoading || categoriesLoading) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center py-20">Loading courses...</div>
      </section>
    );
  }

  if (coursesError) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center py-20 text-red-500">Failed to load courses.</div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[#195872] text-3xl md:text-4xl font-bold text-start mb-4">
          Here are some of the courses that we offer
        </h1>
        <p className="text-start mb-8 max-w-xl text-gray-600">
          Enrol for our courses to drive comprehensive sales training solutions
          designed to drive measurable results and sustainable growth for your
          business.
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
            All Categories ({courses.length})
          </button>
          {categories.map((category) => {
            const courseCount = courses.filter(course => course.category._id === category._id).length;
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
                {category.title} ({courseCount})
              </button>
            );
          })}
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No courses found in this category.
        </div>
      ) : (
        <>
          {/* Horizontal Scroll on Small Screens */}
          <div className="md:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory px-1 pb-4">
            {filteredCourses.map((course: SimpleCourse, index: number) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  title={course.name} 
                  description={course.description} 
                  imageSrc={course.imageSrc}
                  slug={course.slug?.current}
                  category={{
                    title: course.category.title,
                    color: course.category.color
                  }}
                  showViewButton={true}
                />
              </motion.div>
            ))}
          </div>

          {/* Grid View on Medium+ Screens */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course: SimpleCourse, index: number) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  title={course.name} 
                  description={course.description} 
                  imageSrc={course.imageSrc}
                  slug={course.slug?.current}
                  category={{
                    title: course.category.title,
                    color: course.category.color
                  }}
                  showViewButton={true}
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
            Customised Training Solutions
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We can also offer Customised Courses based on your specifications on
            the topic of sales. Our team works closely with organizations to develop
            tailored training programs that address your specific business needs and
            challenges.
          </p>
        </div>
      </div>
    </section>
  );
}