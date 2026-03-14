import Link from "next/link";
import { orders } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Eye } from "lucide-react";

const statusVariant: Record<string, "success" | "warning" | "herb" | "error" | "default"> = {
  delivered: "success",
  shipped: "herb",
  processing: "warning",
  confirmed: "warning",
  pending: "default",
  cancelled: "error",
};

export default function AdminOrdersPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Orders</h1>
        <p className="text-[var(--gray-500)] mt-1">{orders.length} total orders</p>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${f === "All" ? "bg-[var(--spice)] text-white" : "bg-white border border-[var(--border)] text-[var(--bark-light)] hover:border-[var(--spice)] hover:text-[var(--spice)]"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--border)]">
              <tr>
                {["Order #", "Customer", "Date", "Items", "Total", "Payment", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--gray-50)] transition-colors">
                  <td className="px-5 py-4 font-medium text-[var(--bark)]">{order.orderNumber}</td>
                  <td className="px-5 py-4">
                    <p className="text-[var(--bark)] font-medium">{order.customer.name}</p>
                    <p className="text-xs text-[var(--gray-400)]">{order.customer.email}</p>
                  </td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{order.createdAt}</td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{order.items.length}</td>
                  <td className="px-5 py-4 font-bold text-[var(--bark)]">{formatPrice(order.total)}</td>
                  <td className="px-5 py-4 text-[var(--gray-500)]">{order.paymentMethod}</td>
                  <td className="px-5 py-4">
                    <Badge variant={statusVariant[order.status] ?? "default"} className="capitalize">
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[var(--spice)] hover:underline"
                    >
                      <Eye size={12} />
                      View
                    </Link>
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
