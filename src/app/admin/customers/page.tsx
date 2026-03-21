"use client";

import { Users, TrendingUp, ShoppingBag } from "lucide-react";
import { users } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { User } from "@/lib/types";

const columns: ColumnDef<User>[] = [
  {
    header: "Customer",
    accessorKey: "name",
    sortable: true,
    cell: (customer) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[var(--spice)] to-[var(--spice-dark)] rounded-md flex items-center justify-center text-white text-base font-bold shadow-inner shrink-0">
          {customer.name.charAt(0)}
        </div>
        <p className="font-bold text-[var(--bark)] tracking-tight">{customer.name}</p>
      </div>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
    sortable: true,
    cell: (customer) => <span className="text-sm font-medium text-[var(--gray-500)]">{customer.email}</span>,
  },
  {
    header: "Phone",
    accessorKey: "phone",
    sortable: false,
    cell: (customer) => <span className="text-sm font-medium text-[var(--gray-500)]">{customer.phone ?? "—"}</span>,
  },
  {
    header: "Orders",
    accessorKey: "orderCount",
    sortable: true,
    cell: (customer) => (
      <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 rounded bg-[var(--cream)] border border-[var(--border)] font-bold text-[var(--bark)] text-xs">
        {customer.orderCount ?? 0}
      </span>
    ),
  },
  {
    header: "Total Spent",
    accessorKey: "totalSpent",
    sortable: true,
    cell: (customer) => <span className="font-black text-[var(--spice)]">{formatPrice(customer.totalSpent ?? 0)}</span>,
  },
  {
    header: "Joined",
    accessorKey: "createdAt",
    sortable: true,
    cell: (customer) => <span className="text-xs font-semibold uppercase tracking-wider text-[var(--gray-400)]">{customer.createdAt}</span>,
  },
];

export default function AdminCustomersPage() {
  const customers = users.filter((u) => u.role === "customer");

  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)] leading-tight">Customers</h1>
        <p className="text-sm font-medium text-[var(--gray-500)] mt-1">{customers.length} registered customers</p>
      </div>

      {/* Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { icon: Users, label: "Total Customers", value: customers.length, color: "#6366f1" },
          { icon: ShoppingBag, label: "Total Orders", value: customers.reduce((s, c) => s + (c.orderCount ?? 0), 0), color: "var(--spice)" },
          { icon: TrendingUp, label: "Total Revenue", value: formatPrice(customers.reduce((s, c) => s + (c.totalSpent ?? 0), 0)), color: "var(--herb)" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-md p-5 border border-[var(--border)] shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ background: `${color}15` }}>
                <Icon size={24} style={{ color }} />
              </div>
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-[var(--bark)] leading-none mb-1">{value}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--gray-400)]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <AdminDataTable 
        data={customers} 
        columns={columns} 
        searchAccessor="name" 
        searchPlaceholder="Search customers by name..." 
        itemsPerPage={10}
      />
    </div>
  );
}
