import { ShieldCheck, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function AdminUsersPage() {
  const admins = [
    { id: 1, name: "System Admin", email: "admin@glowspice.co.ke", role: "Super Admin", status: "Active" },
    { id: 2, name: "Support Agent", email: "support@glowspice.co.ke", role: "Moderator", status: "Active" },
  ];

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Admin Users</h1>
          <p className="text-[var(--gray-500)] mt-1">Manage platform access and roles.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--bark)] hover:bg-[var(--bark-dark)] text-white font-semibold rounded-md text-sm transition-colors shadow-sm">
          <Plus size={16} /> Invite User
        </button>
      </div>

      <div className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
              <tr>
                {["User", "Email", "Role", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-[var(--gray-50)]">
                  <td className="px-5 py-4 font-medium text-[var(--bark)] flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[var(--spice)]"/> {admin.name}
                  </td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{admin.email}</td>
                  <td className="px-5 py-4"><Badge variant="default">{admin.role}</Badge></td>
                  <td className="px-5 py-4"><Badge variant="success">{admin.status}</Badge></td>
                  <td className="px-5 py-4">
                    <button className="text-[var(--spice)] font-semibold text-xs hover:underline">Revoke Access</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
