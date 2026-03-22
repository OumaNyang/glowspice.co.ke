import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "GlowSpice <onboarding@resend.dev>", // Replace with your verified domain in production
    to: email,
    subject: "2FA Code - GlowSpice",
    html: `<p>Your 2FA code is: <strong>${token}</strong></p>`
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/account/reset-password?token=${token}`;

  await resend.emails.send({
    from: "GlowSpice <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password - GlowSpice",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/account/verify-email?token=${token}`;

  await resend.emails.send({
    from: "GlowSpice <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your email - GlowSpice",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
  });
};
