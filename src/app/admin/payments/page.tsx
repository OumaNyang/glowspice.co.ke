import { CreditCard, ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export default function AdminPaymentsPage() {
  const dummyPayments = [
    { id: "PAY-1029", method: "M-Pesa", amount: 4500, status: "completed", date: "2023-11-20 14:30" },
    { id: "PAY-1030", method: "Credit Card", amount: 12000, status: "completed", date: "2023-11-20 15:15" },
    { id: "PAY-1031", method: "M-Pesa", amount: 800, status: "failed", date: "2023-11-20 16:05" },
    { id: "PAY-1032", method: "Cash on Delivery", amount: 5600, status: "pending", date: "2023-11-21 09:20" },
  ];

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Payments</h1>
        <p className="text-[var(--gray-500)] mt-1">Manage and track all transactions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: "Total Processed", value: "KES 542,000", color: "var(--spice)" },
          { label: "Pending Escrow", value: "KES 12,500", color: "var(--herb)" },
          { label: "Failed Transactions", value: "3", color: "red" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-md p-5 border border-[var(--border)] shadow-sm">
            <p className="text-sm text-[var(--gray-500)] mb-1">{stat.label}</p>
            <p className="font-display font-bold text-2xl" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="font-semibold text-[var(--bark)]">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
              <tr>
                {["Transaction ID", "Method", "Amount", "Status", "Date", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {dummyPayments.map((pay) => (
                <tr key={pay.id} className="hover:bg-[var(--gray-50)]">
                  <td className="px-5 py-4 font-medium text-[var(--bark)]">{pay.id}</td>
                  <td className="px-5 py-4 text-[var(--gray-500)] flex items-center gap-2">
                    <CreditCard size={14} /> {pay.method}
                  </td>
                  <td className="px-5 py-4 font-bold text-[var(--bark)]">{formatPrice(pay.amount)}</td>
                  <td className="px-5 py-4">
                    <Badge variant={pay.status === "completed" ? "success" : pay.status === "failed" ? "error" : "warning"} className="capitalize">
                      {pay.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-[var(--gray-400)]">{pay.date}</td>
                  <td className="px-5 py-4">
                    <button className="text-[var(--spice)] hover:underline flex items-center gap-1 text-xs font-semibold"><ArrowUpRight size={12}/> View</button>
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
