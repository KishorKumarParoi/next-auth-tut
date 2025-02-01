import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@kishordev.me",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA Code: ${token}</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "mail@kishordev.me",
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
    });

    console.log("sendVerificationEmail", { data, error });
    return { data, error };
  } catch (error) {
    console.error("sendVerificationEmail", error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "mail@kishordev.me",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset password</p>`,
    });
    console.log("sendPasswordResetEmail", { data, error });
    return { data, error };
  } catch (error) {
    console.error("sendPasswordResetEmail", error);
    return { error };
  }
};
