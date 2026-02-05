"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/StatCard";

const statsData = [
  {
    value : "50K+",
    label : "Problems Solved"
  },{
    value : "10K+",
    label : "Active Developers"
  },{
    value : "50+",
    label : "Famous  and Community Driven Sheets"
  }
];

const Footer = () => {
  return (
    <footer className="pb-16">
      {/* ---------- STATS ---------- */}
      <div className="mx-auto w-[95%] max-w-5xl pt-8">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {
                statsData.map((stat,index) => (
                    <StatCard key={index} value={stat.value} label={stat.label} />
                ))
            }
        </div>
      </div>

      {/* ---------- CTA ---------- */}
      <div className="mt-16">
        <div className="mx-auto w-[95%] max-w-5xl rounded-2xl bg-neutral-100 px-8 py-14 text-center dark:bg-neutral-900/60">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
            Ready to Crack Your Next Interview?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-neutral-600 dark:text-neutral-400">
            Structured DSA preparation, real interview problems and progress
            tracking — all in one place.
          </p>

          <div className="mt-8">
            <Link href="/signup">
               <Button
              size="lg"
              className=" cursor-pointer h-12 bg-amber-600 px-8 text-base font-semibold text-white hover:bg-amber-700 active:scale-95"
            >
              Start Practicing Now
            </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- LINKS ---------- */}
      <div className="mt-16">
        <div className="mx-auto w-[95%] max-w-5xl flex flex-col items-center justify-between gap-6 text-sm text-neutral-500 md:flex-row">
          <div className="font-semibold text-neutral-800 dark:text-neutral-300">
            TakeUForward<span className="text-amber-400">.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#">Problems</Link>
            <Link href="#">Sheets</Link>
            <Link href="#">Contests</Link>
            <Link href="#">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#">
              <Github className="h-5 w-5 hover:text-neutral-900 dark:hover:text-white" />
            </Link>
            <Link href="#">
              <Linkedin className="h-5 w-5 hover:text-neutral-900 dark:hover:text-white" />
            </Link>
            <Link href="#">
              <Twitter className="h-5 w-5 hover:text-neutral-900 dark:hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
