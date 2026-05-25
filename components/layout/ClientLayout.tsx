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
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
  const googleClientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() || "missing-google-client-id";

  const hideLayout = HIDDEN_LAYOUT_ROUTES.some((route) =>
    pathname?.startsWith(route)
  );

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {!hideLayout && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!hideLayout && <Footer />}
      <Toaster position="top-right" richColors closeButton duration={3000} />
    </GoogleOAuthProvider>
  );
}