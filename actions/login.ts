"use server";

import { z } from "zod";
import { LoginSchema } from "../schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log("login action", values);
  const validateFields = LoginSchema.safeParse(values);
  console.log("validateFields", validateFields);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Email Sent!" };
};
