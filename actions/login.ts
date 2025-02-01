"use server";

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { z } from "zod";
import { LoginSchema } from "../schemas";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string
) => {
  console.log("login action", values);
  const validateFields = LoginSchema.safeParse(values);
  console.log("validateFields", validateFields);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email doesn't exist" };
  }

  console.log("existingUser", existingUser);

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    console.log("verificationToken", verificationToken);

    const result = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    if (result?.data) {
      console.log("sendVerificationEmail", { data: result.data });
    }

    if (result?.error) {
      return { error: "Something went wrong! kkp" };
    }

    return {
      success: "Confirmation E-mail Sent",
    };
  }

  if (existingUser?.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // TODO: Validate the code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Code doesn't match" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code has expired!" };
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return {
        twoFactor: true,
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials" };
        }
        default: {
          return { error: "Something went wrong!" };
        }
      }
    }

    throw error;
  }
};
