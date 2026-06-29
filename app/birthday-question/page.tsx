"use client";

import IntroStep from "@/components/questionnaire/IntroStep";
import QuestionnaireStep from "@/components/questionnaire/QuestionnaireStep";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCheckInMutation, useInviteDetailsQuery } from "@/features/contribute/hooks/services";


type Step = "intro" | "questionnaire";

export default function ContributorPage() {
  const [step, setStep]         = useState<Step>("intro");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [checkInError, setCheckInError] = useState<string>("");
  const [hasAttemptedCheckIn, setHasAttemptedCheckIn] = useState(false);
  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const { data: inviteDetails, isLoading: isInviteLoading, isError: isInviteError } = useInviteDetailsQuery(code);
  const { mutateAsync: checkIn, isPending: isCheckInPending } = useCheckInMutation();
  const [inviterId, setInviterId] = useState<string | number>("");

  const hasInviteData = Boolean(inviteDetails?.data);
  const bookId = inviteDetails?.data?.book_id ? String(inviteDetails.data.book_id) : undefined;
  const recipientName = inviteDetails?.data?.recipient_name ?? undefined;
  const inviteQuestions = inviteDetails?.data?.questions ?? [];

  const handleIntro = async (name: string, email: string) => {
    if (!code) {
      setHasAttemptedCheckIn(true);
      setCheckInError("Invalid or missing invite code.");
      return;
    }

    setUserName(name);
    setUserEmail(email);
    setCheckInError("");
    setHasAttemptedCheckIn(true);

    try {
      console.log("birthday-question check-in start:", { code });
      const response = await checkIn({ code, name, email });
      console.log("birthday-question check-in response:", response);

      if (!response.data?.inviter_id) {
        throw new Error("Check-in did not return inviter information.");
      }

      const resolvedInviterId = response.data.inviter_id;
      const alreadySubmitted = response.data.is_already_submitted === true;

      setInviterId(resolvedInviterId);
      setIsAlreadySubmitted(alreadySubmitted);
      setStep("questionnaire");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Check-in failed. Please try again.";
      console.error("Check-in failed:", message);
      setCheckInError(message);
    }
  };

  if (isInviteLoading) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Loading contribution details...</div>;
  }

  if (!code) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-red-600">Invalid or missing invite code.</div>;
  }

  if (isInviteError && !hasInviteData) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-red-600">Unable to load invite details.</div>;
  }

  if (step === "intro" && isCheckInPending) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Loading check-in details...</div>;
  }

  if (step === "intro") return <IntroStep onContinue={handleIntro} recipientName={recipientName} isSubmitting={isCheckInPending} errorMessage={hasAttemptedCheckIn ? checkInError || undefined : undefined} />;

  if (step === "questionnaire" && !inviterId) {
    if (checkInError) {
      return <div className="min-h-screen flex items-center justify-center text-sm text-red-600">{checkInError}</div>;
    }

    if (isCheckInPending) {
      return <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Loading contribution details...</div>;
    }

    return <div className="min-h-screen flex items-center justify-center text-sm text-red-600">Unable to load check-in details.</div>;
  }

  return <QuestionnaireStep inviterId={inviterId} name={userName} email={userEmail} bookId={bookId} questions={inviteQuestions} bookTitle={inviteDetails?.data?.book_title} recipientName={recipientName} occasion={inviteDetails?.data?.occasion ?? undefined} isAlreadySubmitted={isAlreadySubmitted} code={code!} />;
}