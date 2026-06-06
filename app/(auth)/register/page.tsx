"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRegisterMutation } from "@/features/auth/components/hooks/services";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";

export default function RegisterPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate, isPending } = useRegisterMutation();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const redirectTo = searchParams.get("redirect") || "/";
  const saveCreationFlow = redirectTo !== "/";

  const text = language === "de"
    ? {
      leftTitle: "Erstelle ein persoenliches Geschenk gemeinsam.",
      leftSubtitle: "Schliesse dich tausenden Menschen an, die ihre schoensten Momente in hochwertige gedruckte Buecher verwandelt haben.",
      headerTag: "Erstelle ein wunderschoenes Erinnerungsbuch",
      title: "Konto erstellen",
      subtitle: "Beginne in wenigen Minuten mit deinem Erinnerungsbuch",
      saveCreationSubtitle: "Um deine Erstellung zu speichern und den Prozess abzuschliessen, musst du ein Konto erstellen.",
      fullName: "Vollstaendiger Name",
      email: "E-Mail",
      password: "Passwort",
      signingUp: "Registrierung laeuft...",
      signUp: "Registrieren ->",
      continueWith: "oder weiter mit",
      hasAccount: "Bereits ein Konto?",
      login: "Anmelden",
      saveCreationHasAccount: "Already have an account?",
      saveCreationLogin: "Log in",
    }
    : {
      leftTitle: "Create a personal gift made together.",
      leftSubtitle: "Join thousands of people who’ve turned their favorite moments into beautiful printed books.",
      headerTag: "Create Amazing Memory Book",
      title: "Create your account",
      subtitle: "Start creating memory books in minutes",
      saveCreationSubtitle: "To save your creation and complete the process, you need to make an account.",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      signingUp: "Signing up...",
      signUp: "Sign Up ->",
      continueWith: "or continue with",
      hasAccount: "Already have an account?",
      login: "Log in",
      saveCreationHasAccount: "Already have an account?",
      saveCreationLogin: "Log in",
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    mutate(
      { name, email, password },
      {
        onSuccess: (response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success(response.message);
          router.push(redirectTo);
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
            <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
          </div>

          {/* Bottom Text */}
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-2">
              {text.leftTitle}
            </h2>
            <p className="text-sm text-gray-200 max-w-sm">
              {text.leftSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#F3F4F6] px-6 py-10">

        <div className="w-full max-w-md">

          {/* Header */}
          <p className="text-sm text-[#7A1E3A] mb-2">
             {text.headerTag}
          </p>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {text.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {saveCreationFlow ? text.saveCreationSubtitle : text.subtitle}
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-700">{text.fullName}</label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full mt-1 px-4 py-2.5 rounded-lg bg-gray-200 outline-none text-sm"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-700">{text.email}</label>
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
              <label className="text-sm text-gray-700">{text.password}</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full px-4 py-2.5 pr-10 rounded-lg bg-gray-200 outline-none text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#7A1E3A] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            {/* Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 cursor-pointer bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white py-2.5 rounded-full text-sm font-semibold"
            >
              {isPending ? text.signingUp : text.signUp}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-xs text-gray-400">{text.continueWith}</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <button className="flex-1 bg-white border border-gray-300 py-2 rounded-lg text-sm cursor-pointer">
                <Image src="/google.png" width={18} height={18} alt="google" className="inline mr-2" />
                Google
              </button>
              {/* <button className="flex-1 bg-white border border-gray-300 py-2 rounded-lg text-sm cursor-pointer">
                Apple
              </button> */}
            </div>

            {/* Login */}
            <p className="text-center text-xs text-gray-500 mt-4">
              {saveCreationFlow ? text.saveCreationHasAccount : text.hasAccount}{" "}
              <Link href={saveCreationFlow ? `/login?redirect=${encodeURIComponent(redirectTo)}` : "/login"} className="text-[#7A1E3A] font-medium">
                {saveCreationFlow ? text.saveCreationLogin : text.login}
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}