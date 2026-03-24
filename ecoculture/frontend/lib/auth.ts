// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosError } from "axios";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            { email: credentials.email, password: credentials.password }
          );

          const data = response.data;

          // Backend signals 2FA is required — propagate as a special error
          if (data.requires2fa) {
            throw new Error("REQUIRES_2FA");
          }

          const { user, accessToken } = data;
          if (user && accessToken) {
            return { ...user, accessToken };
          }
          throw new Error("INVALID_CREDENTIALS");
        } catch (err: any) {
          // Re-throw meaningful errors (REQUIRES_2FA, etc.) as-is
          if (err.message && !err.response) {
            throw err;
          }
          // Handle HTTP error responses from backend
          const status = (err as AxiosError)?.response?.status;
          const message = (err as AxiosError<any>)?.response?.data?.message as string | undefined;
          if (status === 423 || message?.toLowerCase().includes("locked")) {
            throw new Error("ACCOUNT_LOCKED");
          }
          throw new Error("INVALID_CREDENTIALS");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret-change-in-production",
};
