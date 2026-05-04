/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { googleLoginUser } from "@/services/api";

function AuthSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    let cancelled = false;

    const syncGoogleSession = async () => {
      const provider = (session as any)?.provider;
      const providerToken = (session as any)?.accessToken;

      if (status !== "authenticated" || provider !== "google" || !providerToken) {
        return;
      }

      try {
        const exchangedFor = window.localStorage.getItem("google-auth-exchanged-for");
        if (exchangedFor === providerToken) {
          return;
        }

        const response = await googleLoginUser({ token: providerToken });
        if (cancelled) return;

        const backendToken = response.data.access_token || response.data.token;
        if (backendToken) {
          window.localStorage.setItem("token", backendToken);
          window.localStorage.setItem("google-auth-exchanged-for", providerToken);
          window.dispatchEvent(new Event("auth-token-updated"));
        }

        if (response.data.user) {
          const userObj = {
            id: String(response.data.user.id),
            name: response.data.user.name,
            email: response.data.user.email,
            avatar: response.data.user.avatar ?? null,
          };
          window.localStorage.setItem("user", JSON.stringify(userObj));
        }
      } catch {
        // keep the Google session alive even if backend exchange fails
      }
    };

    syncGoogleSession();

    if (status === "authenticated") {
      const token = (session as any)?.accessToken;
      if (token) {
        try {
          const provider = (session as any)?.provider;
          if (provider !== "google") {
            window.localStorage.setItem("token", token);
            window.dispatchEvent(new Event("auth-token-updated"));
          }
        } catch {}
      }

      if (session?.user) {
        try {
          const userObj = {
            id: session.user.email ?? "",
            name: session.user.name ?? "",
            email: session.user.email ?? "",
            avatar: session.user.image ?? null,
          };
          window.localStorage.setItem("user", JSON.stringify(userObj));
        } catch {}
      }
    }

    if (status === "unauthenticated") {
      try {
        // window.localStorage.removeItem("token");
        window.localStorage.removeItem("google-auth-exchanged-for");
      } catch {}
    }

    return () => {
      cancelled = true;
    };
  }, [session, status]);

  return null;
}

export default function NextAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
      <AuthSync />
    </SessionProvider>
  );
}