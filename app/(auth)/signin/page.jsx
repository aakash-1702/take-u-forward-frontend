  "use client";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
  import React, { use, useEffect, useState } from "react";
  import { useRouter } from "next/navigation";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  export default function SignInPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
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
      const email = formData.email;
      const password = formData.password;
      const signUpData = {
        email: formData.email,
        password: formData.password,
      };
      if (!email || !password) {
        alert("Please provide the complete information");
        return;
      }

      if (!emailRegex.test(email)) {
        alert("Invalid Email Format provided");
        return;
      }

      try {
        console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
        const logInResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
          {
            method: "POST",
            body: JSON.stringify(signUpData),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!logInResponse.ok) {
          const errorRes = await logInResponse.json();
          alert(errorRes?.message || "Unable to login");
          return;
        }
        const response = await logInResponse.json();
        const userRole = response.data;

        alert("LoggedIn Successfully, click ok for redirecting to dashboard");
        setTimeout(() => {
          if (userRole === "USER") {
            router.push("/dashboard");
          } else if (userRole === "ADMIN") {
            router.push("/admin/dashboard");
          }
        }, 1200);
        return;
      } catch (error) {
        console.log("Error from catch", error);
        alert("Unable to login at the moement");
        return;
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-neutral-100">
              TakeUForward<span className="text-amber-400">.</span>
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" method="post" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-neutral-400">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="abc@gmail.com"
                className="rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-neutral-400">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
                className="rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-amber-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <Button
              className="w-full bg-amber-400 text-neutral-900 hover:bg-amber-300"
              type="submit"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-neutral-400">
            Don’t have an account?{" "}
            <Link href="signup">
              <span className="text-amber-400 cursor-pointer hover:underline">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </div>
    );
  }
