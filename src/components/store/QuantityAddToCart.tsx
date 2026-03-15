"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/lib/types";
import { ProductVariationModal } from "./ProductVariationModal";

export function QuantityAddToCart({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const hasVariations = product.variations && product.variations.length > 0;

  const handleAdd = () => {
    if (hasVariations) {
      setModalOpen(true);
      return;
    }
    
    addItem(product, qty);
    toast.success(`${product.name} added to cart`, {
      description: `${qty} ${qty === 1 ? 'item' : 'items'} added`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (hasVariations) {
    return (
      <div className="flex items-center flex-1">
        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className="w-full flex items-center justify-center gap-2 h-11 rounded-md font-semibold text-white bg-[var(--spice)] hover:bg-[var(--spice-dark)] transition-all duration-300 disabled:bg-[var(--gray-300)]"
        >
          <ShoppingCart size={18} />
          {product.stock === 0 ? "Out of Stock" : "Select Options"}
        </button>
        <ProductVariationModal 
          product={product}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-1">
      {/* Quantity selector */}
      <div className="flex items-center bg-white border border-[var(--border)] rounded-md">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-11 h-11 flex items-center justify-center text-[var(--bark)] hover:text-[var(--spice)] transition-colors rounded-l-md hover:bg-[var(--cream-dark)]"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center text-sm font-bold text-[var(--bark)]">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
          className="w-11 h-11 flex items-center justify-center text-[var(--bark)] hover:text-[var(--spice)] transition-colors rounded-r-md hover:bg-[var(--cream-dark)]"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        disabled={product.stock === 0}
        className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-md font-semibold text-white transition-all duration-300 ${
          added
            ? "bg-[var(--herb)]"
            : "bg-[var(--spice)] hover:bg-[var(--spice-dark)] active:scale-95"
        } disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {added ? (
          <>
            <Check size={18} />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart size={18} />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
