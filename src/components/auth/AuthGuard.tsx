"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children, isAdmin }: { children: React.ReactNode; isAdmin?: boolean }) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (mounted) {
      if (!isAuthenticated) {
        if (isAdmin && !pathname.includes("/admin/login")) {
          router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
          return;
        }
        
        if (pathname.startsWith("/account") && !pathname.includes("/account/login") && !pathname.includes("/account/register") && !pathname.includes("/account/forgot-password") && !pathname.includes("/account/verify-email")) {
          router.push(`/account/login?redirect=${encodeURIComponent(pathname)}`);
        }
      } else if (user) {
        // Double check roles
        if (isAdmin && user.role !== "admin") {
          router.push(`/admin/login?error=Unauthorized&redirect=${encodeURIComponent(pathname)}`);
        } else if (!isAdmin && pathname.startsWith("/account") && user.role !== "customer") {
          // If trying to access customer account with an admin session (unlikely but possible)
          // router.push("/account/login"); 
        }
      }
    }
  }, [isAuthenticated, user, pathname, router, isAdmin, mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--spice)]" />
      </div>
    );
  }

  if (!isAuthenticated && isAdmin && !pathname.includes("/admin/login")) {
    return null;
  }

  if (!isAuthenticated && pathname.startsWith("/account")) {
    return null; // User will be redirected by useEffect
  }

  return <>{children}</>;
}
