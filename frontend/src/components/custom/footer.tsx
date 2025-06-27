// components/Footer.tsx
"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phone,
          company: "",
          role_description: "Book a call request from footer",
          service_needs: "Book a call",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }
      setSuccess("Thank you! We'll be in touch soon to schedule your call.");
      setFormData({
        fullName: "",
        phone: "",
        email: "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#195872] text-white">
      <div className="grid lg:grid-cols-2 gap-12 px-3 lg:px-8 py-16">
        {/* Contact Form */}
        <div className="bg-[#E1F2FE] text-black rounded-[32px] p-8 lg:w-lg w-[75%] mx-auto">
          <h3 className="text-2xl text-[#195872] font-bold mb-2">
            Talk to an Expert
          </h3>
          <p className="text-base mb-6">Start by filling the form below</p>
          
          {/* Success/Error Messages */}
          {success && <div className="text-green-600 font-semibold mb-4">{success}</div>}
          {error && <div className="text-red-600 font-semibold mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-base text-[#195872] font-bold mb-1">
                Full Name*
              </label>
              <input
                name="fullName"
                type="text"
                placeholder="John Doe"
                className="w-full bg-white px-4 py-2 border rounded-full outline-none"
                onChange={handleChange}
                value={formData.fullName}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-base text-[#195872] font-bold mb-1">
                Phone Number*
              </label>
              <input
                name="phone"
                type="text"
                placeholder="+254 123 456 789"
                className="w-full bg-white px-4 py-2 border rounded-full outline-none"
                onChange={handleChange}
                value={formData.phone}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-base text-[#195872] font-bold mb-1">
                Email Address*
              </label>
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                className="w-full bg-white px-4 py-2 border rounded-full outline-none"
                onChange={handleChange}
                value={formData.email}
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#195872] text-white py-3 text-lg rounded-full mt-4 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : "Book Call"}
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col justify-between text-base text-[#E1F2FE]">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
            <div>
              <h4 className="font-bold mb-3 text-center text-lg">Company</h4>
              <ul className="space-y-4  flex flex-col justify-center items-center">
                <li>
                  <a href="#" className="hover:underline">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">Contact Info</h4>
              <ul className="space-y-6">
                <li className="flex items-center gap-2">
                  <Phone size={16} /> 254-780-149-415
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} /> info@growthpartners.co.ke
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1" /> CMS Africa House, Chania
                  Ave, Nairobi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-start text-[#E1F2FE] text-base py-4 border-t border-white/20">
        © {new Date().getFullYear()}GrowthPartners.Inc. All rights reserved.
      </div>
    </footer>
  );
}
