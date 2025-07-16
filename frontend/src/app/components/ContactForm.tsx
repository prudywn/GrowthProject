"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    roleInfo: "",
    serviceInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleRecaptchaLoad = () => {
    setRecaptchaLoaded(true);
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken(null);
    setError("reCAPTCHA failed to load. Please refresh the page and try again.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    
    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification.");
      setLoading(false);
      return;
    }
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phone,
          company: formData.company,
          role_description: formData.roleInfo,
          service_needs: formData.serviceInfo,
          recaptcha_token: recaptchaToken,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }
      setSuccess("Thank you! Your message has been sent.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        roleInfo: "",
        serviceInfo: "",
      });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (err: any) {
      setError(err.message || "Failed to send message.");
      // Reset reCAPTCHA on error
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 grid lg:grid-cols-3 gap-10">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-2 bg-white shadow-md rounded-xl p-6 space-y-8"
      >
        {/* Success/Error Messages */}
        {success && <div className="text-green-600 font-semibold">{success}</div>}
        {error && <div className="text-red-600 font-semibold">{error}</div>}
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
              value={formData.fullName}
              required
              disabled={loading}
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
              value={formData.email}
              required
              disabled={loading}
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
              value={formData.phone}
              disabled={loading}
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
              value={formData.company}
              disabled={loading}
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
            value={formData.roleInfo}
            required
            disabled={loading}
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
            value={formData.serviceInfo}
            disabled={loading}
          />
        </div>

        {/* reCAPTCHA */}
        <div className="flex flex-col items-center space-y-3">
          <div className="text-center">
            <label className="font-bold text-[#195872] text-lg mb-2 block">
              Security Verification
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Please verify that you are human by completing the reCAPTCHA below:
            </p>
          </div>
          
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={handleRecaptchaChange}
              onExpired={() => setRecaptchaToken(null)}
              onError={handleRecaptchaError}
              onLoad={handleRecaptchaLoad}
              theme="light"
              size="normal"
            />
          </div>
          
          {/* reCAPTCHA Status */}
          {!recaptchaLoaded && (
            <div className="text-center text-sm text-gray-500">
              Loading reCAPTCHA...
            </div>
          )}
          
          {recaptchaLoaded && !recaptchaToken && (
            <div className="text-center text-sm text-orange-600">
              ⚠️ Please complete the reCAPTCHA verification above to enable form submission
            </div>
          )}
          
          {recaptchaToken && (
            <div className="text-center text-sm text-green-600">
              ✅ reCAPTCHA verified successfully - You can now submit the form
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#195872] text-white rounded-full px-6 py-3 w-full hover:bg-[#144452] transition text-lg"
          disabled={loading || !recaptchaToken}
        >
          {loading ? "Sending..." : "Send Message"}
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
            <Phone /> 254-721-303-864
          </p>
        </div>

        <div className="text-[#195872] p-8 rounded-[40px] shadow-md space-y-6">
          <h3 className="text-xl font-semibold">Contact Info</h3>
          <p className="text-base flex gap-2">
            <Phone /> 254-721-303-864
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
