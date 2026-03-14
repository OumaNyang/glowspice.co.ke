"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--bark)]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[var(--cream)] shadow-2xl flex flex-col"
        style={{ animation: "slideInRight 0.3s cubic-bezier(0.4,0,0.2,1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[var(--spice)]" />
            <h2 className="font-display text-lg font-semibold text-[var(--bark)]">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="bg-[var(--spice)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--gray-500)] hover:text-[var(--bark)] hover:bg-[var(--cream-dark)] transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-[var(--gray-400)]">
              <ShoppingBag size={48} className="opacity-30" />
              <p className="text-sm">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-sm text-[var(--spice)] font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm border border-[var(--border)]"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[var(--cream-dark)] shrink-0">
                  <Image
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[var(--bark)] truncate">
                    {item.product.name} {item.variation && <span className="text-[var(--spice)]">({item.variation.name})</span>}
                  </h4>
                  <p className="text-xs text-[var(--gray-500)] mb-2">
                    {item.variation ? item.variation.name : item.product.unit}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-[var(--cream-dark)] rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--bark)] hover:bg-[var(--spice)]/10 hover:text-[var(--spice)] transition-colors font-bold"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-[var(--bark)] w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--bark)] hover:bg-[var(--spice)]/10 hover:text-[var(--spice)] transition-colors font-bold"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[var(--spice)]">
                        {formatPrice((item.variation ? item.variation.price : item.product.price) * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 rounded text-[var(--gray-400)] hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--border)] px-6 py-5 space-y-4 bg-white">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--gray-500)]">Subtotal</span>
              <span className="font-bold text-[var(--bark)] font-display text-lg">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <p className="text-xs text-[var(--gray-400)]">
              Shipping and taxes calculated at checkout
            </p>
            <Link href="/checkout" onClick={onClose}>
              <Button fullWidth size="lg" className="group">
                Checkout
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/cart" onClick={onClose}>
              <Button fullWidth variant="ghost" size="md">
                View Full Cart
              </Button>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
