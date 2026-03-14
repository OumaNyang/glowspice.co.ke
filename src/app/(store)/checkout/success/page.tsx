import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
  const orderNumber = "GS-2025-" + Math.floor(Math.random() * 9000 + 1000);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--cream)]">
      <div className="max-w-md w-full mx-auto px-6 text-center space-y-6">
        <div className="w-24 h-24 bg-[var(--herb)]/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={52} className="text-[var(--herb)]" strokeWidth={1.5} />
        </div>

        <div>
          <h1 className="font-display font-bold text-4xl text-[var(--bark)] mb-2">
            Order Placed!
          </h1>
          <p className="text-[var(--gray-500)] text-lg">
            Thank you for your order, we&apos;re preparing it now.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[var(--border)] text-left space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Package size={16} className="text-[var(--spice)] shrink-0" />
            <div>
              <p className="text-[var(--gray-400)]">Order Number</p>
              <p className="font-bold text-[var(--bark)]">{orderNumber}</p>
            </div>
          </div>
          <div className="text-sm">
            <p className="text-[var(--gray-400)]">Estimated Delivery</p>
            <p className="font-semibold text-[var(--bark)]">1–3 Business Days</p>
          </div>
          <div className="text-sm">
            <p className="text-[var(--gray-400)]">Confirmation</p>
            <p className="font-semibold text-[var(--bark)]">Sent to your email & phone</p>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/account/orders"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-semibold rounded-md transition-colors group"
          >
            Track My Order
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-white border border-[var(--border)] hover:bg-[var(--cream-dark)] text-[var(--bark)] font-semibold rounded-md transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
