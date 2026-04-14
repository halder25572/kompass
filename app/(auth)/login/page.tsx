"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "@/features/auth/components/hooks/services";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";

const DEMO_EMAIL = "demo.user.1776117353767@mailinator.com";
const DEMO_PASSWORD = "Demo@12345";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { mutate, isPending } = useLoginMutation();
  const { mutate: googleMutate, isPending: isGooglePending } = useGoogleLoginMutation();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");

  const saveSessionAndRedirect = (apiUser: { id: number; name: string; email: string }, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(apiUser));
    login({
      id: String(apiUser.id),
      name: apiUser.name,
      email: apiUser.email,
    });
    router.push("/");
  };

  const loginWithGoogle = useGoogleLogin({
    flow: "implicit",
    scope: "openid profile email",
    onSuccess: (tokenResponse) => {
      googleMutate(
        { token: tokenResponse.access_token },
        {
          onSuccess: (response) => {
            const apiUser = response.data.user;
            const apiToken = response.data.access_token || response.data.token;

            if (!apiToken) {
              const message = "Google login succeeded but token is missing in response.";
              toast.error(message);
              setError(message);
              return;
            }

            toast.success(response.message);
            saveSessionAndRedirect(apiUser, apiToken);
          },
          onError: (mutationError) => {
            toast.error(mutationError.message);
            setError(mutationError.message);
          },
        }
      );
    },
    onError: () => {
      const message = "Google sign-in was cancelled or failed.";
      toast.error(message);
      setError(message);
    },
  });

  const handleGoogleLogin = () => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      const message = "Set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env to enable Google login.";
      toast.error(message);
      setError(message);
      return;
    }

    setError("");
    loginWithGoogle();
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    mutate(
      { email, password },
      {
        onSuccess: (response) => {
          const apiUser = response.data.user;
          toast.success(response.message);
          saveSessionAndRedirect(apiUser, response.data.access_token);
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

          <div className="mb-4 rounded-lg border border-[#E8B9C8] bg-[#FFF4F7] px-3 py-2">
            <p className="text-xs text-[#7A1E3A]">Demo login</p>
            <p className="text-xs text-gray-700">Email: {DEMO_EMAIL}</p>
            <p className="text-xs text-gray-700">Password: {DEMO_PASSWORD}</p>
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
                required
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
                required
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
              disabled={isPending}
              className="w-full mt-2 cursor-pointer bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white py-2.5 rounded-full text-sm font-semibold"
            >
              {isPending ? "Logging in..." : "Log In →"}
            </button>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGooglePending}
                className="flex-1 bg-white border border-gray-300 py-2 rounded-lg text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGooglePending ? "Signing in..." : "Google"}
              </button>
              <button type="button" className="flex-1 bg-white border border-gray-300 py-2 rounded-lg text-sm cursor-pointer">
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