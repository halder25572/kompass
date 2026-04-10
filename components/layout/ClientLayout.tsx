// "use client";

// import { usePathname } from "next/navigation";
// import Navbar from "@/components/layout/shared/Navbar";
// import Footer from "@/components/layout/shared/Footer";

// //  route- Navbar  Footer
// const HIDDEN_LAYOUT_ROUTES = ["/create", "/create-book", "/book-creator"];

// export default function ClientLayout({ children }: { children: React.ReactNode }) {
//     const pathname = usePathname();

//     const hideLayout = HIDDEN_LAYOUT_ROUTES.some((route) =>
//         pathname?.startsWith(route)
//     );

//     return (
//         <>
//             {!hideLayout && <Navbar />}
//             <main className="min-h-screen">{children}</main>
//             {!hideLayout && <Footer />}
//         </>
//     );
// }


"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/shared/Navbar";
import Footer from "@/components/layout/shared/Footer";

const HIDDEN_LAYOUT_ROUTES = [
  "/login",
  "/register",
  "/create",
  "/reset-password",
  "/verify-otp",
  "/new-password",
  "/dashboard",
  "/create-book",
  "/book-creator",
  "/checkout",
  "/birthday-question",
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout = HIDDEN_LAYOUT_ROUTES.some((route) =>
    pathname?.startsWith(route)
  );

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}