"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) => s.totalPrice());

  const shipping = totalPrice > 5000 ? 0 : 200;
  const tax = Math.round(totalPrice * 0.16);
  const orderTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-8">
        <div className="w-24 h-24 bg-[var(--spice)]/10 rounded-full flex items-center justify-center">
          <ShoppingBag size={40} className="text-[var(--spice)]" />
        </div>
        <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Your cart is empty</h1>
        <p className="text-[var(--gray-500)] text-center max-w-md">
          Looks like you haven&apos;t added anything yet. Explore our premium spices and herbs!
        </p>
        <Link href="/products">
          <Button size="lg">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--cream)] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-4xl text-[var(--bark)] mb-8">
          Shopping Cart
          <span className="text-lg font-normal text-[var(--gray-400)] ml-3">
            ({items.reduce((s, i) => s + i.quantity, 0)} items)
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-md p-5 border border-[var(--border)] flex gap-4 items-center group"
              >
                <Link href={`/products/${item.product.slug}`} className="relative w-24 h-24 rounded-md overflow-hidden bg-[var(--cream-dark)] shrink-0">
                  <Image
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="96px"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product.slug}`}>
                    <h3 className="font-semibold text-[var(--bark)] hover:text-[var(--spice)] transition-colors leading-snug mb-0.5">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-[var(--gray-400)] mb-3">
                    {item.product.category.name} · {item.product.unit}
                    {item.product.origin && ` · ${item.product.origin}`}
                  </p>
                  <div className="flex items-center gap-4">
                    {/* Qty */}
                    <div className="flex items-center bg-[var(--cream-dark)] rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[var(--bark)] hover:text-[var(--spice)] transition-colors font-bold text-lg rounded-l-lg"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-[var(--bark)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[var(--bark)] hover:text-[var(--spice)] transition-colors font-bold text-lg rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="flex items-center gap-1 text-xs text-[var(--gray-400)] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-display font-bold text-xl text-[var(--spice)]">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  <p className="text-xs text-[var(--gray-400)]">
                    {formatPrice(item.product.price)} each
                  </p>
                </div>
              </div>
            ))}

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-[var(--spice)] font-semibold hover:gap-3 transition-all duration-200 mt-2"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-md p-6 border border-[var(--border)]">
              <h2 className="font-display font-bold text-xl text-[var(--bark)] mb-5">
                Order Summary
              </h2>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--gray-500)]">Subtotal</span>
                  <span className="font-medium text-[var(--bark)]">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--gray-500)]">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-[var(--herb)]" : "text-[var(--bark)]"}`}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--gray-500)]">VAT (16%)</span>
                  <span className="font-medium text-[var(--bark)]">{formatPrice(tax)}</span>
                </div>
                <hr className="border-[var(--border)]" />
                <div className="flex justify-between">
                  <span className="font-bold text-[var(--bark)]">Total</span>
                  <span className="font-display font-bold text-2xl text-[var(--spice)]">
                    {formatPrice(orderTotal)}
                  </span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-[var(--herb)] bg-[var(--herb)]/5 rounded-lg px-3 py-2 mb-4">
                  Add {formatPrice(5000 - totalPrice)} more for free delivery!
                </p>
              )}

              <Link href="/checkout">
                <Button fullWidth size="lg" className="group mb-3">
                  Proceed to Checkout
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-3 mt-4">
                {["M-Pesa", "Visa", "Mastercard"].map((pm) => (
                  <span key={pm} className="text-xs bg-[var(--cream-dark)] text-[var(--gray-500)] px-2 py-1 rounded-md font-medium">
                    {pm}
                  </span>
                ))}
              </div>
            </div>

            {/* Promo code */}
            <div className="bg-white rounded-md p-5 border border-[var(--border)]">
              <h3 className="font-semibold text-sm text-[var(--bark)] mb-3">Promo Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code..."
                  className="flex-1 bg-[var(--cream)] border border-[var(--border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--spice)]"
                />
                <Button variant="outline" size="sm">Apply</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
