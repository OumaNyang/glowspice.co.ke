import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import AdminUserTable from "@/components/admin/users/AdminUserTable";

export default async function AdminUsersPage() {
  const admins = await prisma.admin.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // For real implementation, you'd get this from the session/auth store server-side
  const currentAdmin = admins.find(a => a.role === "SUPER_ADMIN") || admins[0];

  const formattedAdmins = admins.map(admin => ({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    isBlocked: admin.isBlocked,
    status: admin.isBlocked ? "Blocked" : "Active",
    createdAt: admin.createdAt.toISOString().split('T')[0],
  }));

  return (
    <div className="p-6 sm:p-10 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-8 bg-[var(--spice)] rounded-full" />
            <h1 className="font-display font-black text-4xl text-[var(--bark)] tracking-tight">Administrative Team</h1>
          </div>
          <p className="text-sm font-bold text-[var(--gray-400)] uppercase tracking-[0.2em] ml-4">
            Platform Governance & Access Control
          </p>
        </div>
        
        {/* The Add Admin button is now inside the AdminUserTable header for better state management */}
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--spice)]/20 to-[var(--bark)]/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-[var(--gray-100)] shadow-2xl shadow-black/5 overflow-hidden">
          <AdminUserTable 
            admins={formattedAdmins} 
            currentAdminId={currentAdmin?.id || ""} 
            currentAdminRole={currentAdmin?.role || "ADMIN"} 
          />
        </div>
      </div>
    </div>
  );
}
