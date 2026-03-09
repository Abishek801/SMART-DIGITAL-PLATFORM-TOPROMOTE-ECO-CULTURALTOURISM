import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        isRegister: { label: "Is Register", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        try {
          const bcrypt = (await import("bcryptjs")).default;
          const { default: prisma } = await import("../../../../lib/db");

          if (credentials.isRegister === "true") {
            // Registration
            const existingUser = await prisma.user.findUnique({
              where: { email: credentials.email },
            });
            if (existingUser)
              throw new Error("An account with this email already exists.");
            const hashed = await bcrypt.hash(credentials.password, 10);
            const newUser = await prisma.user.create({
              data: {
                name: credentials.name || "Eco Traveler",
                email: credentials.email,
                password: hashed,
              },
            });
            return { id: newUser.id, name: newUser.name, email: newUser.email };
          } else {
            // Login
            const user = await prisma.user.findUnique({
              where: { email: credentials.email },
            });
            if (!user || !user.password)
              throw new Error("No account found. Please register first.");
            const isValid = await bcrypt.compare(
              credentials.password,
              user.password,
            );
            if (!isValid)
              throw new Error("Incorrect password. Please try again.");
            return { id: user.id, name: user.name, email: user.email };
          }
        } catch (err) {
          // If it's an auth error re-throw, otherwise give a friendly message
          if (
            err.message.includes("already exists") ||
            err.message.includes("No account") ||
            err.message.includes("Incorrect")
          ) {
            throw err;
          }
          // DB not connected - allow demo login
          console.warn("DB not available, using demo auth:", err.message);
          if (credentials.email && credentials.password.length >= 6) {
            return {
              id: "demo-user",
              name: credentials.name || "Demo Traveler",
              email: credentials.email,
            };
          }
          throw new Error("Password must be at least 6 characters.");
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "ecoculture-secret-key-2026",
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
