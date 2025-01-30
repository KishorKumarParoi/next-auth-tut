import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getUserById } from "./data/user";
import { db } from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      console.log({ user, account });

      // Allow OAuth providers to sign in without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign in if user is not verified
      if (!existingUser?.emailVerified) return false;

      console.log({ existingUser });

      // Check if user has two-factor enabled
      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        console.log({ twoFactorConfirmation });

        if (!twoFactorConfirmation) {
          return false;
        }

        // Delete the confirmation after successful sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    pages: {
      signIn: "/auth/login",
      error: "/auth/error",
    },
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
    async session({ session, token }) {
      console.log({ sessionToken: token });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    },
  },
});
