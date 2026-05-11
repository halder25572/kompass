"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { toast } from "sonner";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/features/auth/components/hooks/services";
import { useLanguage } from "@/hooks/useLanguage";

export default function VerifyOtpPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const { mutate, isPending } = useVerifyOtpMutation();
  const { mutate: resendMutate, isPending: isResending } = useResendOtpMutation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const text = language === "de"
    ? {
      requestOtpAgain: "Bitte fordere den OTP-Code erneut ueber Passwort zurücksetzen an.",
      incompleteOtp: "Bitte gib den vollstaendigen 4-stelligen OTP-Code ein.",
      leftTitle: "Bestaetige deine Identitaet",
      leftSubtitle: "Gib den OTP-Code aus deiner E-Mail ein, um fortzufahren.",
      title: "OTP eingeben",
      subtitle: "Wir haben einen 4-stelligen Code an deine E-Mail gesendet",
      verifying: "Wird verifiziert...",
      verifyOtp: "OTP bestaetigen",
      didntReceive: "Code nicht erhalten?",
      resending: "Erneut senden...",
      resend: "Erneut senden",
    }
    : {
      requestOtpAgain: "Please request OTP again from reset password.",
      incompleteOtp: "Please enter complete 4-digit OTP.",
      leftTitle: "Verify your identity",
      leftSubtitle: "Enter the OTP sent to your email to continue.",
      title: "Enter OTP",
      subtitle: "We’ve sent a 4-digit code to your email",
      verifying: "Verifying...",
      verifyOtp: "Verify OTP",
      didntReceive: "Didn’t receive the code?",
      resending: "Resending...",
      resend: "Resend",
    };

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

  const handleVerify = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const otpValue = otp.join("");
    const email = localStorage.getItem("reset_email") || "";

    if (!email) {
      const message = text.requestOtpAgain;
      toast.error(message);
      setError(message);
      return;
    }

    if (otpValue.length !== 4) {
      const message = text.incompleteOtp;
      toast.error(message);
      setError(message);
      return;
    }

    mutate(
      { email, otp: otpValue },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          localStorage.setItem("reset_otp_verified", "true");
          router.push("/new-password");
        },
        onError: (mutationError) => {
          toast.error(mutationError.message);
          setError(mutationError.message);
        },
      }
    );
  };

  const handleResend = () => {
    setError("");

    const email = localStorage.getItem("reset_email") || "";

    if (!email) {
      const message = text.requestOtpAgain;
      toast.error(message);
      setError(message);
      return;
    }

    resendMutate(
      { email },
      {
        onSuccess: (response) => {
          toast.success(response.message);
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

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col justify-between p-8 text-white w-full">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg">Mein HerzGeschenk</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-2">
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

        <div className="w-full max-w-md text-center">

          {/* Logo */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <Image src="/images/logo.jpg" width={28} height={28} alt="logo" />
            <span className="font-semibold text-lg text-gray-900">
              Mein HerzGeschenk
            </span>
          </div>

          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            {text.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {text.subtitle}
          </p>

          <form onSubmit={handleVerify}>
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

            {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={isPending}
              className="w-full cursor-pointer bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white py-2.5 rounded-full text-sm font-semibold"
            >
              {isPending ? text.verifying : text.verifyOtp}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            {text.didntReceive}{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-[#7A1E3A] cursor-pointer font-medium disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isResending ? text.resending : text.resend}
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