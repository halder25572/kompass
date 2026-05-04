/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { type FC, type ReactNode, useEffect, useRef } from "react";
import {
  Home,
  Phone,
  FileText,
  Users,
  ExternalLink,
  Loader,
} from "lucide-react";
import gsap from "gsap";
import { useLegalInformationQuery } from "@/features/legal-info/hooks/services";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  animRef?: React.RefObject<HTMLDivElement | null>;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const Divider = () => <hr className="border-t border-gray-100 my-3" />;

const MetaLabel = ({ children }: { children: ReactNode }) => (
  <p className="text-[12px] uppercase tracking-[0.14em] text-gray-400 font-bold mb-1">
    {children}
  </p>
);

const Card: FC<CardProps> = ({ icon, title, children, animRef }) => (
  <div
    ref={animRef}
    className="bg-white border border-[#7A1E3A] rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
  >
    <div className="text-rose-800 mb-4 w-8 h-8">{icon}</div>
    <p className="text-[20px] font-bold text-gray-900 mb-3">{title}</p>
    {children}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const ImprintLegalNotice: FC = () => {
  const headerRef  = useRef<HTMLDivElement>(null);
  const card1Ref   = useRef<HTMLDivElement>(null);
  const card2Ref   = useRef<HTMLDivElement>(null);
  const card3Ref   = useRef<HTMLDivElement>(null);
  const card4Ref   = useRef<HTMLDivElement>(null);
  const euRef      = useRef<HTMLDivElement>(null);

  const { data: legalData, isLoading, error } = useLegalInformationQuery();

  useEffect(() => {
    if (!legalData?.data) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const headerEls = Array.from(headerRef.current?.children ?? []);
    const cards     = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];

    /* initial states */
    gsap.set(headerEls,     { opacity: 0, y: 30 });
    gsap.set(cards,         { opacity: 0, y: 40, scale: 0.97 });
    gsap.set(euRef.current, { opacity: 0, y: 30 });

    /* entrance */
    tl.to(headerEls, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12 })
      .to(cards,      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 }, "-=0.3")
      .to(euRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
  }, [legalData?.data]);

  /* card hover */
  const onCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -5, boxShadow: "0 12px 32px rgba(122,30,58,0.12)", duration: 0.22, ease: "power2.out" });
  };
  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, boxShadow: "none", duration: 0.22, ease: "power2.inOut" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        backgroundImage: "url('/images/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-[#7A1E3A] animate-spin" />
          <p className="text-gray-600">Loading legal information...</p>
        </div>
      </div>
    );
  }

  if (error || !legalData?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        backgroundImage: "url('/images/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className="text-center">
          <p className="text-red-600 font-medium mb-2">Failed to load legal information</p>
          <p className="text-gray-600 text-sm">{error?.message || "Please try again later"}</p>
        </div>
      </div>
    );
  }

  const companyDetails = legalData.data.company_details;
  const contactInfo = legalData.data.contact_information;
  const registrationTax = legalData.data.registration_tax;
  const editorialResponsibility = legalData.data.editorial_responsibility;

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundImage: "url('/images/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div ref={headerRef} className="text-center pt-12 pb-2 px-4">
        <span className="text-[13px] uppercase tracking-[0.18em] text-[#7A1E3A] font-semibold block mb-3">
          Legal Information
        </span>
        <h1 className="font-serif text-3xl sm:text-[44px] font-bold text-gray-900 tracking-tight leading-tight mb-3">
          Imprint &amp; Legal Notice
        </h1>
        <p className="text-[18px] text-[#9CA3AF] font-light mx-auto leading-relaxed">
          Information in accordance with{" "}
          <em>§ 5 TMG</em> and <em>§ 18 MStV</em>
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

          {/* Company Details */}
          <div
            ref={card1Ref}
            onMouseEnter={onCardEnter}
            onMouseLeave={onCardLeave}
            className="bg-white border border-[#7A1E3A] rounded-2xl p-6 transition-all duration-200"
          >
            <div className="text-rose-800 mb-4 w-8 h-8"><Home size={20} strokeWidth={1.5} /></div>
            <p className="text-[20px] font-bold text-gray-900 mb-3">Company Details</p>
            <p className="font-serif text-[16px] font-bold text-gray-900 mb-1">
              {companyDetails.company_name}
            </p>
            <div className="text-[16px] text-black font-light leading-relaxed">
              <p>{companyDetails.street_address}</p>
              <p>{companyDetails.postal_code} {companyDetails.city}</p>
              <p>{companyDetails.country}</p>
            </div>
            <Divider />
            <MetaLabel>Represented by</MetaLabel>
            <p className="text-[15px] text-black">
              {companyDetails.represented_by_name} ({companyDetails.represented_by_position})
            </p>
          </div>

          {/* Contact Information */}
          <div
            ref={card2Ref}
            onMouseEnter={onCardEnter}
            onMouseLeave={onCardLeave}
            className="bg-white border border-[#7A1E3A] rounded-2xl p-6 transition-all duration-200"
          >
            <div className="text-rose-800 mb-4 w-8 h-8"><Phone size={20} strokeWidth={1.5} /></div>
            <p className="text-[20px] font-bold text-gray-900 mb-3">Contact Information</p>
            <div className="space-y-2.5">
              {[
                { label: "Phone:",   value: contactInfo.phone,    href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
                { label: "Email:",   value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                ...(contactInfo.website ? [{ label: "Website:", value: contactInfo.website, href: `https://${contactInfo.website}` }] : []),
              ].map(({ label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-[16px] font-medium text-[#9CA3AF] min-w-11.5 pt-px">{label}</span>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-[15px] text-[#7A1E3A] hover:underline underline-offset-2 break-all"
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Registration & Tax */}
          <div
            ref={card3Ref}
            onMouseEnter={onCardEnter}
            onMouseLeave={onCardLeave}
            className="bg-white border border-[#7A1E3A] rounded-2xl p-6 transition-all duration-200"
          >
            <div className="text-rose-800 mb-4 w-8 h-8"><FileText size={20} strokeWidth={1.5} /></div>
            <p className="text-[20px] font-bold text-gray-900 mb-3">Registration &amp; Tax</p>
            <MetaLabel>Commercial Register</MetaLabel>
            <p className="text-[15px] text-[#9CA3AF] mb-1">
              {registrationTax.register_court}
            </p>
            <p className="text-[15px] text-[#9CA3AF] mb-3">
              Registration No.{" "}
              <span className="font-medium text-gray-800">{registrationTax.registration_number}</span>
            </p>
            <Divider />
            <MetaLabel>VAT ID (according to § 27a UStG)</MetaLabel>
            <p className="text-[16px] font-medium text-gray-800 tracking-wide">
              {registrationTax.vat_number}
            </p>
          </div>

          {/* Editorial Responsibility */}
          <div
            ref={card4Ref}
            onMouseEnter={onCardEnter}
            onMouseLeave={onCardLeave}
            className="bg-white border border-[#7A1E3A] rounded-2xl p-6 transition-all duration-200"
          >
            <div className="text-rose-800 mb-4 w-8 h-8"><Users size={20} strokeWidth={1.5} /></div>
            <p className="text-[20px] font-bold text-gray-900 mb-3">Editorial Responsibility</p>
            <MetaLabel>Responsible according to § 18 MStV</MetaLabel>
            <p className="font-serif text-[16px] font-semibold text-gray-900 mb-1">
              {editorialResponsibility.responsible_person_name}
            </p>
            <div className="text-[15px] text-gray-500 font-light leading-relaxed">
              <p>{editorialResponsibility.responsible_company_name}</p>
              <p>{editorialResponsibility.responsible_address}</p>
              <p>{editorialResponsibility.responsible_postal_code} {editorialResponsibility.responsible_city}</p>
            </div>
          </div>
        </div>

        {/* EU Dispute Resolution */}
        <div
          ref={euRef}
          onMouseEnter={onCardEnter}
          onMouseLeave={onCardLeave}
          className="bg-white border mt-16 border-[#7A1E3A] rounded-2xl px-6 py-5 transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <ExternalLink size={14} strokeWidth={1.5} className="text-rose-800" />
            <p className="text-[20px] font-bold text-gray-900">EU Dispute Resolution</p>
          </div>
          <p className="text-[15px] text-[#9CA3AF] font-light leading-relaxed max-w-2xl">
            The European Commission provides a platform for online dispute resolution (OS):{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noreferrer"
              className="text-[#7A1E3A] border-b border-[rgba(122,30,58,0.5)] hover:border-rose-600 transition-colors"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . Please find our email in the contact information above. We are not willing or
            obligated to participate in dispute resolution proceedings before a consumer
            arbitration board.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImprintLegalNotice;