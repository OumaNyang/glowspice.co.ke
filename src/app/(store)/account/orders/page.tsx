import Link from "next/link";
import Image from "next/image";
import { orders } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight } from "lucide-react";

const statusVariant: Record<string, "success" | "warning" | "herb" | "error" | "default"> = {
  delivered: "success",
  shipped: "herb",
  processing: "warning",
  confirmed: "warning",
  pending: "default",
  cancelled: "error",
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-3xl text-[var(--bark)]">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-md border border-[var(--border)] overflow-hidden">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[var(--border)] bg-[var(--cream)]">
              <div>
                <p className="font-bold text-sm text-[var(--bark)]">{order.orderNumber}</p>
                <p className="text-xs text-[var(--gray-400)] mt-0.5">{order.createdAt}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusVariant[order.status] ?? "default"} className="capitalize">
                  {order.status}
                </Badge>
                <span className="font-display font-bold text-[var(--spice)]">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
            {/* Items */}
            <div className="px-5 py-4 space-y-3">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[var(--cream-dark)] shrink-0">
                    <Image
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      fill className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--bark)] truncate">{item.product.name}</p>
                    <p className="text-xs text-[var(--gray-400)]">Qty: {item.quantity} · {item.product.unit}</p>
                  </div>
                  <p className="text-sm font-bold text-[var(--spice)] shrink-0">{formatPrice(item.subtotal)}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-[var(--border)] flex justify-between items-center">
              <p className="text-xs text-[var(--gray-400)]">
                Paid via {order.paymentMethod}
              </p>
              <Link
                href={`/account/orders/${order.id}`}
                className="flex items-center gap-1 text-sm text-[var(--spice)] font-semibold hover:underline"
              >
                Details <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
