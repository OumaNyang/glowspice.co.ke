"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Lock, CreditCard, Smartphone } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const COUNTIES = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Other"];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const shipping = totalPrice > 5000 ? 0 : 200;
  const tax = Math.round(totalPrice * 0.16);
  const total = totalPrice + shipping + tax;

  const [step, setStep] = useState<1 | 2>(1);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [loading, setLoading] = useState(false);

  const [shippingData, setShippingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "Nairobi",
    postalCode: "",
  });

  const update = (field: string, val: string) =>
    setShippingData((d) => ({ ...d, [field]: val }));

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="font-display text-2xl text-[var(--bark)]">Your cart is empty</p>
        <Link href="/products"><Button>Shop Now</Button></Link>
      </div>
    );
  }

  return (
    <div className="bg-[var(--cream)] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--gray-400)] mb-8">
          <Link href="/cart" className="hover:text-[var(--spice)]">Cart</Link>
          <ChevronRight size={14} />
          <span className={step === 1 ? "text-[var(--spice)] font-semibold" : "text-[var(--gray-400)]"}>
            Shipping
          </span>
          <ChevronRight size={14} />
          <span className={step === 2 ? "text-[var(--spice)] font-semibold" : "text-[var(--gray-400)]"}>
            Payment
          </span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — Form */}
          <div className="lg:col-span-3 space-y-6">
            {step === 1 ? (
              <>
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                  <h2 className="font-display font-bold text-xl text-[var(--bark)] mb-5 flex items-center gap-2">
                    Shipping Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Input
                        id="fullName"
                        label="Full Name"
                        placeholder="Jane Doe"
                        value={shippingData.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                      />
                    </div>
                    <Input
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="jane@example.com"
                      value={shippingData.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                    <Input
                      id="phone"
                      label="Phone"
                      placeholder="+254 700 000 000"
                      value={shippingData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                    <div className="sm:col-span-2">
                      <Input
                        id="address"
                        label="Street Address"
                        placeholder="14 Garden Estate Road"
                        value={shippingData.address}
                        onChange={(e) => update("address", e.target.value)}
                      />
                    </div>
                    <Input
                      id="city"
                      label="City / Town"
                      placeholder="Nairobi"
                      value={shippingData.city}
                      onChange={(e) => update("city", e.target.value)}
                    />
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-[var(--bark)] mb-1.5">
                        County
                      </label>
                      <select
                        value={shippingData.county}
                        onChange={(e) => update("county", e.target.value)}
                        className="w-full bg-white border border-[var(--border)] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--spice)]"
                      >
                        {COUNTIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <Input
                      id="postalCode"
                      label="Postal Code"
                      placeholder="00100"
                      value={shippingData.postalCode}
                      onChange={(e) => update("postalCode", e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  fullWidth
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={!shippingData.fullName || !shippingData.email || !shippingData.phone || !shippingData.address}
                >
                  Continue to Payment
                </Button>
              </>
            ) : (
              <>
                {/* Payment Step */}
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                  <h2 className="font-display font-bold text-xl text-[var(--bark)] mb-5 flex items-center gap-2">
                    <Lock size={18} className="text-[var(--spice)]" />
                    Payment Method
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {(["mpesa", "card"] as const).map((pm) => (
                      <button
                        key={pm}
                        onClick={() => setPaymentMethod(pm)}
                        className={`flex items-center gap-3 p-4 rounded-md border-2 transition-all ${paymentMethod === pm ? "border-[var(--spice)] bg-[var(--spice)]/5" : "border-[var(--border)] hover:border-[var(--gray-300)]"}`}
                      >
                        {pm === "mpesa" ? (
                          <Smartphone size={20} className="text-[var(--herb)]" />
                        ) : (
                          <CreditCard size={20} className="text-[var(--spice)]" />
                        )}
                        <div className="text-left">
                          <p className="text-sm font-semibold text-[var(--bark)]">
                            {pm === "mpesa" ? "M-Pesa" : "Card"}
                          </p>
                          <p className="text-xs text-[var(--gray-400)]">
                            {pm === "mpesa" ? "Lipa Na M-Pesa" : "Visa / Mastercard"}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "mpesa" ? (
                    <div className="space-y-4">
                      <Input
                        id="mpesaPhone"
                        label="M-Pesa Phone Number"
                        placeholder="0712 345 678"
                        icon={<Smartphone size={16} />}
                      />
                      <div className="bg-[var(--herb)]/5 border border-[var(--herb)]/20 rounded-md p-4 text-sm text-[var(--herb)]">
                        <p className="font-semibold mb-1">How it works:</p>
                        <p>You will receive an M-Pesa STK push to {shippingData.phone || "your phone"}. Enter your PIN to complete the payment.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Input id="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input id="expiry" label="Expiry Date" placeholder="MM/YY" />
                        <Input id="cvv" label="CVV" placeholder="123" />
                      </div>
                      <Input id="cardName" label="Name on Card" placeholder="Jane Doe" />
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} size="lg">
                    Back
                  </Button>
                  <Button fullWidth size="lg" loading={loading} onClick={handlePlaceOrder}>
                    Place Order — {formatPrice(total)}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Right — Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[var(--border)]">
              <h3 className="font-display font-bold text-[var(--bark)] mb-4">Your Order</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--spice)] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--bark)] truncate">{item.product.name}</p>
                      <p className="text-xs text-[var(--gray-400)]">{item.product.unit}</p>
                    </div>
                    <span className="text-sm font-bold text-[var(--spice)]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <hr className="my-4 border-[var(--border)]" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--gray-500)]">Subtotal</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gray-500)]">Shipping</span>
                  <span className={shipping === 0 ? "text-[var(--herb)] font-medium" : "font-medium"}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gray-500)]">VAT (16%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <hr className="border-[var(--border)]" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-[var(--bark)]">Total</span>
                  <span className="text-[var(--spice)] font-display text-xl">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
