"use client";

import { ShieldCheck, Ban, Edit2, CheckCircle2, Plus, KeyRound, Mail } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { toggleBlockAdmin, createAdmin, updateAdmin, sendAdminPasswordReset } from "@/app/actions/admin_management";
import { toast } from "sonner";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

interface AdminUserData {
  id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  status: string;
  createdAt: string;
}

interface AdminUserTableProps {
  admins: AdminUserData[];
  currentAdminId: string;
  currentAdminRole: string;
}

export default function AdminUserTable({ admins: initialAdmins, currentAdminId, currentAdminRole }: AdminUserTableProps) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isSuperAdmin = currentAdminRole === "SUPER_ADMIN";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "ADMIN",
    password: "",
  });

  const handleOpenModal = (admin?: AdminUserData) => {
    if (!isSuperAdmin) {
      toast.error("Only Super Admins can manage other admins.");
      return;
    }

    if (admin) {
      setEditingAdmin(admin);
      setFormData({
        name: admin.name,
        email: admin.email,
        role: admin.role,
        password: "",
      });
    } else {
      setEditingAdmin(null);
      setFormData({ name: "", email: "", role: "ADMIN", password: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingAdmin) {
        const res = await updateAdmin(currentAdminId, editingAdmin.id, {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        });
        if (res.error) throw new Error(res.error);
        setAdmins(prev => prev.map(a => a.id === editingAdmin.id ? { ...a, ...formData } : a));
        toast.success("Admin updated successfully");
      } else {
        const res = await createAdmin(currentAdminId, formData);
        if (res.error) throw new Error(res.error);
        window.location.reload();
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleBlock = async (id: string) => {
    if (!isSuperAdmin) {
      toast.error("Only Super Admins can block other admins.");
      return;
    }

    try {
      const res = await toggleBlockAdmin(currentAdminId, id);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setAdmins(prev => prev.map(a => a.id === id ? { ...a, isBlocked: !!res.isBlocked } : a));
      toast.success(`Admin ${res.isBlocked ? 'blocked' : 'unblocked'} successfully.`);
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const handleResetPassword = async (id: string) => {
    const res = await sendAdminPasswordReset(currentAdminId, id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Password reset instructions sent to email.");
    }
  };

  const columns: ColumnDef<AdminUserData>[] = [
    {
      header: "Administrator",
      accessorKey: "name",
      sortable: true,
      cell: (u) => (
        <span className={`flex items-center gap-3 font-bold ${u.isBlocked ? 'text-gray-400 line-through' : 'text-[var(--bark)]'}`}>
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-black shadow-sm ${u.role === "SUPER_ADMIN" ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-gradient-to-br from-[var(--spice)] to-[var(--spice-dark)]'}`}>
            {u.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 leading-tight">
              {u.name}
              {u.role === "SUPER_ADMIN" && <ShieldCheck size={14} className="text-amber-500" />}
            </span>
            {u.isBlocked && <span className="text-[9px] text-red-500 uppercase font-black">Account Suspended</span>}
          </div>
        </span>
      ),
    },
    {
      header: "Contact Info",
      accessorKey: "email",
      sortable: true,
      cell: (u) => (
        <span className={`flex items-center gap-1.5 text-sm font-medium ${u.isBlocked ? 'text-gray-300' : 'text-[var(--gray-500)]'}`}>
          <Mail size={14} className="opacity-40" />
          {u.email}
        </span>
      ),
    },
    {
      header: "Role Policy",
      accessorKey: "role",
      sortable: true,
      cell: (u) => (
        <Badge variant={u.role === "SUPER_ADMIN" ? "spice" : "default"} className="px-3 py-1 rounded-md text-[10px] tracking-widest font-black transition-all hover:scale-105 active:scale-95">
          {(u.role || "ADMIN").replace('_', ' ')}
        </Badge>
      ),
    },
    {
      header: "Access Status",
      accessorKey: "isBlocked" as any,
      sortable: true,
      cell: (u) => (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border ${u.isBlocked ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${u.isBlocked ? 'bg-red-600' : 'bg-green-600'}`} />
          {u.isBlocked ? 'Blocked' : 'Active'}
        </div>
      ),
    },
    {
      header: "Governance Actions",
      cell: (u) => {
        const canManage = isSuperAdmin && u.id !== currentAdminId;
        return (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleOpenModal(u)}
              disabled={!canManage}
              className={`p-2 rounded-xl transition-all ${canManage ? 'hover:bg-[var(--gray-100)] text-[var(--gray-400)] hover:text-[var(--spice)] hover:rotate-12' : 'opacity-20 cursor-not-allowed'}`}
              title="Edit Admin"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => handleResetPassword(u.id)}
              disabled={!canManage}
              className={`p-2 rounded-xl transition-all ${canManage ? 'hover:bg-blue-50 text-[var(--gray-400)] hover:text-blue-600 hover:-translate-y-0.5' : 'opacity-20 cursor-not-allowed'}`}
              title="Send Password Reset"
            >
              <KeyRound size={16} />
            </button>
            <button 
              onClick={() => handleToggleBlock(u.id)}
              disabled={!canManage}
              className={`p-2 rounded-xl transition-all ${!canManage ? 'opacity-20 cursor-not-allowed' : u.isBlocked ? 'text-green-600 hover:bg-green-50 shadow-inner' : 'text-red-600 hover:bg-red-50 shadow-inner'} hover:scale-110 active:scale-90`}
              title={u.isBlocked ? 'Unblock' : 'Block'}
            >
              {u.isBlocked ? <CheckCircle2 size={16} /> : <Ban size={16} />}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-md   border-none shadow-sm overflow-hidden min-h-[400px]">
        <div className="px-4 py-2 border-b border-[var(--gray-100)] flex items-center justify-between bg-[var(--gray-50)]/50">
          <h2 className="text-xl font-black text-[var(--bark)] tracking-tight">Team Members</h2>
          {isSuperAdmin && (
            <button 
              onClick={() => handleOpenModal()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bark)] text-white rounded-lg font-bold hover:bg-[var(--bark-dark)] transition-all shadow-md shadow-gray-200"
            >
              <Plus size={18} />
              Add Admin
            </button>
          )}
        </div>
        <div className="p-0">
          <AdminDataTable 
            data={admins} 
            columns={columns} 
            searchAccessor="name" 
            searchPlaceholder="Search admins by name..." 
            itemsPerPage={10}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingAdmin ? "Edit Admin" : "Add New Admin"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-[var(--gray-500)] uppercase tracking-widest">Full Name</label>
            <input 
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all font-medium text-[var(--bark)]"
              placeholder="e.g. Admin User"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-[var(--gray-500)] uppercase tracking-widest">Email Address</label>
            <input 
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all font-medium text-[var(--bark)]"
              placeholder="admin@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-[var(--gray-500)] uppercase tracking-widest">Role</label>
            <select 
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all font-medium text-[var(--bark)] bg-white"
            >
              <option value="ADMIN">Standard Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>
          {!editingAdmin && (
            <div className="space-y-2">
              <label className="text-xs font-black text-[var(--gray-500)] uppercase tracking-widest">Password</label>
              <input 
                required={!editingAdmin}
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all font-medium text-[var(--bark)]"
                placeholder="••••••••"
              />
            </div>
          )}
          <div className="pt-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[var(--spice)] text-white rounded-xl font-black text-lg hover:bg-[var(--spice-dark)] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Processing..." : editingAdmin ? "Update Admin" : "Create Admin"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
