import { users } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Users, TrendingUp, ShoppingBag } from "lucide-react";

export default function AdminCustomersPage() {
  const customers = users.filter((u) => u.role === "customer");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Customers</h1>
        <p className="text-[var(--gray-500)] mt-1">{customers.length} registered customers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: Users, label: "Total Customers", value: customers.length, color: "#6366f1" },
          { icon: ShoppingBag, label: "Total Orders", value: customers.reduce((s, c) => s + (c.orderCount ?? 0), 0), color: "var(--spice)" },
          { icon: TrendingUp, label: "Total Revenue", value: formatPrice(customers.reduce((s, c) => s + (c.totalSpent ?? 0), 0)), color: "var(--herb)" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-[var(--border)] shadow-sm">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}20` }}>
              <Icon size={20} style={{ color }} />
            </div>
            <p className="font-display font-bold text-2xl text-[var(--bark)]">{value}</p>
            <p className="text-xs text-[var(--gray-400)] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
            <tr>
              {["Customer", "Email", "Phone", "Orders", "Total Spent", "Joined"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-[var(--gray-50)] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-[var(--spice)] to-[var(--spice-dark)] rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {customer.name.charAt(0)}
                    </div>
                    <p className="font-medium text-[var(--bark)]">{customer.name}</p>
                  </div>
                </td>
                <td className="px-5 py-4 text-[var(--gray-500)]">{customer.email}</td>
                <td className="px-5 py-4 text-[var(--gray-500)]">{customer.phone ?? "—"}</td>
                <td className="px-5 py-4 font-semibold text-[var(--bark)]">{customer.orderCount ?? 0}</td>
                <td className="px-5 py-4 font-bold text-[var(--spice)]">
                  {formatPrice(customer.totalSpent ?? 0)}
                </td>
                <td className="px-5 py-4 text-[var(--gray-400)]">{customer.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
