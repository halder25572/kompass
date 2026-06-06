// /* eslint-disable @typescript-eslint/no-explicit-any */
// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { JWT } from "next-auth/jwt";
// import { Session } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, account }: { token: JWT; account: any }) {
//       if (account?.access_token) {
//         token.accessToken = account.access_token;
//       }
//       if (account?.provider) {
//         (token as any).provider = account.provider;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       (session as any).accessToken = token.accessToken;
//       (session as any).provider = (token as any).provider;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: any }) {
      if (account?.access_token && account?.provider === "google") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/login/google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: account.access_token }),
            }
          );
          const data = await res.json();

          if (data?.success && data?.data?.token) {
            token.accessToken = data.data.token;
          }
        } catch (err) {
          console.error("Backend Google login failed:", err);
        }
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };