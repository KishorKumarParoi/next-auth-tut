"use server";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { SettingsSchema } from "@/schemas";
import * as bcrypt from "bcryptjs";
import { z } from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  console.log("action.settings.ts:33 user: ", user);
  console.log("action.settings.ts:34 dbUser: ", dbUser);

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email is already in use" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    console.log("action.settings.ts:64 values.password: ", values.password);
    console.log(
      "action.settings.ts:65 values.newPassword: ",
      values.newPassword
    );
    console.log("action.settings.ts:66 dbUser.password: ", dbUser.password);

    if (values.password === values.newPassword) {
      return { error: "New password cannot be the same as the old password" };
    }

    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: "Password is incorrect" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;

    console.log("action.settings.ts:79 hashedPassword: ", hashedPassword);
    values.newPassword = undefined;
  }

  console.log("action.settings.ts:37 values: ", values);

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings Updated!" };
};
