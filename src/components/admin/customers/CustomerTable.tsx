"use client";

import { Users, TrendingUp, ShoppingBag, MoreVertical, Ban, Edit2, CheckCircle2, Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { toggleBlockUser, createCustomer, updateCustomer, sendUserPasswordReset } from "@/app/actions/admin_management";
import { toast } from "sonner";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Mail, KeyRound } from "lucide-react";

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  orderCount: number;
  totalSpent: number;
  createdAt: string;
  isBlocked: boolean;
}

export default function CustomerTable({ customers: initialCustomers }: { customers: CustomerData[] }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleOpenModal = (customer?: CustomerData) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone || "",
        password: "", // Don't show password on edit
      });
    } else {
      setEditingCustomer(null);
      setFormData({ name: "", email: "", phone: "", password: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingCustomer) {
        const res = await updateCustomer(editingCustomer.id, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        });
        if (res.error) throw new Error(res.error);
        setCustomers(prev => prev.map(c => c.id === editingCustomer.id ? { ...c, ...formData } : c));
        toast.success("Customer updated successfully");
      } else {
        const res = await createCustomer(formData);
        if (res.error) throw new Error(res.error);
        // Refresh or add to list (simplified: just reload or append)
        window.location.reload(); // Easier for now to ensure all data is consistent
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleBlock = async (id: string) => {
    try {
      const res = await toggleBlockUser(id);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setCustomers(prev => prev.map(c => c.id === id ? { ...c, isBlocked: !!res.isBlocked } : c));
      toast.success(`Customer ${res.isBlocked ? 'blocked' : 'unblocked'} successfully.`);
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };
  const handleResetPassword = async (id: string) => {
    const res = await sendUserPasswordReset(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Password reset instructions sent to email.");
    }
  };

  const columns: ColumnDef<CustomerData>[] = [
    {
      header: "Customer Personal",
      accessorKey: "name",
      sortable: true,
      cell: (customer) => (
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white text-base font-black shadow-md shrink-0 ${customer.isBlocked ? 'bg-gray-400' : 'bg-gradient-to-br from-[var(--spice)] to-[var(--spice-dark)]'}`}>
            {customer.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <p className={`font-black tracking-tight leading-tight ${customer.isBlocked ? 'text-gray-400 line-through' : 'text-[var(--bark)]'}`}>{customer.name}</p>
            <span className="text-[11px] font-medium text-[var(--gray-400)] flex items-center gap-1">
              <Mail size={10} />
              {customer.email}
            </span>
            {customer.isBlocked && <span className="text-[9px] font-black text-red-500 uppercase tracking-tighter">Access Revoked</span>}
          </div>
        </div>
      ),
    },
    {
      header: "Membership Status",
      accessorKey: "isBlocked" as any,
      sortable: true,
      cell: (customer) => (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${customer.isBlocked ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${customer.isBlocked ? 'bg-red-600' : 'bg-green-600'}`} />
          {customer.isBlocked ? 'Blocked' : 'Verified'}
        </span>
      ),
    },
    {
      header: "Engagement",
      accessorKey: "totalSpent" as any,
      sortable: true,
      cell: (customer) => (
        <div className="flex flex-col">
          <span className={`font-black text-lg ${customer.isBlocked ? 'text-gray-300' : 'text-[var(--spice)]'}`}>{formatPrice(customer.totalSpent ?? 0)}</span>
          <span className="text-[10px] font-bold text-[var(--gray-400)] uppercase">{customer.orderCount} Orders total</span>
        </div>
      ),
    },
    {
      header: "Relationship Actions",
      cell: (customer) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleOpenModal(customer)}
            className="p-2.5 rounded-md hover:bg-[var(--gray-100)] text-[var(--gray-400)] hover:text-[var(--spice)] transition-all hover:scale-110"
            title="Edit Profile"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => handleResetPassword(customer.id)}
            className="p-2.5 rounded-md hover:bg-blue-50 text-[var(--gray-400)] hover:text-blue-600 transition-all hover:scale-110"
            title="Reset Password"
          >
            <KeyRound size={16} />
          </button>
          <button 
            onClick={() => handleToggleBlock(customer.id)}
            className={`p-2.5 rounded-md transition-all ${customer.isBlocked ? 'text-green-600 hover:bg-green-50 shadow-inner' : 'text-red-600 hover:bg-red-50 shadow-inner'} hover:scale-110 active:scale-95`}
            title={customer.isBlocked ? 'Restore Access' : 'Suspend Account'}
          >
            {customer.isBlocked ? <CheckCircle2 size={16} /> : <Ban size={16} />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white px-4 py-2 rounded-md border border-[var(--gray-100)] shadow-sm group hover:border-[var(--spice-light)] transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-orange-50 rounded-md text-[var(--spice)] group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <p className="text-[var(--gray-500)] text-sm font-bold uppercase tracking-wider">Total Customers</p>
          <h3 className="text-xl font-black text-[var(--bark)] mt-1">{customers.length}</h3>
        </div>

        <div className="bg-white px-4 py-2 rounded-md border border-[var(--gray-100)] shadow-sm group hover:border-[var(--spice-light)] transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-blue-50 rounded-md text-blue-600 group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} />
            </div>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <p className="text-[var(--gray-500)] text-sm font-bold uppercase tracking-wider">Total Orders</p>
          <h3 className="text-xl font-black text-[var(--bark)] mt-1">
            {customers.reduce((sum, c) => sum + (c.orderCount || 0), 0)}
          </h3>
        </div>

        <div className="bg-white px-4 py-2 rounded-md border border-[var(--gray-100)] shadow-sm group hover:border-[var(--spice-light)] transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="p-3 bg-green-50 rounded-md text-green-600 group-hover:scale-110 transition-transform">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12.5%</span>
          </div>
          <p className="text-[var(--gray-500)] text-sm font-bold uppercase tracking-wider">Total Revenue</p>
          <h3 className="text-xl font-black text-[var(--bark)] mt-1">
            {formatPrice(customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0))}
          </h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-md border border-none shadow-none overflow-hidden min-h-[500px]">
        <div className="px-4 py-2 border-b border-[var(--gray-100)] flex items-center justify-between bg-[var(--gray-50)]/50">
          <h2 className="text-xl font-black text-[var(--bark)] tracking-tight">All Customers</h2>
          <button 
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--spice)] text-white rounded-md font-bold hover:bg-[var(--spice-dark)] transition-all "
          >
            <Plus size={18} />
            Add Customer
          </button>
        </div>
        <div className="p-0">
          <AdminDataTable 
            data={customers} 
            columns={columns} 
            searchAccessor="name" 
            searchPlaceholder="Search customers by name..." 
            itemsPerPage={10}
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingCustomer ? "Edit Customer" : "Add New Customer"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-[var(--gray-500)] uppercase tracking-widest">Full Name</label>
            <input 
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all font-medium text-[var(--bark)]"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-[var(--gray-500)] uppercase tracking-widest">Email Address</label>
            <input 
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all font-medium text-[var(--bark)]"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-[var(--gray-500)] uppercase tracking-widest">Phone Number</label>
            <input 
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all font-medium text-[var(--bark)]"
              placeholder="+254..."
            />
          </div>
          {!editingCustomer && (
            <div className="space-y-2">
              <label className="text-xs font-black text-[var(--gray-500)] uppercase tracking-widest">Password</label>
              <input 
                required={!editingCustomer}
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-[var(--gray-200)] focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all font-medium text-[var(--bark)]"
                placeholder="••••••••"
              />
            </div>
          )}
          <div className="pt-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[var(--bark)] text-white rounded-md font-black text-lg hover:bg-[var(--bark-dark)] transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Processing..." : editingCustomer ? "Update Customer" : "Create Customer"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
