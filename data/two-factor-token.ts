import { db } from "@/lib/db";

export const getTwoFactorToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
    console.log("getTwoFactorToken", { twoFactorToken });
    return twoFactorToken;
  } catch (error) {
    console.log("getTwoFactorToken", error);
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
    console.log("getTwoFactorTokenByEmail", { twoFactorToken });
    return twoFactorToken;
  } catch (error) {
    console.log("getTwoFactorTokenByEmail", error);
  }
};
