// components/NavLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavLinkProps = {
  href: string;
  label: string;
};

export const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "relative py-2 px-4 font-bold transition duration-300",
        isActive
          ? "text-[#02A1C7] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-[#02A1C7] after:transition after:duration-300"
          : "text-[#195872] hover:text-[#02A1C7]"
      )}
    >
      {label}
    </Link>
  );
};
