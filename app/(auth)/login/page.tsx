"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "@/features/auth/components/hooks/services";
import { toast } from "sonner";
import { signIn } from "next-auth/react";



export default function LoginPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { mutate, isPending } = useLoginMutation();
  const {isPending: isGooglePending } = useGoogleLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const redirectTo = searchParams.get("redirect") || "/";

  const text = language === "de"
    ? {
      leftTitle: "Erstelle dein persoenliches Geschenk weiter.",
      leftSubtitle: "Melde dich an, um dein Buch fortzusetzen.",
      welcome: "Willkommen zurueck",
      title: "Melde dich in deinem Konto an",
      subtitle: "Mach dort weiter, wo du aufgehort hast",
      email: "E-Mail",
      emailPlaceholder: "jane@example.com",
      password: "Passwort",
      forgotPassword: "Passwort vergessen?",
      loggingIn: "Anmeldung laeuft...",
      login: "Anmelden ->",
      continueWith: "oder weiter mit",
      signingIn: "Anmeldung...",
      noAccount: "Noch kein Konto?",
      signUp: "Registrieren",
    }
    : {
      leftTitle: "Continue creating your personal gift.",
      leftSubtitle: "Sign in to continue your book.",
      welcome: "Welcome back",
      title: "Log in to your account",
      subtitle: "Pick up where you left off",
      email: "Email",
      emailPlaceholder: "jane@example.com",
      password: "Password",
      forgotPassword: "Forgot password?",
      loggingIn: "Logging in...",
      login: "Log In ->",
      continueWith: "or continue with",
      signingIn: "Signing in...",
      noAccount: "Don’t have an account?",
      signUp: "Sign up",
    };

  const saveSessionAndRedirect = (apiUser: { id: number; name: string; email: string }, token: string) => {
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("auth-token-updated"));
    localStorage.setItem("user", JSON.stringify(apiUser));
    login({
      id: String(apiUser.id),
      name: apiUser.name,
      email: apiUser.email,
    });
    router.push(redirectTo);
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
            <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
          </div>

          {/* Bottom Text */}
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-2">
              {text.leftTitle}
            </h2>
            <p className="text-sm text-gray-200">
              {text.leftSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#F3F4F6] px-6 py-10">

        <div className="w-full max-w-md">

          {/* Welcome */}
          <p className="text-sm text-[#7A1E3A] mb-2"> {text.welcome}</p>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {text.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {text.subtitle}
          </p>



          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700">{text.email}</label>
              <input
                type="email"
                placeholder={text.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
                autoComplete="email"
                spellCheck={false}
                suppressHydrationWarning
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-700">{text.password}</label>
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
                  {text.forgotPassword}
                </Link>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 cursor-pointer bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white py-2.5 rounded-full text-sm font-semibold"
            >
              {isPending ? text.loggingIn : text.login}
            </button>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-xs text-gray-400">{text.continueWith}</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: redirectTo })}
                disabled={isGooglePending}
                className="flex-1 bg-white border border-gray-300 py-2 rounded-lg text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Image src="/google.png" width={18} height={18} alt="google" className="inline mr-2" />
                {isGooglePending ? text.signingIn : "Google"}
              </button>
              {/* <button type="button" className="flex-1 bg-white border border-gray-300 py-2 rounded-lg text-sm cursor-pointer">
                Apple
              </button> */}
            </div>

            {/* Signup */}
            <p className="text-center text-xs text-gray-500 mt-4">
              {text.noAccount}{' '}
              <Link href={redirectTo !== "/" ? `/register?redirect=${encodeURIComponent(redirectTo)}` : "/register"} className="text-[#7A1E3A] font-medium">
                {text.signUp}
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}