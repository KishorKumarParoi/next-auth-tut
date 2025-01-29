import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.BASE_URL}/auth/verify-email?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "1703053@student.ruet.ac.bd",
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
    });

    console.log("sendVerificationEmail", { data, error });
    return { data, error };
  } catch (error) {
    console.error("sendVerificationEmail", error);
  }
};
