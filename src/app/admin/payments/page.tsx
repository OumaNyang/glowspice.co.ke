"use client";

import { CreditCard, ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";

type Payment = { id: string; method: string; amount: number; status: string; date: string; };

const dummyPayments: Payment[] = [
  { id: "PAY-1029", method: "M-Pesa", amount: 4500, status: "completed", date: "2023-11-20 14:30" },
  { id: "PAY-1030", method: "Credit Card", amount: 12000, status: "completed", date: "2023-11-20 15:15" },
  { id: "PAY-1031", method: "M-Pesa", amount: 800, status: "failed", date: "2023-11-20 16:05" },
  { id: "PAY-1032", method: "Cash on Delivery", amount: 5600, status: "pending", date: "2023-11-21 09:20" },
];

const columns: ColumnDef<Payment>[] = [
  {
    header: "Transaction ID",
    accessorKey: "id",
    sortable: true,
    cell: (pay) => <span className="font-bold text-[var(--bark)] tracking-tight">{pay.id}</span>,
  },
  {
    header: "Method",
    accessorKey: "method",
    sortable: true,
    cell: (pay) => (
      <span className="flex items-center gap-2 text-sm font-semibold text-[var(--gray-500)]">
        <CreditCard size={14} className="text-[var(--spice)]" /> {pay.method}
      </span>
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    sortable: true,
    cell: (pay) => <span className="font-black text-[var(--spice)]">{formatPrice(pay.amount)}</span>,
  },
  {
    header: "Status",
    accessorKey: "status",
    sortable: true,
    cell: (pay) => (
      <Badge variant={pay.status === "completed" ? "success" : pay.status === "failed" ? "error" : "warning"} className="uppercase tracking-wider font-bold text-[10px] shadow-sm">
        {pay.status}
      </Badge>
    ),
  },
  {
    header: "Date",
    accessorKey: "date",
    sortable: true,
    cell: (pay) => <span className="text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wider">{pay.date}</span>,
  },
  {
    header: "Action",
    cell: () => (
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-[var(--border)] text-xs font-bold text-[var(--bark)] hover:bg-[var(--cream-dark)] hover:border-[var(--bark-light)] hover:shadow-sm transition-all">
        <ArrowUpRight size={14} className="text-[var(--spice)]" /> View
      </button>
    ),
  },
];

export default function AdminPaymentsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)] leading-tight">Payments</h1>
        <p className="text-sm font-medium text-[var(--gray-500)] mt-1">Manage and track all transactions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: "Total Processed", value: "KES 542,000", color: "var(--spice)" },
          { label: "Pending Escrow", value: "KES 12,500", color: "var(--herb)" },
          { label: "Failed Transactions", value: "3", color: "red" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-md p-5 border border-[var(--border)] shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--gray-400)] mb-1">{stat.label}</p>
            <p className="font-display font-bold text-3xl" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <AdminDataTable 
        data={dummyPayments} 
        columns={columns} 
        searchAccessor="id" 
        searchPlaceholder="Search by Transaction ID (e.g. PAY-1030)..." 
        itemsPerPage={10}
      />
    </div>
  );
}
