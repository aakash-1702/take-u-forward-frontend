"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {};
  });
  return (
    <nav
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[95%] max-w-5xl
        h-14 sm:h-16
        rounded-2xl
        bg-neutral-900/40
        backdrop-blur-xl
        border border-neutral-800/60
        shadow-xl shadow-black/20
        px-5 sm:px-6 md:px-8
        flex items-center justify-between
        text-neutral-300
        transition-all duration-300
      `}
    >
      {/* Left: Brand */}
      <div
        className="
          text-lg sm:text-xl font-semibold 
          tracking-tight text-neutral-100 
          cursor-pointer flex items-center gap-1.5
        "
      >
        TakeUForward
        <span className="text-amber-400 font-bold">.</span>
      </div>

      {/* Center: Primary Nav – hidden on mobile, shown on md+ */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
        <a
          href="#"
          className="cursor-pointer hover:text-neutral-100 transition-colors duration-200"
        >
          Problems
        </a>
        <a
          href="#"
          className="cursor-pointer hover:text-neutral-100 transition-colors duration-200"
        >
          Sheets
        </a>
        <a
          href="#"
          className="cursor-pointer hover:text-neutral-100 transition-colors duration-200"
        >
          Contests
        </a>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Theme toggle – can be made functional later */}

        {/* Profile button – using shadcn/ui Button */}
        {!loading &&
          (userExists ? (
            <Button
              size="sm"
              variant="secondary"
              className="w-9 h-9 rounded-full flex items-center justify-center"
            >
              P
            </Button>
          ) : (
            <Link href="/signup">              
              <Button
                size="sm"
                variant="primary"
                className="hover:bg-amber-700 hover:text-neutral-50 text-neutral-700  cursor-pointer bg-amber-600"
              >
                SignUp
              </Button>
            </Link>
          ))}

        {/* Mobile menu button (hamburger) – appears on < md */}
        <button className="md:hidden text-neutral-300 hover:text-neutral-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
