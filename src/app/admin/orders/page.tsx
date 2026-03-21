"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { orders } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { Order } from "@/lib/types";

const statusVariant: Record<string, "success" | "warning" | "herb" | "error" | "default"> = {
  delivered: "success",
  shipped: "herb",
  processing: "warning",
  confirmed: "warning",
  pending: "default",
  cancelled: "error",
};

const columns: ColumnDef<Order>[] = [
  {
    header: "Order #",
    accessorKey: "orderNumber",
    sortable: true,
    cell: (order) => <span className="font-bold text-[var(--bark)] tracking-tight">{order.orderNumber}</span>,
  },
  {
    header: "Customer",
    accessorKey: "customerId", // Using ID for sorting, Name for display
    sortable: true,
    cell: (order) => (
      <div>
        <p className="font-bold text-[var(--spice)]">{order.customer.name}</p>
        <p className="text-xs font-medium text-[var(--gray-400)]">{order.customer.email}</p>
      </div>
    ),
  },
  {
    header: "Date",
    accessorKey: "createdAt",
    sortable: true,
    cell: (order) => <span className="text-sm font-medium text-[var(--gray-500)]">{order.createdAt}</span>,
  },
  {
    header: "Items",
    sortable: false,
    cell: (order) => <span className="text-sm font-bold text-[var(--bark)]">{order.items.length} items</span>,
  },
  {
    header: "Total",
    accessorKey: "total",
    sortable: true,
    cell: (order) => <span className="font-black text-[var(--bark)]">{formatPrice(order.total)}</span>,
  },
  {
    header: "Payment",
    accessorKey: "paymentMethod",
    sortable: true,
    cell: (order) => <span className="text-xs font-bold text-[var(--gray-500)] uppercase tracking-wider">{order.paymentMethod}</span>,
  },
  {
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: (order) => (
      <Badge variant={statusVariant[order.status] ?? "default"} className="capitalize font-bold shadow-sm">
        {order.status}
      </Badge>
    ),
  },
  {
    header: "Action",
    cell: (order) => (
      <Link
        href={`/admin/orders/${order.id}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[var(--border)] text-xs font-bold text-[var(--bark)] hover:bg-[var(--cream-dark)] hover:border-[var(--bark-light)] hover:shadow-sm transition-all"
      >
        <Eye size={14} className="text-[var(--spice)]" />
        View
      </Link>
    ),
  },
];

export default function AdminOrdersPage() {
  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)] leading-tight">Orders Hub</h1>
        <p className="text-sm font-medium text-[var(--gray-500)] mt-1">Manage and track {orders.length} active orders</p>
      </div>

      <AdminDataTable 
        data={orders} 
        columns={columns} 
        searchAccessor="orderNumber" 
        searchPlaceholder="Search orders by Order Number (e.g. ORD-100)..." 
        itemsPerPage={10}
      />
    </div>
  );
}
