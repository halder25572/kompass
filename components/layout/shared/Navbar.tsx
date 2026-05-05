/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { useUserProfileQuery } from "@/features/auth/components/hooks/services";
import Image from "next/image";
import { LayoutGrid, Settings2, KeyRound, LogOut, X, Menu } from "lucide-react";
import { toast } from "sonner";
import { updateLanguageUser } from "@/services/api";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLanguageUpdating, setIsLanguageUpdating] = useState(false);
  const pathname = usePathname();
  const { language: lang, setLanguage } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const { data: profileData } = useUserProfileQuery();
  const profileUser = profileData?.data.user;
  const displayName = profileUser?.name || user?.name || "Profile";
  const displayEmail = profileUser?.email || user?.email || "";
  const displayAvatar = profileUser?.avatar || user?.avatar || "";

  const labels = {
    en: {
      home: "Home",
      howItWorks: "How it Works",
      sampleThemes: "Sample Themes and Covers",
      sampleBooks: "Sample Books",
      pricing: "Pricing & Delivery",
      login: "Login",
      createBook: "Create Book",
      dashboard: "Dashboard",
      profileSettings: "Profile Settings",
      changePassword: "Change Password",
      logout: "Logout",
    },
    de: {
      home: "Startseite",
      howItWorks: "So funktioniert's",
      sampleThemes: "Beispielthemen und Cover",
      sampleBooks: "Beispielbuecher",
      pricing: "Preise und Lieferung",
      login: "Anmelden",
      createBook: "Buch erstellen",
      dashboard: "Dashboard",
      profileSettings: "Profileinstellungen",
      changePassword: "Passwort aendern",
      logout: "Abmelden",
    },
  } as const;

  const t = labels[lang];

  const changeLanguage = async (language: "en" | "de") => {
    if (isLanguageUpdating || language === lang) return;

    setIsLanguageUpdating(true);
    const previousLanguage = lang;
    setLanguage(language);

   
    const token =
      window.localStorage.getItem("authToken") ||
      window.localStorage.getItem("token") ||
      window.localStorage.getItem("accessToken");
    if (token) {
      try {
        const result = await updateLanguageUser({ language });
        toast.success(result.message);
      } catch (error) {
        setLanguage(previousLanguage);
        const message = error instanceof Error ? error.message : "Failed to update language";
        toast.error(message);
        console.error("Language update failed:", error);
      }
    }

    setIsLanguageUpdating(false);
  };

  const navLinks = [
    { label: t.home, href: "/" },
    { label: t.howItWorks, href: "/how-it-works" },
    { label: t.sampleThemes, href: "/cover" },
    { label: t.sampleBooks, href: "/sample-books" },
    { label: t.pricing, href: "/pricing-delivery" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50" style={{ background: "#F5F5F5" }}>
      <div
        className="mx-auto flex items-center justify-between px-6"
        style={{ maxWidth: 1280, height: 64 }}
      >

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo.png"
            width={30} height={30}
            alt="Mein HerzGeschenk logo"
            className="rounded-sm"
          />
          <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", letterSpacing: "-0.2px" }}>
            Mein HerzGeschenk
          </span>
        </Link>

        {/* ── Center nav links ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const href = item.href;
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: active ? "#7A1E3A" : "#6B7280",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "#7A1E3A"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "#6B7280"; }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right side ── */}
        <div className="hidden md:flex items-center gap-3">

          {/* Language switcher */}
          <div
            className="flex items-center"
            style={{
              background: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: 999,
              padding: "4px 5px",
              gap: 2,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {(["EN", "DE"] as const).map((l, i) => (
              <button
                key={l}
                onClick={() => changeLanguage(l.toLowerCase() as "en" | "de")}
                disabled={isLanguageUpdating}
                style={{
                  padding: "3px 9px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  transition: "background 0.15s, color 0.15s",
                  background: lang === l.toLowerCase()
                    ? "linear-gradient(102deg,#BF003A 0%,#59001C 100%)"
                    : "transparent",
                  color: lang === l.toLowerCase() ? "#fff" : "#6B7280",
                  opacity: isLanguageUpdating ? 0.75 : 1,
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {!isAuthenticated ? (
            <>
              {/* Login */}
              <Link
                href="/login"
                style={{
                  fontSize: 14, fontWeight: 500, color: "#374151",
                  textDecoration: "none", padding: "6px 4px",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#7A1E3A")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#374151")}
              >
                {t.login}
              </Link>

              {/* Create Book */}
              <Link
                href="/create"
                style={{
                  background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "8px 20px",
                  borderRadius: 999,
                  textDecoration: "none",
                  boxShadow: "0 1px 4px rgba(191,0,58,0.25)",
                  whiteSpace: "nowrap",
                }}
              >
                {t.createBook}
              </Link>
            </>
          ) : (
            <>
              {/* Create Book */}
              <Link
                href="/create"
                style={{
                  background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "8px 20px",
                  borderRadius: 999,
                  textDecoration: "none",
                  boxShadow: "0 1px 4px rgba(191,0,58,0.25)",
                  whiteSpace: "nowrap",
                }}
              >
                {t.createBook}
              </Link>

              {/* Profile avatar */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    width: 36, height: 36,
                    borderRadius: "50%",
                    background: displayAvatar ? "#fff" : "#15803d",
                    border: "none",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff",
                    fontSize: 14, fontWeight: 600,
                    overflow: "hidden",
                  }}
                >
                  {displayAvatar ? (
                    <Image
                      src={displayAvatar}
                      alt={displayName}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    displayName.charAt(0).toUpperCase() || "P"
                  )}
                </button>

                {profileOpen && (
                  <div style={{
                    position: "absolute", right: 0, top: "calc(100% + 8px)",
                    width: 220,
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: "1px solid #F3F4F6",
                    overflow: "hidden",
                    zIndex: 50,
                  }}>
                    {/* Header */}
                    <div style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #F3F4F6",
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: displayAvatar ? "#fff" : "#15803d",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 13, fontWeight: 600, flexShrink: 0,
                        overflow: "hidden",
                      }}>
                        {displayAvatar ? (
                          <Image
                            src={displayAvatar}
                            alt={displayName}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          displayName.charAt(0).toUpperCase() || "P"
                        )}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>{displayName}</p>
                        <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>{displayEmail}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div style={{ padding: "6px 0" }}>
                      {[
                        { icon: <LayoutGrid size={15} color="#9A1C37" />, label: t.dashboard, href: "/dashboard" },
                        { icon: <Settings2 size={15} color="#9A1C37" />, label: t.profileSettings, href: "/dashboard/profile" },
                        { icon: <KeyRound size={15} color="#9A1C37" />, label: t.changePassword, href: "/dashboard/change-password" },
                      ].map(item => (
                        <Link key={item.label} href={item.href} style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "9px 16px",
                          fontSize: 13, color: "#374151",
                          textDecoration: "none",
                          transition: "background 0.12s",
                        }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#F9FAFB")}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                        >
                          {item.icon}{item.label}
                        </Link>
                      ))}

                      <div style={{ borderTop: "1px solid #F3F4F6", marginTop: 4 }}>
                        <button
                          onClick={() => { logout(); setProfileOpen(false); }}
                          style={{
                            width: "100%", display: "flex", alignItems: "center", gap: 10,
                            padding: "9px 16px",
                            fontSize: 13, color: "#374151",
                            background: "none", border: "none", cursor: "pointer",
                            textAlign: "left",
                            transition: "background 0.12s",
                          }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#F9FAFB")}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                        >
                          <LogOut size={15} color="#9A1C37" /> {t.logout}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#374151" }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: "#fff",
            borderTop: "1px solid #F3F4F6",
            padding: "16px 24px 20px",
            display: "flex", flexDirection: "column", gap: 4,
          }}
        >
          {navLinks.map((item) => {
            const href = item.href;
            return (
              <Link
                key={item.label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 14, fontWeight: 500,
                  color: pathname === item.href ? "#7A1E3A" : "#374151",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid #F9FAFB",
                }}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Mobile lang + actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
            {/* Language switcher */}
            <div style={{
              display: "flex",
              background: "#F3F4F6",
              borderRadius: 999,
              padding: "3px 4px",
              gap: 2,
            }}>
              {(["EN", "DE"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => changeLanguage(l.toLowerCase() as "en" | "de")}
                  disabled={isLanguageUpdating}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12, fontWeight: 600,
                    background: lang === l.toLowerCase()
                      ? "linear-gradient(102deg,#BF003A 0%,#59001C 100%)"
                      : "transparent",
                    color: lang === l.toLowerCase() ? "#fff" : "#6B7280",
                    opacity: isLanguageUpdating ? 0.75 : 1,
                  }}
                >{l}</button>
              ))}
            </div>

            {!isAuthenticated && (
              <Link href="/login" style={{
                fontSize: 13, fontWeight: 500, color: "#374151", textDecoration: "none",
              }}>{t.login}</Link>
            )}

            <Link href="/create" style={{
              marginLeft: "auto",
              background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)",
              color: "#fff", fontSize: 13, fontWeight: 600,
              padding: "8px 18px", borderRadius: 999,
              textDecoration: "none",
            }}>
              {t.createBook}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}