/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import { useAuth } from "@/hooks/useAuth";
// import Image from "next/image";
// import { LayoutGrid, Settings2, KeyRound, LogOut } from "lucide-react";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const pathname = usePathname();
//   const { isAuthenticated, user, logout } = useAuth();

//   const navLinks = [
//     { label: "Templates", href: "/Templates" },
//     { label: "Covers", href: "/cover" },
//     { label: "Pricing & Delivery", href: "/pricing-delivery" },
//   ];

//   return (
//     <nav className="w-full bg-[#F5F5F5] sticky top-0 z-50 px-6 py-4">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <Image src="/images/logo.png" width={32} height={32} alt="logo" className="rounded-sm" />
//           <span className="text-[15px] font-semibold text-[#1A1A2E] tracking-tight">
//             Mein HerzGeschenk
//           </span>
//         </Link>

//         {/* Center Nav */}
//         <div className="hidden md:flex items-center gap-10">
//           {navLinks.map((item) => (
//             <Link
//               key={item.label}
//               href={item.href}
//               className={`text-[14px] font-medium transition ${pathname === item.href
//                   ? "text-[#7A1E3A]"
//                   : "text-[#6B7280] hover:text-[#7A1E3A]"
//                 }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* Right Side */}
//         <div className="hidden md:flex items-center gap-4">

//           {!isAuthenticated ? (
//             <>
//               <Link href="/login" className="text-sm font-medium text-black hover:text-gray-600">
//                 Log In
//               </Link>

//               <Link
//                 href="/create"
//                 className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-sm"
//               >
//                 Create Book
//               </Link>
//             </>
//           ) : (
//             <>
//               {/* Language */}
//               <button className="flex items-center text-white gap-1 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] border border-gray-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100">
//                 DE
//                 <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M5 7l5 5 5-5H5z" />
//                 </svg>
//               </button>

//               {/* Create */}
//               <Link
//                 href="/create"
//                 className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-sm"
//               >
//                 Create Book
//               </Link>

//               {/* Profile */}
//               <div className="relative">
//                 <button
//                   onClick={() => setProfileOpen(!profileOpen)}
//                   className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white text-sm font-semibold"
//                 >
//                   {user?.name?.charAt(0).toUpperCase() || "P"}
//                 </button>

//                 {/* {profileOpen && (
//                   <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
//                     <div className="px-4 py-3 border-b">
//                       <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
//                       <p className="text-xs text-gray-500">{user?.email}</p>
//                     </div>

//                     <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50">
//                       My Profile
//                     </Link>
//                     <Link href="/my-books" className="block px-4 py-2 text-sm hover:bg-gray-50">
//                       My Books
//                     </Link>
//                     <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-50">
//                       Settings
//                     </Link>

//                     <button
//                       onClick={() => {
//                         logout();
//                         setProfileOpen(false);
//                       }}
//                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )} */}

//                 {profileOpen && (
//                   <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">

//                     {/* Header */}
//                     <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white text-sm font-medium shrink-0">
//                         {user?.name?.charAt(0).toUpperCase() || "S"}
//                       </div>
//                       <span className="text-sm font-medium text-gray-900">{user?.name}</span>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="py-1.5">
//                       <Link
//                         href="/dashboard"
//                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
//                       >
//                         <LayoutGrid size={16} className="text-rose-800" />
//                         Dashboard
//                       </Link>

//                       <Link
//                         href="dashboard/profile"
//                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
//                       >
//                         <Settings2 size={16} className="text-rose-800" />
//                         Profile Settings
//                       </Link>

//                       <Link
//                         href="dashboard/change-password"
//                         className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
//                       >
//                         <KeyRound size={16} className="text-rose-800" />
//                         Change Password
//                       </Link>

//                       <div className="border-t border-gray-100 mt-1">
//                         <button
//                           onClick={() => { logout(); setProfileOpen(false); }}
//                           className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
//                         >
//                           <LogOut size={16} className="text-rose-800" />
//                           Logout
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Mobile Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden mt-4 flex flex-col gap-4">
//           {navLinks.map((item) => (
//             <Link key={item.label} href={item.href} className="text-sm">
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// }


"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { LayoutGrid, Settings2, KeyRound, LogOut, X, Menu } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [lang, setLang]             = useState<"EN" | "DE">("EN");
  const pathname  = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { label: "Home",               href: "/" },
    { label: "How it Works",       scrollTarget: "how-it-works" },
    { label: "Sample Covers",      href: "/cover" },
    { label: "Pricing & Delivery", href: "/pricing-delivery" },
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
            const href = item.href ?? (item.scrollTarget ? `/#${item.scrollTarget}` : "/");
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
                onClick={() => setLang(l)}
                style={{
                  padding: "3px 9px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  transition: "background 0.15s, color 0.15s",
                  background: lang === l
                    ? "linear-gradient(102deg,#BF003A 0%,#59001C 100%)"
                    : "transparent",
                  color: lang === l ? "#fff" : "#6B7280",
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
                Login
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
                Create Book
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
                Create Book
              </Link>

              {/* Profile avatar */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    width: 36, height: 36,
                    borderRadius: "50%",
                    background: "#15803d",
                    border: "none",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff",
                    fontSize: 14, fontWeight: 600,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || "P"}
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
                        background: "#15803d",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 13, fontWeight: 600, flexShrink: 0,
                      }}>
                        {user?.name?.charAt(0).toUpperCase() || "P"}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>{user?.name}</p>
                        <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>{user?.email}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div style={{ padding: "6px 0" }}>
                      {[
                        { icon: <LayoutGrid size={15} color="#9A1C37" />, label: "Dashboard",       href: "/dashboard" },
                        { icon: <Settings2  size={15} color="#9A1C37" />, label: "Profile Settings", href: "/dashboard/profile" },
                        { icon: <KeyRound   size={15} color="#9A1C37" />, label: "Change Password",  href: "/dashboard/change-password" },
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
                          <LogOut size={15} color="#9A1C37" /> Logout
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
            const href = item.href ?? (item.scrollTarget ? `/#${item.scrollTarget}` : "/");
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
                  onClick={() => setLang(l)}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12, fontWeight: 600,
                    background: lang === l
                      ? "linear-gradient(102deg,#BF003A 0%,#59001C 100%)"
                      : "transparent",
                    color: lang === l ? "#fff" : "#6B7280",
                  }}
                >{l}</button>
              ))}
            </div>

            {!isAuthenticated && (
              <Link href="/login" style={{
                fontSize: 13, fontWeight: 500, color: "#374151", textDecoration: "none",
              }}>Login</Link>
            )}

            <Link href="/create" style={{
              marginLeft: "auto",
              background: "linear-gradient(102deg,#BF003A 0%,#59001C 100%)",
              color: "#fff", fontSize: 13, fontWeight: 600,
              padding: "8px 18px", borderRadius: 999,
              textDecoration: "none",
            }}>
              Create Book
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}