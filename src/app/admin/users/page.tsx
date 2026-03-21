"use client";

import { ShieldCheck, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";

type AdminUser = { id: number; name: string; email: string; role: string; status: string; };

const admins: AdminUser[] = [
  { id: 1, name: "System Admin", email: "admin@glowspice.co.ke", role: "Super Admin", status: "Active" },
  { id: 2, name: "Support Agent", email: "support@glowspice.co.ke", role: "Moderator", status: "Active" },
];

const columns: ColumnDef<AdminUser>[] = [
  {
    header: "User",
    accessorKey: "name",
    sortable: true,
    cell: (u) => (
      <span className="flex items-center gap-2 font-bold text-[var(--bark)]">
        <ShieldCheck size={16} className={u.role === "Super Admin" ? "text-amber-500" : "text-[var(--spice)]"} />
        {u.name}
      </span>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
    sortable: true,
    cell: (u) => <span className="text-sm font-medium text-[var(--gray-500)]">{u.email}</span>,
  },
  {
    header: "Role",
    accessorKey: "role",
    sortable: true,
    cell: (u) => <Badge variant={u.role === "Super Admin" ? "spice" : "default"}>{u.role}</Badge>,
  },
  {
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: (u) => <Badge variant="success" className="uppercase tracking-wider font-bold text-[10px] shadow-sm">{u.status}</Badge>,
  },
  {
    header: "Action",
    cell: () => (
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-50 border border-red-200 text-xs font-bold text-red-600 hover:bg-red-100 hover:shadow-sm transition-all">
        Revoke Access
      </button>
    ),
  },
];

export default function AdminUsersPage() {
  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-[var(--bark)] leading-tight">Admin Users</h1>
          <p className="text-sm font-medium text-[var(--gray-500)] mt-1">Manage platform access and roles.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bark)] hover:bg-[var(--bark-dark)] text-white font-bold rounded-md shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all text-sm">
          <Plus size={18} /> Invite User
        </button>
      </div>

      <AdminDataTable 
        data={admins} 
        columns={columns} 
        searchAccessor="name" 
        searchPlaceholder="Search admins by name..." 
        itemsPerPage={10}
      />
    </div>
  );
}
