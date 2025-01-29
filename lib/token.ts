import { getPasswordResetByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  console.log("token", token);
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await db.twoFactorToken.findFirst({
    where: {
      email,
    },
  });

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  console.log("token", token);
  const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  console.log("expires", expires);

  const existingToken = await getPasswordResetByEmail(email);
  console.log("existingToken", existingToken);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  console.log("token", token);
  const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  console.log("expires", expires);

  const existingToken = await getVerificationTokenByEmail(email);
  console.log("existingToken", existingToken);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
