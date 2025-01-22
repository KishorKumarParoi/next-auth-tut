"use server";

import { z } from "zod";
import { RegisterSchema } from "../schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log("login action", values);
  const validateFields = RegisterSchema.safeParse(values);
  console.log("validateFields", validateFields);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Email Sent!" };
};
