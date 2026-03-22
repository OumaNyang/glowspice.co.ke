"use server";

import { prisma } from "@/lib/db";

export async function loginUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "User not found. Please check your email." };
    }

    return { user };
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "An error occurred during login. Please try again." };
  }
}
