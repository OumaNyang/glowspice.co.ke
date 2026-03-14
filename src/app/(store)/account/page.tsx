import Link from "next/link";
import { Package, Heart, TrendingUp, Clock } from "lucide-react";
import { orders } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const statusVariant: Record<string, "success" | "warning" | "spice" | "herb" | "error" | "default"> = {
  delivered: "success",
  shipped: "herb",
  processing: "warning",
  confirmed: "warning",
  pending: "default",
  cancelled: "error",
};

export default function AccountDashboardPage() {
  const recentOrders = orders.slice(0, 3);
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-3xl text-[var(--bark)]">My Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { icon: Package, label: "Total Orders", value: orders.length, color: "var(--spice)" },
          { icon: TrendingUp, label: "Total Spent", value: formatPrice(totalSpent), color: "var(--herb)" },
          { icon: Heart, label: "Wishlist", value: "5 items", color: "var(--spice)" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-md p-5 border border-[var(--border)]">
            <div className="w-10 h-10 rounded-md flex items-center justify-center mb-3" style={{ background: `${color}20` }}>
              <Icon size={20} style={{ color }} />
            </div>
            <p className="text-xs text-[var(--gray-400)] mb-1">{label}</p>
            <p className="font-display font-bold text-xl text-[var(--bark)]">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-md border border-[var(--border)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h2 className="font-semibold text-[var(--bark)]">Recent Orders</h2>
          <Link href="/account/orders" className="text-sm text-[var(--spice)] font-semibold hover:underline">
            View All
          </Link>
        </div>
        {recentOrders.map((order) => (
          <div key={order.id} className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] last:border-0">
            <div>
              <p className="font-semibold text-sm text-[var(--bark)]">{order.orderNumber}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Clock size={11} className="text-[var(--gray-400)]" />
                <p className="text-xs text-[var(--gray-400)]">{order.createdAt}</p>
                <span className="text-[var(--gray-300)]">·</span>
                <p className="text-xs text-[var(--gray-400)]">{order.items.length} items</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-[var(--spice)]">{formatPrice(order.total)}</p>
              <Badge variant={statusVariant[order.status] ?? "default"} className="mt-1 capitalize">
                {order.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
