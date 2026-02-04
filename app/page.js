"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div
      className=" flex flex-col 
        pt-4 min-h-screen
        bg-linear-to-br
        from-neutral-100 via-neutral-50 to-neutral-100
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        text-neutral-800 dark:text-neutral-300
        transition-colors duration-300
      "
    >
      <Navbar />

      <Hero />

      <Footer />

    </div>
  );
}
