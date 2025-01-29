"use server";

import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import * as bcrypt from "bcryptjs";
import { z } from "zod";
import { createUser, getUserByEmail } from "../data/user";
import { RegisterSchema } from "../schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log("login action", values);
  const validateFields = RegisterSchema.safeParse(values);
  console.log("validateFields", validateFields);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in Use!" };
  }

  await createUser({ email, password: hashedPassword, name });

  const verificationToken = await generateVerificationToken(email);
  console.log("verificationToken", verificationToken);

  const result = await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  );

  if (result?.data) {
    console.log("sendVerificationEmail", { data: result.data });
  }

  if (result?.error) {
    return { error: "Something went wrong!" };
  }

  return { success: "Confirmation Email Sent" };
};
