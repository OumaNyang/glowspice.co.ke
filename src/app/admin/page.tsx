import Link from "next/link";
import { TrendingUp, ShoppingBag, Users, Package, ArrowUpRight } from "lucide-react";
import { dashboardStats, orders } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const statusVariant: Record<string, "success" | "warning" | "herb" | "error" | "default"> = {
  delivered: "success",
  shipped: "herb",
  processing: "warning",
  confirmed: "warning",
  pending: "default",
  cancelled: "error",
};

export default function AdminDashboardPage() {
  const stats = dashboardStats;

  const statCards = [
    {
      label: "Total Revenue",
      value: formatPrice(stats.totalRevenue),
      change: `+${stats.revenueChange}%`,
      icon: TrendingUp,
      color: "var(--spice)",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      change: `+${stats.ordersChange}%`,
      icon: ShoppingBag,
      color: "var(--herb)",
    },
    {
      label: "Customers",
      value: stats.totalCustomers,
      change: `+${stats.customersChange}%`,
      icon: Users,
      color: "#6366f1",
    },
    {
      label: "Products",
      value: stats.totalProducts,
      change: "Active",
      icon: Package,
      color: "var(--bark-light)",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Dashboard</h1>
        <p className="text-[var(--gray-500)] mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-[var(--border)] shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${color}20` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <span className="text-xs font-semibold text-[var(--herb)] bg-[var(--herb)]/10 px-2 py-0.5 rounded-full">
                {change}
              </span>
            </div>
            <p className="font-display font-bold text-2xl text-[var(--bark)] mb-0.5">{value}</p>
            <p className="text-xs text-[var(--gray-400)]">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <h2 className="font-semibold text-[var(--bark)]">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-sm text-[var(--spice)] font-semibold hover:underline"
          >
            View All <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
              <tr>
                {["Order", "Customer", "Items", "Total", "Payment", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--gray-50)] transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/orders/${order.id}`} className="font-medium text-[var(--spice)] hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-[var(--bark)]">{order.customer.name}</td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{order.items.length}</td>
                  <td className="px-5 py-4 font-bold text-[var(--bark)]">{formatPrice(order.total)}</td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{order.paymentMethod}</td>
                  <td className="px-5 py-4">
                    <Badge variant={statusVariant[order.status] ?? "default"} className="capitalize">
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-[var(--gray-400)]">{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
