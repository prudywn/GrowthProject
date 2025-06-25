"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/custom/card";
import type { CardProps } from "@/components/custom/card";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCourses } from "@/lib/fetcher";

// Add Course type for all courses
interface Course {
  _id: string;
  title: string;
  description: string;
  imageSrc: string;
}

export default function CoursesPage() {
  const { data: courses = [], isLoading, isError } = useQuery<Course[]>({
    queryKey: ["allCourses"],
    queryFn: fetchAllCourses,
  });

  if (isLoading) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center py-20">Loading courses...</div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center py-20 text-red-500">Failed to load courses.</div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-[#195872] text-3xl md:text-4xl font-bold text-start mb-4">
        Here are some of the courses that we offer
      </h2>
      <p className="text-start mb-12 max-w-xl  text-gray-600">
        Enrol for our courses to drive comprehensive sales training solutions
        designed to drive measurable results and sustainable growth for your
        business.
      </p>

      {/* Horizontal Scroll on Small Screens */}
      <div className="md:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory px-1 pb-4">
        {courses.map((course: Course, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card {...course} />
          </motion.div>
        ))}
      </div>

      {/* Grid View on Medium+ Screens */}
      <div className="hidden md:grid md:grid-cols-3 gap-10">
        {courses.map((course: Course, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card {...course} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
