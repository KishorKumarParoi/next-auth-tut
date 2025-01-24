"use server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";
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
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email already in Use" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // TODO: Send verification email

  return { success: "User Created" };
};
