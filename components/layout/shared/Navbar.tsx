// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import { useAuth } from "@/hooks/useAuth";
// import Image from "next/image";

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
//     <nav className="w-full bg-[#EBEBEB] sticky top-0 z-50 p-6 rounded-xl px-6 py-3">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">

//         {/* Logo */}
//         <Link href="/">
//           <div className="ml-10 flex items-center gap-2 mb-4">
//             <div className="w-8 h-8 rounded-lg flex items-center justify-center">
//               <Image
//                 className="rounded-sm"
//                 src="/images/logo.png"
//                 width={32}
//                 height={30}
//                 alt="Picture of the author"
//               />
//             </div>
//             <span className="text-[15px] font-bold text-[#1a1a2e]">Mein HerzGeschenk</span>
//           </div>
//         </Link>

//         {/* Desktop Nav Links */}
//         <div className="hidden md:flex items-center gap-8">
//           {navLinks.map((item) => (
//             <Link
//               key={item.label}
//               href={item.href}
//               className={`text-sm font-medium transition-colors duration-200 ${pathname === item.href
//                   ? "text-[#7A1E3A] font-semibold"
//                   : "text-black hover:text-[#7A1E3A]"
//                 }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* Desktop CTA */}
//         <div className="hidden md:flex items-center gap-4">
//           {!isAuthenticated ? (
//             <>
//               <Link href="/login" className="text-black text-sm font-medium hover:text-gray-300 transition-colors duration-200">
//                 Log In
//               </Link>
//               <Link
//                 href="/create"
//                 className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
//               >
//                 Create Book
//               </Link>
//             </>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link
//                 href="/create"
//                 className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
//               >
//                 Create Book
//               </Link>
//               {/* Profile Icon with Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={() => setProfileOpen(!profileOpen)}
//                   className="w-10 h-10 rounded-full bg-[#b91c1c] flex items-center justify-center text-white font-semibold hover:bg-[#991b1b] transition-colors duration-200"
//                   title={user?.name}
//                 >
//                   {user?.name?.charAt(0).toUpperCase()}
//                 </button>

//                 {/* Dropdown Menu */}
//                 {profileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                     <div className="p-4 border-b border-gray-200">
//                       <p className="text-sm font-semibold text-black">{user?.name}</p>
//                       <p className="text-xs text-gray-600">{user?.email}</p>
//                     </div>
//                     <ul className="py-2">
//                       <li>
//                         <Link
//                           href="/profile"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                           onClick={() => setProfileOpen(false)}
//                         >
//                           My Profile
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/my-books"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                           onClick={() => setProfileOpen(false)}
//                         >
//                           My Books
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           href="/settings"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                           onClick={() => setProfileOpen(false)}
//                         >
//                           Settings
//                         </Link>
//                       </li>
//                       <li className="border-t border-gray-200">
//                         <button
//                           onClick={() => {
//                             logout();
//                             setProfileOpen(false);
//                           }}
//                           className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
//                         >
//                           Logout
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Mobile Hamburger */}
//         <button
//           className="md:hidden text-black p-1"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle menu"
//         >
//           {menuOpen ? (
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//               <line x1="18" y1="6" x2="6" y2="18" />
//               <line x1="6" y1="6" x2="18" y2="18" />
//             </svg>
//           ) : (
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//               <line x1="3" y1="7" x2="21" y2="7" />
//               <line x1="3" y1="12" x2="21" y2="12" />
//               <line x1="3" y1="17" x2="21" y2="17" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden mt-3 border-t border-white/10 pt-4 pb-2 flex flex-col gap-4 px-1">
//           {navLinks.map((item) => (
//             <Link
//               key={item.label}
//               href={item.href}
//               className={`text-sm font-medium transition-colors duration-200 ${pathname === item.href
//                   ? "text-[#7A1E3A] font-semibold"
//                   : "text-[#a0a0a0] hover:text-[#7A1E3A]"
//                 }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//           <div className="flex flex-col gap-4 mt-2 border-t border-white/10 pt-4">
//             {!isAuthenticated ? (
//               <>
//                 <a href="/login" className="text-black text-sm font-medium hover:text-gray-300 transition-colors duration-200">
//                   Log In
//                 </a>
//                 <a
//                   href="/create"
//                   className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-7 py-3 rounded-xl transition-colors duration-200"
//                 >
//                   Create Book
//                 </a>
//               </>
//             ) : (
//               <>
//                 <div className="flex items-center gap-3 pb-3">
//                   <div className="w-10 h-10 rounded-full bg-[#b91c1c] flex items-center justify-center text-white font-semibold">
//                     {user?.name?.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-black">{user?.name}</p>
//                     <p className="text-xs text-gray-600">{user?.email}</p>
//                   </div>
//                 </div>
//                 <Link
//                   href="/profile"
//                   className="text-[#a0a0a0] hover:text-[#7A1E3A] text-sm font-medium"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   My Profile
//                 </Link>
//                 <Link
//                   href="/my-books"
//                   className="text-[#a0a0a0] hover:text-[#7A1E3A] text-sm font-medium"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   My Books
//                 </Link>
//                 <Link
//                   href="/settings"
//                   className="text-[#a0a0a0] hover:text-[#7A1E3A] text-sm font-medium"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Settings
//                 </Link>
//                 <a
//                   href="/create"
//                   className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-7 py-3 rounded-xl transition-colors duration-200"
//                 >
//                   Create Book
//                 </a>
//                 <button
//                   onClick={() => {
//                     logout();
//                     setMenuOpen(false);
//                   }}
//                   className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors text-left"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
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
import { LayoutGrid, Settings2, KeyRound, LogOut } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { label: "Templates", href: "/Templates" },
    { label: "Covers", href: "/cover" },
    { label: "Pricing & Delivery", href: "/pricing-delivery" },
  ];

  return (
    <nav className="w-full bg-[#F5F5F5] sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" width={32} height={32} alt="logo" className="rounded-sm" />
          <span className="text-[15px] font-semibold text-[#1A1A2E] tracking-tight">
            Mein HerzGeschenk
          </span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-[14px] font-medium transition ${pathname === item.href
                  ? "text-[#7A1E3A]"
                  : "text-[#6B7280] hover:text-[#7A1E3A]"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-sm font-medium text-black hover:text-gray-600">
                Log In
              </Link>

              <Link
                href="/create"
                className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-sm"
              >
                Create Book
              </Link>
            </>
          ) : (
            <>
              {/* Language */}
              <button className="flex items-center text-white gap-1 bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] border border-gray-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100">
                DE
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 7l5 5 5-5H5z" />
                </svg>
              </button>

              {/* Create */}
              <Link
                href="/create"
                className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-sm"
              >
                Create Book
              </Link>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white text-sm font-semibold"
                >
                  {user?.name?.charAt(0).toUpperCase() || "P"}
                </button>

                {/* {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>

                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50">
                      My Profile
                    </Link>
                    <Link href="/my-books" className="block px-4 py-2 text-sm hover:bg-gray-50">
                      My Books
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-50">
                      Settings
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t"
                    >
                      Logout
                    </button>
                  </div>
                )} */}

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">

                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white text-sm font-medium shrink-0">
                        {user?.name?.charAt(0).toUpperCase() || "S"}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1.5">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutGrid size={16} className="text-rose-800" />
                        Dashboard
                      </Link>

                      <Link
                        href="dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        <Settings2 size={16} className="text-rose-800" />
                        Profile Settings
                      </Link>

                      <Link
                        href="dashboard/change-password"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        <KeyRound size={16} className="text-rose-800" />
                        Change Password
                      </Link>

                      <div className="border-t border-gray-100 mt-1">
                        <button
                          onClick={() => { logout(); setProfileOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                          <LogOut size={16} className="text-rose-800" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
