"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import dashboard from "@/public/hero/dashboard.jpg";
import problems from "@/public/hero/problems.png";
import sheets from "@/public/hero/sheets.png";

const heroImages = [dashboard, problems, sheets];
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-28 pb-24">
      {/* Subtle ambient glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-[280px] w-[520px] -translate-x-1/2 rounded-full bg-amber-500/20 blur-[120px] dark:bg-amber-500/10" />

      {/* 🔑 Shared container — EXACT navbar width */}
      <div className="mx-auto w-[95%] max-w-5xl">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* LEFT: Content */}
          <div className="flex flex-col items-start gap-8">
            {/* Badge */}
            <div className=" cursor-pointer inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-300">
              🚀 10,000+ developers learning daily
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
              Master <span className="text-amber-600">Problem Solving</span>{" "}
              <br />
              for Interviews & Beyond
            </h1>

            {/* Subtext */}
            <p className="max-w-xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              A structured platform to learn DSA, sharpen problem-solving
              skills, and prepare confidently for real-world technical
              interviews.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className=" cursor-pointer h-12 bg-amber-600 px-8 text-base font-semibold text-white shadow-md hover:bg-amber-700 active:scale-95"
                >
                  Start Coding
                  <Code2 className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base active:scale-95"
              >
                Browse Problems
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Trust line */}
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
              Trusted by students and engineers preparing for top tech companies
            </p>
          </div>

          {/* RIGHT: Visual placeholder */}

          <div className="hidden lg:flex items-center justify-center">
            <Carousel className="w-full max-w-[420px]">
              <CarouselContent>
                {heroImages.map((src, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <div className="relative h-[280px] w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                      <Image
                        src={src}
                        alt="Platform preview"
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
