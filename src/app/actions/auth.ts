"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { 
  generateVerificationToken, 
  generatePasswordResetToken,
  generateTwoFactorToken
} from "@/lib/tokens";
import { 
  sendVerificationEmail, 
  sendPasswordResetEmail,
  sendTwoFactorTokenEmail
} from "@/lib/mail";

export async function loginCustomer(email: string, password?: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return { error: "Invalid credentials." };
    }

    const passwordsMatch = await bcrypt.compare(password || "", user.password);

    if (!passwordsMatch) {
      return { error: "Invalid credentials." };
    }

    if (user.isBlocked) {
      return { error: "Your account has been blocked. Please contact support." };
    }

    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToken(user.email);
      await sendVerificationEmail(verificationToken.email, verificationToken.token);
      return { error: "Email not verified. Confirmation email sent." };
    }

    return { 
      user: { 
        id: user.id,
        name: user.name,
        email: user.email,
        role: "customer" as const,
        isBlocked: user.isBlocked,
        createdAt: user.createdAt.toISOString(),
        emailVerified: user.emailVerified?.toISOString() || undefined,
        avatar: user.avatar || undefined,
        phone: user.phone || undefined,
      } 
    };
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "An error occurred during login." };
  }
}

export async function loginAdmin(email: string, password?: string, code?: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin || !admin.password) {
      return { error: "Invalid credentials." };
    }

    const passwordsMatch = await bcrypt.compare(password || "", admin.password);

    if (!passwordsMatch) {
      return { error: "Invalid credentials." };
    }

    if (admin.isBlocked) {
      return { error: "This admin account has been blocked. Please contact a Super Admin." };
    }

    if (admin.twoFactorEnabled && admin.email) {
      // ... (2FA logic)
      if (code) {
        const twoFactorToken = await prisma.twoFactorToken.findFirst({
          where: { email: admin.email }
        });

        if (!twoFactorToken || twoFactorToken.token !== code) {
          return { error: "Invalid 2FA code." };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();
        if (hasExpired) {
          return { error: "Code expired." };
        }

        await prisma.twoFactorToken.delete({
          where: { id: twoFactorToken.id }
        });

        const existingConfirmation = await prisma.twoFactorConfirmation.findUnique({
          where: { adminId: admin.id }
        });

        if (existingConfirmation) {
          await prisma.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id }
          });
        }

        await prisma.twoFactorConfirmation.create({
          data: { adminId: admin.id }
        });

      } else {
        const twoFactorToken = await generateTwoFactorToken(admin.email);
        await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
        return { twoFactor: true };
      }
    }

    return { 
      user: { 
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role as "SUPER_ADMIN" | "ADMIN",
        isBlocked: admin.isBlocked,
        createdAt: admin.createdAt.toISOString(),
        emailVerified: admin.emailVerified?.toISOString() || undefined,
        avatar: admin.avatar || undefined,
        twoFactorEnabled: admin.twoFactorEnabled,
      } 
    };
  } catch (error) {
    console.error("Admin Login Error:", error);
    return { error: "An error occurred during login." };
  }
}

export async function registerCustomer(values: any) {
  const { email, password, name } = values;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "Email already in use." };

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(user.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  } catch (error: any) {
    console.error("REGISTRATION_ERROR:", error);
    if (error.code === 'P2002') {
      return { error: "Email already in use." };
    }
    return { error: error.message || "Something went wrong." };
  }
}

export async function forgotPassword(email: string) {
  try {
    // Check both tables
    const user = await prisma.user.findUnique({ where: { email } });
    const admin = await prisma.admin.findUnique({ where: { email } });
    
    if (!user && !admin) return { error: "User not found." };

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Reset email sent!" };
  } catch (error) {
    return { error: "Something went wrong." };
  }
}

export async function resetPassword(password: string, token: string) {
  try {
    const existingToken = await prisma.passwordResetToken.findUnique({
      where: { token }
    });

    if (!existingToken) return { error: "Invalid token." };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: "Token expired." };

    const user = await prisma.user.findUnique({ where: { email: existingToken.email } });
    const admin = await prisma.admin.findUnique({ where: { email: existingToken.email } });

    if (!user && !admin) return { error: "User not found." };

    const hashedPassword = await bcrypt.hash(password, 10);

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
    } else if (admin) {
      await prisma.admin.update({
        where: { id: admin.id },
        data: { password: hashedPassword }
      });
    }

    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id }
    });

    return { success: "Password updated!" };
  } catch (error) {
    return { error: "Something went wrong." };
  }
}

export async function verifyEmail(token: string) {
  try {
    const existingToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

    if (!existingToken) return { error: "Token does not exist." };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: "Token has expired." };

    const user = await prisma.user.findUnique({ where: { email: existingToken.email } });
    const admin = await prisma.admin.findUnique({ where: { email: existingToken.email } });

    if (!user && !admin) return { error: "Email does not exist." };

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      });
    } else if (admin) {
      await prisma.admin.update({
        where: { id: admin.id },
        data: { emailVerified: new Date() }
      });
    }

    await prisma.verificationToken.delete({
      where: { id: existingToken.id }
    });

    return { success: "Email verified!" };
  } catch (error) {
    return { error: "Something went wrong." };
  }
}
export async function updateAdminProfile(id: string, values: { name: string; email: string }) {
  try {
    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: {
        name: values.name,
        email: values.email,
      },
    });

    return { 
      user: { 
        id: updatedAdmin.id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role as "SUPER_ADMIN" | "ADMIN",
        isBlocked: updatedAdmin.isBlocked,
        createdAt: updatedAdmin.createdAt.toISOString(),
        emailVerified: updatedAdmin.emailVerified?.toISOString() || undefined,
        avatar: updatedAdmin.avatar || undefined,
        twoFactorEnabled: updatedAdmin.twoFactorEnabled,
      } 
    };
  } catch (error) {
    console.error("Update Admin Error:", error);
    return { error: "Failed to update profile in database." };
  }
}
