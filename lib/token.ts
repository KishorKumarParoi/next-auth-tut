import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getVerificationTokenByEmail } from "./verification-token";

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
