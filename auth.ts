import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { getAccountByUserId } from "./data/account";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getUserById } from "./data/user";
import { db } from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      console.log("[auth.ts:27] user", user);
      console.log("[auth.ts:28] account", account);

      // Allow OAuth providers to sign in without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign in if user is not verified
      if (!existingUser?.emailVerified) return false;

      console.log("[auth.ts:38] existingUser", existingUser);

      // Check if user has two-factor enabled
      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        console.log(
          "[auth.ts:53] twoFactorConfirmation",
          twoFactorConfirmation
        );

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
      console.log("[auth.ts:92] token", token);
      console.log("[auth.ts:93] session", session);

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      console.log("[auth.ts:94] newSession", session);

      return session;
    },
    async jwt({ token }) {
      // Check if token is being created
      if (!token.sub) {
        return token;
      }

      // check if token is an OAuth token
      if (token.picture) {
        token.isOAuth = true;
      }

      // console.log("[auth.ts:93] token", token);

      // Check if user exists in the database
      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }

      // Check if user is an OAuth user
      if (token.isOAuth) {
        existingUser.isOAuth = true;
      }

      console.log("[auth.ts:100] existingUser", existingUser);

      // Check if user has two-factor enabled
      const existingAccount = await getAccountByUserId(existingUser.id);
      console.log("[auth.ts:105] existingAccount", existingAccount);

      token.isOAuth = existingUser.isOAuth;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
});
