"use client";

import { Menu, Bell, User as UserIcon, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

interface AdminHeaderProps {
  onOpenSidebar: () => void;
  title?: string;
}

export function AdminHeader({ onOpenSidebar, title = "Dashboard" }: AdminHeaderProps) {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[var(--border)] shadow-sm shrink-0">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        
        {/* Mobile menu & generic title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden text-[var(--gray-500)] hover:text-[var(--bark)] transition-colors p-1"
          >
            <Menu size={24} />
          </button>
          <h1 className="font-display font-bold text-xl text-[var(--bark)] truncate">
            {title}
          </h1>
        </div>

        {/* Action icons / Profile */}
        <div className="flex items-center gap-4">
          <button className="relative w-9 h-9 flex items-center justify-center text-[var(--gray-500)] hover:text-[var(--spice)] hover:bg-[var(--cream-dark)] rounded-full transition-colors hidden sm:flex">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>

          <div className="h-6 w-px bg-[var(--border)] hidden sm:block mx-2" />

          <div className="flex items-center gap-3 group relative cursor-pointer">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-[var(--bark)] leading-none mb-1">{user?.name || "Admin User"}</p>
              <p className="text-[10px] font-semibold text-[var(--spice)] uppercase tracking-widest">{user?.role || "Administrator"}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[var(--spice)]/10 text-[var(--spice)] flex items-center justify-center font-bold font-heading border border-[var(--spice)]/20 shadow-inner">
              {user?.name?.charAt(0) || "A"}
            </div>

            {/* Dropdown placeholder (simulated on hover for now) */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[var(--border)] rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-right z-50 overflow-hidden text-left">
              <Link href="/admin/settings" className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-[var(--bark-light)] hover:bg-[var(--cream)] hover:text-[var(--spice)] border-b border-[var(--border)] transition-colors">
                <UserIcon size={16} /> My Account
              </Link>
              <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left">
                <LogOut size={16} className="text-red-400" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
