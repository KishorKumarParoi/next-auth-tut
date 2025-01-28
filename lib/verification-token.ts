import { db } from "./db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    console.log("verificationToken", verificationToken);
    return verificationToken;
  } catch (error) {
    console.log("Error in getVerificationByEmail", error);
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
    return verificationToken;
  } catch (error) {
    console.log("Error in getVerificationByToken", error);
  }
};
