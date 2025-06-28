// app/components/Navbar.tsx
"use client";
import { NavLink } from "@/components/NavLink";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/contact-us");
  };
  return (
    <nav className="shadow-sm max-w-7xl mx-auto px-6 py-4  ">
      <div className="flex justify-between items-center ">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={180}
            height={50}
            className="h-10 w-auto"
          />
        </div>
        <div className="hidden lg:flex ">
          <NavLink href="/" label="Home" />
          <NavLink href="/about" label="About" />
          <NavLink href="/services" label="Services" />
          <NavLink href="/resources" label="Resources" />
          <NavLink href="/contact-us" label="Contact" />
        </div>
        <div className="hidden lg:flex">
          <button
            className="rounded-full w-[230px] bg-[#195872] p-2 text-white"
            onClick={handleOnClick}
          >
            Contact a Sales Expert
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu with Overlay */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 "
            onClick={() => setIsMenuOpen(true)}
            aria-label="Close menu overlay"
          ></div>
          <div className="fixed top-0 right-0 h-[80vh] w-1/2 sm:w-[400px] bg-[#E1F2FE]  shadow-lg transition-transform duration-300 transform translate-x-0">
            <div className="flex justify-end p-4 mr-3 text-[#195872] ">
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col justify-center  space-y-10 px-8 text-lg font-semibold text-[#195872] mx-auto">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/services" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link href="/resources" onClick={() => setIsMenuOpen(false)}>
                Resources
              </Link>
              <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Link href="/privacy-policy" onClick={() => setIsMenuOpen(false)}>
                Privacy Policy
              </Link>
              <Link href="/terms" onClick={() => setIsMenuOpen(false)}>
                Terms of Service
              </Link>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 left-8 text-sm text-gray-500">
              {new Date().getFullYear()} GrowthPartners Inc. All rights
              reserved.
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
