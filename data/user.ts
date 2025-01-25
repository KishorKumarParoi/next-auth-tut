import { db } from "lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in getUserByEmail", error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in getUserById", error);
  }
};

export const createUser = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const user = await db.user.create({
      data,
    });
    return user;
  } catch (error) {
    console.log("Error in createUser", error);
  }
};

export const getUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    console.log("Error in getUserByEmailAndPassword", error);
  }
};
