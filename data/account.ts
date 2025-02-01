import { db } from "@/lib/db";
import { log } from "@/utils/logger";

export const getAccountByUserId = async (accountId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        id: accountId,
      },
    });
    return account;
  } catch (error) {
    log("getAccountByUserId-> Error: ", error);
  }
};
