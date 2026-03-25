// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="w-full bg-[rgba(255,255,255,0.15)] backdrop-blur-[6px] p-6 rounded-xl border border-white/20 px-6 py-3">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">

//         {/* Logo */}
//         <Link href='/'>
//           <div className="flex items-center gap-2 shrink-0">
//           <div className="w-8 h-8 bg-[#b91c1c] rounded-lg flex items-center justify-center">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
//               <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
//             </svg>
//           </div>
//           <span className="text-black font-semibold text-[15px] tracking-tight">Memory Book</span>
//         </div>
//         </Link>

//         {/* Desktop Nav Links */}
//         <div className="hidden md:flex items-center gap-8">
//           {["Templates", "Covers", "Pricing & Delivery"].map((item) => (
//             <a
//               key={item}
//               href="Templates"
//               className="text-black hover:text-white text-sm font-medium transition-colors duration-200"
//             >
//               {item}
//             </a>
//           ))}
//         </div>

//         {/* Desktop CTA */}
//         <div className="hidden md:flex items-center gap-4">
//           <a href="#" className="text-black text-sm font-medium hover:text-gray-300 transition-colors duration-200">
//             Log In
//           </a>
//           <a
//             href="#"
//             className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
//           >
//             Create Book
//           </a>
//         </div>

//         {/* Mobile Hamburger */}
//         <button
//           className="md:hidden text-white p-1"
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
//           {["Templates", "Covers", "Pricing & Delivery"].map((item) => (
//             <Link
//               key={item}
//               href="Templates"
//               className="text-[#a0a0a0] hover:text-white text-sm font-medium transition-colors duration-200"
//             >
//               {item}
//             </Link>
//           ))}
//           <div className="flex items-center gap-4 mt-2">
//             <a href="#" className="text-white text-sm font-medium hover:text-gray-300 transition-colors duration-200">
//               Log In
//             </a>
//             <a
//               href="#"
//               className="bg-[#b91c1c] hover:bg-[#991b1b] text-white text-sm font-semibold px-7 py-[12px]rounded-xl transition-colors duration-200"
//             >
//               Create Book
//             </a>
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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Templates", href: "/Templates" },
    { label: "Covers", href: "/cover" },
    { label: "Pricing & Delivery", href: "/pricing-delivery" },
  ];

  return (
    <nav className="w-full bg-white/20 sticky top-0 z-50 p-6 rounded-xl px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#b91c1c] rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="text-black font-semibold text-[15px] tracking-tight">Memory Book</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === item.href
                  ? "text-[#7A1E3A] font-semibold"
                  : "text-black hover:text-[#7A1E3A]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-black text-sm font-medium hover:text-gray-300 transition-colors duration-200">
            Log In
          </a>
          <a
            href="#"
            className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            Create Book
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-black p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 border-t border-white/10 pt-4 pb-2 flex flex-col gap-4 px-1">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === item.href
                  ? "text-[#7A1E3A] font-semibold"
                  : "text-[#a0a0a0] hover:text-[#7A1E3A]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="text-black text-sm font-medium hover:text-gray-300 transition-colors duration-200">
              Log In
            </a>
            <a
              href="#"
              className="bg-[linear-gradient(102deg,#BF003A_0%,#59001C_100%)] text-white text-sm font-semibold px-7 py-3 rounded-xl transition-colors duration-200"
            >
              Create Book
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}