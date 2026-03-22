"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

/** Verify if the requester is a Super Admin */
async function isSuperAdmin(adminId: string) {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { role: true },
  });
  return admin?.role === "SUPER_ADMIN";
}

// ─── Customer Management ─────────────────────────────────────────────────────

export async function createCustomer(values: { name: string; email: string; phone?: string; password?: string }) {
  try {
    const hashedPassword = values.password ? await bcrypt.hash(values.password, 10) : undefined;
    
    const customer = await prisma.user.create({
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: hashedPassword,
        emailVerified: new Date(), // Manually created customers are verified by default
      },
    });

    revalidatePath("/admin/customers");
    return { success: true, customer };
  } catch (error: any) {
    if (error.code === 'P2002') return { error: "Email already exists." };
    return { error: "Failed to create customer." };
  }
}

export async function updateCustomer(id: string, values: { name: string; email: string; phone?: string }) {
  try {
    const customer = await prisma.user.update({
      where: { id },
      data: values,
    });

    revalidatePath("/admin/customers");
    return { success: true, customer };
  } catch (error) {
    return { error: "Failed to update customer." };
  }
}

export async function toggleBlockUser(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return { error: "User not found." };

    const updated = await prisma.user.update({
      where: { id },
      data: { isBlocked: !user.isBlocked },
    });

    revalidatePath("/admin/customers");
    return { success: true, isBlocked: updated.isBlocked };
  } catch (error) {
    return { error: "Failed to toggle block status." };
  }
}

// ─── Admin Management ────────────────────────────────────────────────────────

export async function createAdmin(requesterId: string, values: { name: string; email: string; role: string; password?: string }) {
  if (!(await isSuperAdmin(requesterId))) {
    return { error: "Unauthorized. Super Admin access required." };
  }

  try {
    const hashedPassword = await bcrypt.hash(values.password || "admin123", 10);
    
    const admin = await prisma.admin.create({
      data: {
        name: values.name,
        email: values.email,
        password: hashedPassword,
        role: values.role,
        emailVerified: new Date(),
      },
    });

    revalidatePath("/admin/users");
    return { success: true, admin };
  } catch (error: any) {
    if (error.code === 'P2002') return { error: "Admin email already exists." };
    return { error: "Failed to create admin." };
  }
}

export async function updateAdmin(requesterId: string, id: string, values: { name: string; email: string; role: string }) {
  if (!(await isSuperAdmin(requesterId))) {
    return { error: "Unauthorized. Super Admin access required." };
  }

  try {
    const admin = await prisma.admin.update({
      where: { id },
      data: values,
    });

    revalidatePath("/admin/users");
    return { success: true, admin };
  } catch (error) {
    return { error: "Failed to update admin." };
  }
}

export async function toggleBlockAdmin(requesterId: string, id: string) {
  if (!(await isSuperAdmin(requesterId))) {
    return { error: "Unauthorized. Super Admin access required." };
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { id } });
    if (!admin) return { error: "Admin not found." };
    if (admin.role === "SUPER_ADMIN" && admin.id === requesterId) {
      return { error: "Cannot block yourself." };
    }

    const updated = await prisma.admin.update({
      where: { id },
      data: { isBlocked: !admin.isBlocked },
    });

    revalidatePath("/admin/users");
    return { success: true, isBlocked: updated.isBlocked };
  } catch (error) {
    return { error: "Failed to toggle block status." };
  }
}

export async function sendUserPasswordReset(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.email) return { error: "User or email not found" };

    const { forgotPassword } = await import("@/app/actions/auth");
    return await forgotPassword(user.email);
  } catch (error) {
    return { error: "Failed to send reset email" };
  }
}

export async function sendAdminPasswordReset(requesterId: string, targetAdminId: string) {
  if (!(await isSuperAdmin(requesterId))) {
    return { error: "Unauthorized. Super Admin access required." };
  }

  try {
    const targetAdmin = await prisma.admin.findUnique({ where: { id: targetAdminId } });
    if (!targetAdmin || !targetAdmin.email) return { error: "Admin or email not found" };

    const { forgotPassword } = await import("@/app/actions/auth");
    return await forgotPassword(targetAdmin.email);
  } catch (error) {
    return { error: "Failed to send reset email" };
  }
}
