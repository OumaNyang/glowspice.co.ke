"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Heart, User as UserIcon, LogOut } from "lucide-react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account/orders", label: "My Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/profile", label: "Profile", icon: UserIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();

  return (
    <AuthGuard>
      <div className="bg-[var(--cream)] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar / Top Nav for Mobile */}
            <aside className="lg:col-span-1">
              
              {/* Profile card - Hidden on mobile, visible on desktop */}
              {user && (
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)] mb-6 text-center shadow-sm hidden lg:block">
                  <div className="w-20 h-20 bg-[var(--spice)]/10 rounded-full flex items-center justify-center text-[var(--spice)] text-4xl font-heading font-black mx-auto mb-4">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-bold text-lg text-[var(--bark)]">{user.name}</p>
                  <p className="text-sm text-[var(--gray-500)]">{user.email}</p>
                </div>
              )}

              {/* Mobile Profile & Nav Wrapper */}
              <div className="bg-white lg:rounded-2xl lg:border border-[var(--border)] lg:shadow-sm overflow-hidden -mx-4 sm:-mx-6 lg:mx-0 border-y sm:border-y-0">
                
                {/* Mobile Profile Header */}
                {user && (
                  <div className="lg:hidden p-5 border-b border-[var(--border)] flex items-center gap-4 bg-[var(--cream-dark)]/30">
                    <div className="w-14 h-14 bg-white border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--spice)] text-2xl font-heading font-bold shadow-sm shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-lg text-[var(--bark)] truncate">{user.name}</p>
                      <p className="text-sm text-[var(--gray-500)] truncate tracking-tight">{user.email}</p>
                    </div>
                  </div>
                )}

                {/* Navigation Links - Flex wrap for tiled block layout on mobile, vertical sidebar on desktop */}
                <nav className="flex flex-wrap lg:flex-col bg-white shadow-inner lg:shadow-none border-b border-[var(--border)] lg:border-b-0">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex-1 min-w-[140px] flex items-center justify-center lg:justify-start gap-2 lg:gap-3 px-3 py-3.5 sm:px-4 lg:px-6 lg:py-4 text-xs sm:text-sm font-semibold transition-all text-center lg:text-left",
                          "border-r border-t lg:border-t-0 lg:border-r-0 lg:border-b lg:border-b-[var(--border)] lg:border-l-[3px] border-[var(--border)]",
                          isActive 
                            ? "text-[var(--spice)] bg-[var(--spice)]/5 lg:border-l-[var(--spice)]"
                            : "text-[var(--bark-light)] lg:border-l-transparent hover:text-[var(--spice)] hover:bg-[var(--spice)]/5"
                        )}
                      >
                        <item.icon className={cn("w-4 h-4 lg:w-[18px] lg:h-[18px]", isActive ? "text-[var(--spice)]" : "text-[var(--gray-400)]")} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    )
                  })}
                  <button 
                    onClick={logout}
                    className="flex-1 min-w-[140px] flex items-center justify-center lg:justify-start gap-2 lg:gap-3 px-3 py-3.5 sm:px-4 lg:px-6 lg:py-4 text-xs sm:text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors border-r border-t lg:border-t-0 lg:border-r-0 lg:border-b lg:border-b-[var(--border)] lg:border-l-[3px] lg:border-l-transparent border-[var(--border)] text-center lg:text-left"
                  >
                    <LogOut className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-red-400" />
                    <span className="truncate">Sign Out</span>
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main content */}
            <main className="lg:col-span-3 pb-20">{children}</main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
