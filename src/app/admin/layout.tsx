"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[var(--gray-50)]">{children}</div>;
  }

  return (
    <AuthGuard isAdmin>
      <div className="flex min-h-screen bg-[var(--gray-50)] overflow-hidden">
        
        {/* Sidebar handles both desktop and mobile slide-over inherently */}
        <AdminSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <AdminHeader onOpenSidebar={() => setSidebarOpen(true)} />
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-6 custom-scrollbar">
            {children}
          </div>
        </main>

      </div>
    </AuthGuard>
  );
}
