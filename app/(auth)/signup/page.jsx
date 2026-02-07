"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name || !email || !password) {
      alert("Please Provide complete information");
      return;
    }

    if (name.length < 2 || name.length > 20) {
      alert("Name should be within limits : [2,20]");
      return;
    }

    if (password.length < 6 || password.length > 20) {
      alert("Password shoule be between 6 and 20 characters");
      return;
    }

    if (password != confirmPassword) {
      alert("Password are not matching");
      return;
    }

    const signUpData = {
      name,
      email,
      password,
    };

    try {
      const signUpResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        },
      );

      if (!signUpResponse.ok) {
        const errResponse = await signUpResponse.json();
        alert(errResponse.data || "SignUp Failed due technical error");
        return;
      }

      const response = await signUpResponse.json();
      console.log("SingUp Data", response);

      alert("SignUp Successfull , Click ok for redirecting to login page");
      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    } catch (error) {
      console.log("error while signup", error);
      alert("Please SignUp again");
      return;
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-neutral-100">
            TakeUForward<span className="text-orange-400">.</span>
          </h1>
          <p className="text-sm text-neutral-400 mt-1">Create your account</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit} method="post">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-400">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-400">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="abc@gmail.com"
              className="rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-400">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-400">Confirm Password</label>
            <input
              name="confirmPassword"
              type="text"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-orange-400 py-2 text-sm font-semibold text-neutral-900 hover:bg-orange-300 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link href="/signin">
            <span className="text-orange-400 cursor-pointer hover:underline">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
