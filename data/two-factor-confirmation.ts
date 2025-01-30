import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
    console.log("getTwoFactorConfirmationByUserId", { twoFactorConfirmation });
    return twoFactorConfirmation;
  } catch (error) {
    console.log("getTwoFactorConfirmationByUserId", error);
    return null;
  }
};
