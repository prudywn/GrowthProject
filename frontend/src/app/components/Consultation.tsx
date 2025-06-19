// components/ReadyToTransform.tsx
"use client";

import React from "react";
import { Phone } from "lucide-react";

export default function ReadyToTransform() {
  return (
    <section className="bg-[#EAF6FB] text-center py-16 px-4 space-y-12">
      <div className="inline-block p-3  text-[#195872] rounded-full border shadow-2xl bg-white/45 font-bold text-sm mb-4">
        🟢 Free Consultation Available
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-[#0E4B5A] mb-4">
        Ready to Transform Your Sales Performance?
      </h2>
      <p className="text-[#0E4B5A] max-w-2xl mx-auto mb-8">
        Join hundreds of successful businesses that have already transformed
        their sales teams. Let&apos;s discuss how we can help you achieve your
        goals.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <button className="bg-[#195872] text-white px-6 py-3 rounded-full font-medium flex items-center gap-2">
          <Phone /> Get Free Consultation
        </button>
        <button className="border border-[#195872] text-[#195872] px-6 py-3 rounded-full font-medium flex items-center gap-2 bg-white">
          View Our Programs →
        </button>
      </div>
      <hr className="text-black w-3/4 mx-auto" />
      <div className="flex flex-col md:flex-row justify-center gap-18 mt-4 text-[#195872] font-bold">
        <div>
          <div className="text-3xl">24hrs</div>
          <p className="text-lg">Response Time</p>
        </div>
        <div>
          <div className="text-3xl">No Cost</div>
          <p className="text-lg">Initial Cost</p>
        </div>
        <div>
          <div className="text-3xl">Custom</div>
          <p className="text-lg">Solutions Available</p>
        </div>
      </div>
    </section>
  );
}
