"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move next
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/images/login.jpg"
          alt="bg"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col justify-between p-8 text-white w-full">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-2">
              Verify your identity
            </h2>
            <p className="text-sm text-gray-200">
              Enter the OTP sent to your email to continue.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#F3F4F6] px-6 py-10">

        <div className="w-full max-w-md text-center">

          {/* Logo */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <Image src="/images/logo.png" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg text-gray-900">
              Mein HerzGeschenk
            </span>
          </div>

          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            Enter OTP
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            We’ve sent a 4-digit code to your email
          </p>

          {/* OTP (4 boxes) */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) inputsRef.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-14 h-14 text-center text-lg rounded-lg bg-gray-200 outline-none"
              />
            ))}
          </div>

          <button className="w-full cursor-pointer bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white py-2.5 rounded-full text-sm font-semibold">
            Verify OTP
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Didn’t receive the code?{" "}
            <button className="text-[#7A1E3A] cursor-pointer font-medium">
              Resend
            </button>
          </p>

          {/* <div className="mt-4">
            <Link href="/login" className="text-xs text-[#7A1E3A] hover:underline">
              ← Back to login
            </Link>
          </div> */}

        </div>
      </div>
    </div>
  );
}