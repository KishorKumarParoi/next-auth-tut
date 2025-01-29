import { getPasswordResetByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

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
