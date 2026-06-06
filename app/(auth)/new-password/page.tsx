"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/features/auth/components/hooks/services";
import { useLanguage } from "@/hooks/useLanguage";

export default function ResetPasswordPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const { mutate, isPending } = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const text = language === "de"
    ? {
      requestOtpAgain: "Bitte fordere den OTP-Code erneut ueber Passwort zurücksetzen an.",
      passwordMismatch: "Passwort und Passwortbestaetigung stimmen nicht ueberein.",
      leftTitle: "Sichere deine Erinnerungen.",
      leftSubtitle: "Erstelle ein starkes neues Passwort, um deine persoenlichen Geschichten und wertvollen Momente zu schuetzen.",
      title: "Passwort zuruecksetzen",
      subtitle: "Gib unten dein neues Passwort ein und bestaetige es",
      newPassword: "Neues Passwort",
      newPasswordPlaceholder: "Neues Passwort eingeben",
      confirmPassword: "Neues Passwort bestaetigen",
      confirmPasswordPlaceholder: "Neues Passwort bestaetigen",
      updating: "Wird aktualisiert...",
      updatePassword: "Schluessel Passwort aktualisieren",
    }
    : {
      requestOtpAgain: "Please request OTP again from reset password.",
      passwordMismatch: "Password and confirm password do not match.",
      leftTitle: "Secure your memories.",
      leftSubtitle: "Create a strong new password to keep your personal stories and cherished moments safe.",
      title: "Reset Your Password",
      subtitle: "Enter and confirm your new password below",
      newPassword: "New Password",
      newPasswordPlaceholder: "Enter new password",
      confirmPassword: "Confirm New Password",
      confirmPasswordPlaceholder: "Confirm new password",
      updating: "Updating...",
      updatePassword: "Update Password",
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const email = localStorage.getItem("reset_email") || "";

    if (!email) {
      const message = text.requestOtpAgain;
      toast.error(message);
      setError(message);
      return;
    }

    if (password !== confirm) {
      const message = text.passwordMismatch;
      toast.error(message);
      setError(message);
      return;
    }

    mutate(
      {
        email,
        password,
        password_confirmation: confirm,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          localStorage.removeItem("reset_email");
          localStorage.removeItem("reset_otp_verified");
          router.push("/login");
        },
        onError: (mutationError) => {
          toast.error(mutationError.message);
          setError(mutationError.message);
        },
      }
    );
  };

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
            <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
          </div>

          {/* Bottom text */}
          <div>
            <h2 className="text-3xl font-bold mb-3">
              {text.leftTitle}
            </h2>
            <p className="text-sm text-gray-200 max-w-sm">
              {text.leftSubtitle}
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
            {text.title}
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            {text.subtitle}
          </p>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* New Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                {text.newPassword}
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={text.newPasswordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md px-4 py-2 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-[#BF003A]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#BF003A] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                {text.confirmPassword}
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder={text.confirmPasswordPlaceholder}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full rounded-md px-4 py-2 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-[#BF003A]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#BF003A] transition-colors"
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full cursor-pointer bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] hover:opacity-90 transition text-white py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
            >
              {isPending ? text.updating : `🔑 ${text.updatePassword}`}
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