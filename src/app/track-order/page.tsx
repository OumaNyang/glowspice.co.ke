"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function TrackOrderPage() {
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="bg-[var(--cream)] min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-4xl text-[var(--bark)] mb-4 text-center">Track Your Order</h1>
        <p className="text-[var(--gray-500)] text-center mb-8">
          Enter your order number to see the current status of your delicious spices.
        </p>
        
        <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--border)] max-w-md mx-auto">
          <Input 
            label="Order Number" 
            placeholder="e.g. GLW-12345" 
            className="mb-4"
          />
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="jane@example.com"
            className="mb-6" 
          />
          <Button fullWidth onClick={handleTrack} loading={loading} className="gap-2">
            <Search size={16} /> Track Order
          </Button>
        </div>
      </div>
    </div>
  );
}
