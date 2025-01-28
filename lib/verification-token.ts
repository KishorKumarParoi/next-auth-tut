import { db } from "./db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    console.log("verificationToken", verificationToken);
  } catch (error) {
    console.log("Error in getVerificationByEmail", error);
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });
    console.log("verificationTokenbyToken", verificationToken);
  } catch (error) {
    console.log("Error in getVerificationByToken", error);
    return null;
  }
};
