"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const isDrawerOpen = useCartStore((s) => s.isDrawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  
  const drawerRef = useRef<HTMLDivElement>(null);

  const onClose = closeDrawer;

  // Lock body scroll
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isDrawerOpen) return null;


  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--bark)]/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-[var(--cream)] shadow-2xl flex flex-col overflow-hidden"
        style={{ animation: "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Header - More Compact */}
        <div className="bg-white border-b border-[var(--border)] sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--spice)]/10 rounded-full flex items-center justify-center">
                <ShoppingBag size={18} className="text-[var(--spice)]" />
              </div>
              <div>
                <h2 className="font-display text-base font-bold text-[var(--bark)]">
                  My Cart
                </h2>
                <p className="text-[10px] text-[var(--gray-500)]">
                  {items.length === 0 ? "Empty" : `${items.reduce((s, i) => s + i.quantity, 0)} items`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[var(--gray-400)] hover:text-[var(--bark)] hover:bg-[var(--gray-100)] transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content Area - Single Column */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-[var(--cream-dark)] rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag size={32} className="text-[var(--gray-300)]" />
                </div>
                <h3 className="text-lg font-display font-bold text-[var(--bark)] mb-1">Your cart is empty</h3>
                <p className="text-xs text-[var(--gray-500)] max-w-[200px] mx-auto mb-6">
                  Ready to add some spice to your life?
                </p>
                <Button onClick={onClose} size="md">
                  Browse Shop
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group flex gap-4 bg-white rounded-md p-3 border border-[var(--border)] hover:border-[var(--spice)]/30 transition-all duration-300 shadow-sm"
                    >
                      {/* Product Image - Smaller */}
                      <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[var(--cream-dark)] shrink-0">
                        <Image
                          src={item.product.images[0]?.url}
                          alt={item.product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="80px"
                        />
                      </div>

                      {/* Product Details - Compact */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <Link 
                              href={`/products/${item.product.slug}`} 
                              onClick={onClose}
                              className="text-sm font-bold text-[var(--bark)] hover:text-[var(--spice)] transition-colors leading-tight line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[var(--gray-300)] hover:text-red-500 transition-colors shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            {item.variation && (
                              <span className="text-[10px] text-[var(--spice)] font-bold">
                                {item.variation.name}
                              </span>
                            )}
                            <span className="text-[10px] text-[var(--gray-400)]">
                              {formatPrice(item.variation ? item.variation.price : item.product.price)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-end justify-between mt-2">
                          {/* Quantity - Smaller */}
                          <div className="flex items-center bg-[var(--cream-dark)] rounded p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[var(--bark)] hover:bg-white transition-all disabled:opacity-50 text-xs"
                              disabled={item.quantity <= 1}
                            >
                               −
                            </button>
                            <span className="text-xs font-bold text-[var(--bark)] w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[var(--bark)] hover:bg-white transition-all text-xs"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-sm font-display font-black text-[var(--spice)]">
                            {formatPrice((item.variation ? item.variation.price : item.product.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Compact Order Summary */}
                <div className="bg-white rounded-md border border-[var(--border)] p-5 shadow-lg mt-6">
                  <h3 className="text-sm font-bold text-[var(--bark)] mb-4">Summary</h3>
                  
                  <div className="space-y-2 mb-6 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-500)]">Subtotal</span>
                      <span className="font-semibold text-[var(--bark)]">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-500)]">Shipping</span>
                      <span className="text-[var(--herb)] font-medium italic">Next step</span>
                    </div>
                    <div className="pt-3 mt-1 border-t border-[var(--border)] flex justify-between items-center">
                      <span className="font-bold text-[var(--bark)]">Total</span>
                      <span className="font-black text-xl text-[var(--spice)] font-display">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href="/checkout" onClick={onClose}>
                      <Button fullWidth size="md" className="rounded-md group">
                        Checkout
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/cart" onClick={onClose} className="block">
                      <Button fullWidth variant="outline" size="md" className=" mt-2 text-[var(--gray-400)]">
                        View Full Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
