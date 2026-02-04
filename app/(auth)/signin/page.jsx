import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
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
        <form className="space-y-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-400">Email</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              className="rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-400">Password</label>
            <input
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
          <Button className="w-full bg-amber-400 text-neutral-900 hover:bg-amber-300">
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
