"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    roleInfo: "",
    serviceInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send to Supabase later
    console.log("Form submitted:", formData);
  };

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 grid lg:grid-cols-3 gap-10">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-2 bg-white shadow-md rounded-xl p-6 space-y-8"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <label
              htmlFor="fullName"
              className="font-bold text-[#195872] text-lg"
            >
              Full Name*
            </label>
            <input
              name="fullName"
              type="text"
              placeholder="John Doe"
              className="input-style"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="font-bold text-[#195872] text-lg">
              Email Address*
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email Address*"
              className="input-style"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="phone" className="font-bold text-[#195872] text-lg">
              Phone Number*
            </label>
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input-style"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="company"
              className="font-bold text-[#195872] text-lg"
            >
              Company Name*
            </label>
            <input
              name="company"
              type="text"
              placeholder="Company Name"
              className="input-style"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="roleInfo"
            className="font-bold text-[#195872] text-lg"
          >
            Please describe your role in the company*
          </label>
          <textarea
            name="roleInfo"
            placeholder="Describe your job title, the company or team you work with, and  key responsibilities you handle regularly....."
            className="textarea-style"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="serviceInfo"
            className="font-bold text-[#195872] text-lg"
          >
            How would you like us to be of service to you?
          </label>
          <textarea
            name="serviceInfo"
            placeholder="Tell us about your training needs, team size and goals......."
            className="textarea-style"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-[#195872] text-white rounded-full px-6 py-3 w-full hover:bg-[#144452] transition text-lg"
        >
          Send Message
        </button>
      </form>

      {/* Info Boxes */}
      <div className="space-y-6">
        <div className="bg-[#E1F2FE] py-12 px-6 rounded-[40px] shadow-md">
          <h3 className="text-xl text-[#195872] font-semibold mb-2">
            Free Consultation
          </h3>
          <p className="text-sm mb-4">
            Schedule a 30-minute consultation to discuss your training needs and
            discover how we can help your business achieve better results.
          </p>
          <p className="text-[#195872] mt-4 font-medium flex gap-2">
            <Phone /> 254-789-149-415
          </p>
        </div>

        <div className="text-[#195872] p-8 rounded-[40px] shadow-md space-y-6">
          <h3 className="text-xl font-semibold">Contact Info</h3>
          <p className="text-base flex gap-2">
            <Phone /> 254-789-149-415
          </p>
          <p className="text-base flex gap-2">
            <Mail /> info@growthpartners.co.ke
          </p>
          <p className="text-base flex gap-2">
            <MapPin /> CMS Africa House, Chania Ave, Nairobi
          </p>
        </div>
      </div>
    </section>
  );
}
