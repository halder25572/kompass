import Link from "next/link";

const summarySteps = [
  {
    title: "Create Your Project",
    description: "Choose occasion, add recipient details, and pick your theme and cover.",
  },
  {
    title: "Invite Contributors",
    description: "Share the invite link so friends and family can add messages and photos.",
  },
  {
    title: "Review & Order",
    description: "Preview everything, approve the design, and place your print order.",
  },
];

export default function HowItWorksSummary() {
  return (
    <section className="bg-[#EEE] py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[28px] sm:text-[36px] font-extrabold text-[#1A1A2E]">How It Works</h2>
          <p className="mt-2 text-[14px] text-[#9CA3AF]">Quick overview in 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summarySteps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
              <div className="w-8 h-8 rounded-full bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-[13px] font-bold flex items-center justify-center mb-3">
                {index + 1}
              </div>
              <h3 className="text-[16px] font-bold text-[#1A1A2E]">{step.title}</h3>
              <p className="mt-1.5 text-[13px] text-[#6B7280] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[13px] font-semibold text-white no-underline"
            style={{ background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)" }}
          >
            View Full How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
