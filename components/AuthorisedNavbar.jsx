"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const handleLogout = () => {
  console.log("Logout triggered");
};

const NavItem = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`
        group relative px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-300 ease-out
        ${
          isActive
            ? "text-white bg-white/10 shadow-[0_0_14px_rgba(255,255,255,0.25)] scale-105"
            : "text-neutral-300 hover:text-white hover:bg-white/6 hover:shadow-[0_0_10px_rgba(255,255,255,0.15)]"
        }
      `}
    >
      {/* soft inner glow */}
      <span
        className={`
          absolute inset-0 rounded-full pointer-events-none
          bg-gradient-to-br from-white/15 via-transparent to-white/5
          opacity-0 group-hover:opacity-80 ${isActive ? "opacity-100" : ""}
          transition-opacity duration-300
        `}
      />

      {/* subtle shine */}
      <span
        className={`
          absolute inset-0 rounded-full pointer-events-none overflow-hidden
          before:content-[''] before:absolute before:inset-0
          before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
          before:-translate-x-full group-hover:before:translate-x-full
          before:transition-transform before:duration-[700ms] before:ease-out
        `}
      />

      {label}
    </Link>
  );
};

const AdminNavbar = () => {
  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        h-16 md:h-18
        bg-gradient-to-r from-black via-neutral-900 to-black
        backdrop-blur-xl border-b border-white/10
        shadow-[0_4px_30px_rgba(0,0,0,0.6)]
        flex items-center justify-between
        px-5 sm:px-8 md:px-10 lg:px-12
        select-none
      "
    >
      {/* Logo */}
      <Link href="/admin/dashboard" className="flex items-center gap-3 group">
        <div className="relative">
          <Image
            src="/BaseCaseSidebar.png"
            alt="BaseCase"
            width={38}
            height={38}
            className="transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          />
          <span className="absolute inset-0 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity" />
        </div>
        <span className="text-white font-extrabold tracking-wide text-xl md:text-2xl group-hover:tracking-wider transition-all duration-300">
          BaseCase
        </span>
      </Link>

      {/* Nav */}
      <div className="hidden md:flex items-center gap-3 lg:gap-5">
        <NavItem href="/admin/dashboard" label="Dashboard" />
        <NavItem href="/admin/problems" label="Problems" />
        <NavItem href="/admin/sheets" label="Sheets" />
        <NavItem href="/admin/users" label="Users" />
        <NavItem href="/admin/tickets" label="Reports" />
      </div>

      {/* Profile + Logout */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          href="/admin/profile"
          className="group flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-white/8 transition-all duration-300 hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]"
        >
          <div className="relative">
            <Image
              src="/userProfile.png"
              alt="Admin"
              width={36}
              height={36}
              className="rounded-full ring-2 ring-white/30 ring-offset-2 ring-offset-black transition-all duration-300 group-hover:ring-white/60 group-hover:scale-110"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full border-2 border-black shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
          </div>
          <span className="text-sm font-semibold text-neutral-200 hidden lg:block">Admin</span>
        </Link>

        <button
          onClick={handleLogout}
          className="group relative px-5 py-2 rounded-full text-sm font-semibold
          bg-white/10 text-white border border-white/20
          hover:bg-white/20 hover:border-white/40
          hover:shadow-[0_0_18px_rgba(255,255,255,0.35),inset_0_0_10px_rgba(255,255,255,0.15)]
          transition-all duration-300 active:scale-95 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <span>Logout</span>
          <svg className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;