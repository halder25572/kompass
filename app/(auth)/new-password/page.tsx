"use client";

import Image from "next/image";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative">
        <Image
          src="/images/login.jpg"
          alt="bg"
          fill
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-10 text-white w-full">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
          </div>

          {/* Bottom text */}
          <div>
            <h2 className="text-3xl font-bold mb-3">
              Secure your memories.
            </h2>
            <p className="text-sm text-gray-200 max-w-sm">
              Create a strong new password to keep your personal stories and cherished moments safe.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-[#F9FAFB] px-6 py-12">

        <div className="w-full max-w-md">

          {/* Icon */}
          <div className="flex justify-center mb-6 text-[#BF003A] text-xl">
            🔑
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-center text-gray-900 mb-2">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Enter and confirm your new password below
          </p>

          {/* FORM */}
          <form className="space-y-5">

            {/* New Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#BF003A]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1 w-full rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#BF003A]"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] hover:opacity-90 transition text-white py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
            >
              🔑 Update Password
            </button>
          </form>

          {/* BACK */}
          {/* <div className="mt-4 text-center">
            <Link
              href="/login"
              className="text-sm text-[#7A1E3A] hover:underline"
            >
              ← Back to login
            </Link>
          </div> */}

        </div>
      </div>
    </div>
  );
}