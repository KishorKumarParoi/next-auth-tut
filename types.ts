import { Account, TwoFactorConfirmation, UserRole } from "@prisma/client"; // Ensure this import is correct based on your project structure

export interface User {
  name: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  accounts: Account[];
  isOAuth?: boolean;
  isTwoFactorEnabled?: boolean;
  twoFactorConfirmation?: TwoFactorConfirmation;
  createdAt?: Date;
  updatedAt?: Date;
  role: UserRole;
}
