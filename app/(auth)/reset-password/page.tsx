"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/features/auth/components/hooks/services";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { mutate, isPending } = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    mutate(
      { email },
      {
        onSuccess: (response) => {
          localStorage.setItem("reset_email", email);
          toast.success(response.message);
          router.push("/verify-otp");
        },
        onError: (mutationError) => {
          toast.error(mutationError.message);
          setError(mutationError.message);
        },
      }
    );
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
              Recover your account
            </h2>
            <p className="text-sm text-gray-200 max-w-sm">
              Our memories are safe with us. Simply enter your email to securely reset your password and continue your journey.
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

          {/* Heading */}
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            Reset password
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your email and we’ll send you a OTP
          </p>

          {/* Form */}
          <form className="space-y-4 text-left" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
                required
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            {/* Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 cursor-pointer bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white py-2.5 rounded-full text-sm font-semibold"
            >
              {isPending ? "Sending OTP..." : "Send OTP"}
            </button>

            {/* Back to login */}
            <div className="text-center mt-4">
              <Link
                href="/login"
                className="text-xs text-[#7A1E3A] hover:underline"
              >
                ← Back to login
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}