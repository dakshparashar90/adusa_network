import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

//  STEP 1: export authOptions
export const authOptions: NextAuthOptions = {
  secret: process.env.BETTER_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Wrong password");
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
        };
      }
      return session;
    },
  },
};

//  STEP 2: handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };