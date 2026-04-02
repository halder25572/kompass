"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const DEMO_USER = {
  id: "demo-user-1",
  name: "Demo User",
  email: "demo@memorybook.com",
  password: "Demo@1234",
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState(DEMO_USER.email);
  const [password, setPassword] = useState(DEMO_USER.password);
  const [error, setError] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim().toLowerCase() !== DEMO_USER.email || password !== DEMO_USER.password) {
      setError("Use the demo credentials to log in.");
      return;
    }

    login({
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/images/login.jpg" // replace with your image
          alt="bg"
          fill
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-8 text-white w-full">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
          </div>

          {/* Bottom Text */}
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-2">
              Continue creating your personal gift.
            </h2>
            <p className="text-sm text-gray-200">
              Sign in to continue your book.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#F3F4F6] px-6 py-10">

        <div className="w-full max-w-md">

          {/* Welcome */}
          <p className="text-sm text-[#7A1E3A] mb-2">✦ Welcome back</p>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Log in to your account
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Pick up where you left off
          </p>

          <div className="mb-5 rounded-xl border border-[#e8d7dd] bg-[#fff7f9] px-4 py-3 text-sm text-[#5f1b31]">
            <p className="font-semibold">Demo user</p>
            <p>Email: {DEMO_USER.email}</p>
            <p>Password: {DEMO_USER.password}</p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
              />

              <div className="text-right mt-1">
                <Link href="/reset-password" className="text-xs text-[#7A1E3A] hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-2 cursor-pointer bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white py-2.5 rounded-full text-sm font-semibold"
            >
              Log In →
            </button>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="button"
              onClick={() => {
                setEmail(DEMO_USER.email);
                setPassword(DEMO_USER.password);
                setError("");
                login({
                  id: DEMO_USER.id,
                  name: DEMO_USER.name,
                  email: DEMO_USER.email,
                });
                router.push("/");
              }}
              className="w-full cursor-pointer border border-[#7A1E3A] text-[#7A1E3A] py-2.5 rounded-full text-sm font-semibold hover:bg-[#fff7f9] transition-colors"
            >
              Use Demo Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <button className="flex-1 bg-white border border-gray-300 py-2 rounded-lg text-sm cursor-pointer">
                Google
              </button>
              <button className="flex-1 bg-white border border-gray-300 py-2 rounded-lg text-sm cursor-pointer">
                Apple
              </button>
            </div>

            {/* Signup */}
            <p className="text-center text-xs text-gray-500 mt-4">
              Don’t have an account?{' '}
              <Link href="/register" className="text-[#7A1E3A] font-medium">
                Sign up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}