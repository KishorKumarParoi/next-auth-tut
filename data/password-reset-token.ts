import { db } from "@/lib/db";

export const getPasswordResetByToken = async (token: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    console.log("passwordToken", passwordToken);
    return passwordToken;
  } catch (error) {
    console.log("Error in getPasswordResetByToken", error);
    return null;
  }
};

export const getPasswordResetByEmail = async (email: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    console.log("passwordToken", passwordToken);
    return passwordToken;
  } catch (error) {
    console.log("Error in getPasswordResetByEmail", error);
    return null;
  }
};
