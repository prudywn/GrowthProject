"use client";
import ContactForm from "@/app/components/ContactForm";

export default function ContactPage() {
  return (
    <main className=" min-h-screen">
      <h1 className="text-2xl md:text-4xl font-bold text-center pt-12 text-[#195872]">
        Get In Touch
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mt-4 px-4">
        Ready to transform your sales performance? Get in touch with our team to
        discuss your training needs...
      </p>
      <ContactForm />
    </main>
  );
}
