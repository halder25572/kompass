import type { FC, ReactNode } from "react";
import {
  Home,
  Phone,
  FileText,
  Users,
  ExternalLink,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const Divider = () => <hr className="border-t border-gray-100 my-3" />;

const MetaLabel = ({ children }: { children: ReactNode }) => (
  <p className="text-[12px] uppercase tracking-[0.14em] text-gray-400 font-bold mb-1">
    {children}
  </p>
);

const Card: FC<CardProps> = ({ icon, title, children }) => (
  <div className="bg-white border border-[#7A1E3A] rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className="text-rose-800 mb-4 w-8 h-8">{icon}</div>
    <p className="text-[20px] font-bold text-gray-900 mb-3">{title}</p>
    {children}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const ImprintLegalNotice: FC = () => {
  return (
    <div className="min-h-screen font-sans"       style={{
        backgroundImage: "url('/images/bg1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Header */}
      <div className="text-center pt-12 pb-2 px-4">
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
          <Card
            icon={<Home size={20} strokeWidth={1.5} />}
            title="Company Details"
          >
            <p className="font-serif text-[16px] font-bold text-gray-900 mb-1">
              Mein HerzGeschenk
            </p>
            <div className="text-[16px] text-black font-light leading-relaxed">
              <p>Musterstraße 123</p>
              <p>10115 Berlin</p>
              <p>Germany</p>
            </div>
            <Divider />
            <MetaLabel>Represented by</MetaLabel>
            <p className="text-[15px] text-black">Jane Doe (Managing Director)</p>
          </Card>

          {/* Contact Information */}
          <Card
            icon={<Phone size={20} strokeWidth={1.5} />}
            title="Contact Information"
          >
            <div className="space-y-2.5">
              {[
                { label: "Phone:", value: "+49 (0) 30 1234 5678", href: "tel:+4930123456789" },
                { label: "Email:", value: "hello@memora-moments.de", href: "mailto:hello@memora-moments.de" },
                { label: "Website:", value: "www.memora-moments.de", href: "https://www.memora-moments.de" },
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
          </Card>

          {/* Registration & Tax */}
          <Card
            icon={<FileText size={20} strokeWidth={1.5} />}
            title="Registration &amp; Tax"
          >
            <MetaLabel>Commercial Register</MetaLabel>
            <p className="text-[15px] text-[#9CA3AF] mb-1">
              Amtsgericht Berlin (Charlottenburg)
            </p>
            <p className="text-[15px] text-[#9CA3AF] mb-3">
              Registration No.{" "}
              <span className="font-medium text-gray-800">HRB 123456 B</span>
            </p>
            <Divider />
            <MetaLabel>VAT ID (according to § 27a UStG)</MetaLabel>
            <p className="text-[16px] font-medium text-gray-800 tracking-wide">
              DE 999 999 999
            </p>
          </Card>

          {/* Editorial Responsibility */}
          <Card
            icon={<Users size={20} strokeWidth={1.5} />}
            title="Editorial Responsibility"
          >
            <MetaLabel>Responsible according to § 18 MStV</MetaLabel>
            <p className="font-serif text-[16px] font-semibold text-gray-900 mb-1">
              Jane Doe
            </p>
            <div className="text-[15px] text-gray-500 font-light leading-relaxed">
              <p>Memora Moments GmbH</p>
              <p>Musterstraße 123</p>
              <p>10115 Berlin</p>
            </div>
          </Card>
        </div>

        {/* EU Dispute Resolution */}
        <div className="bg-white border mt-16 border-[#7A1E3A] rounded-2xl px-6 py-5 hover:shadow-md transition-all duration-200">
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