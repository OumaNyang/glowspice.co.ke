"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children, isAdmin }: { children: React.ReactNode; isAdmin?: boolean }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (!isAuthenticated) {
      if (isAdmin && !pathname.includes("/admin/login")) {
        router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }
      
      if (pathname.startsWith("/account") && !pathname.includes("/account/login") && !pathname.includes("/account/register") && !pathname.includes("/account/forgot-password")) {
        router.push(`/account/login?redirect=${encodeURIComponent(pathname)}`);
      }
    }
  }, [isAuthenticated, pathname, router, isAdmin]);

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
