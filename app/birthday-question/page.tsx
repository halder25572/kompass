/* eslint-disable @typescript-eslint/no-unused-vars */


// const BirthdayPage = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default BirthdayPage;


"use client";

import IntroStep from "@/components/questionnaire/IntroStep";
import QuestionnaireStep from "@/components/questionnaire/QuestionnaireStep";
import { useState } from "react";


type Step = "intro" | "questionnaire";

export default function ContributorPage() {
  const [step, setStep]         = useState<Step>("intro");
  const [userName, setUserName] = useState("");

  const handleIntro = (name: string, _email: string) => {
    setUserName(name);
    setStep("questionnaire");
  };

  if (step === "intro") return <IntroStep onContinue={handleIntro} />;
  return <QuestionnaireStep name={userName} />;
}