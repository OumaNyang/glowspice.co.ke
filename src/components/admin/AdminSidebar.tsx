"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Leaf,
  Settings,
  Heart,
  CreditCard,
  ShieldCheck,
  X,
  FolderTree,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Catalogue", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/wishlists", label: "Wishlists", icon: Heart },
  { href: "/admin/users", label: "Admin Users", icon: ShieldCheck },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )} 
        onClick={onClose} 
      />

      <aside 
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-[var(--bark)] text-white flex flex-col shrink-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[var(--spice)] rounded-md flex items-center justify-center">
              <Leaf size={18} />
            </div>
            <div>
              <p className="font-display font-bold text-base text-white leading-none">
                GlowSpice
              </p>
              <p className="text-[10px] text-[var(--spice-light)] uppercase tracking-widest mt-0.5 font-bold">
                Admin
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center text-white/50 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md text-md font-bold transition-all duration-200 group relative overflow-hidden",
                  active
                    ? "text-white bg-[var(--spice)] shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                )}
                <item.icon size={18} className={cn("shrink-0", active ? "text-white" : "group-hover:text-[var(--spice-light)] transition-colors")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout Action */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-white/60 hover:text-white hover:bg-red-500/20 transition-colors group"
          >
            <LogOut size={18} className="shrink-0 group-hover:text-red-400 transition-colors" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
