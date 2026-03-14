"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  showIcon?: boolean;
}

export function AddToCartButton({
  product,
  size = "md",
  fullWidth = false,
  showIcon = true,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
    md: "px-4 py-2 text-sm gap-2 rounded-xl",
    lg: "px-6 py-3 text-base gap-2 rounded-xl",
  };

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      aria-label={`Add ${product.name} to cart`}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer select-none shrink-0",
        added
          ? "bg-[var(--herb)] text-white"
          : "bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white active:scale-95",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        sizes[size],
        fullWidth && "w-full"
      )}
    >
      {added ? (
        <>
          <Check size={size === "sm" ? 12 : 16} />
          {size !== "sm" && "Added!"}
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart size={size === "sm" ? 12 : 16} />}
          {size === "sm" ? "Add" : "Add to Cart"}
        </>
      )}
    </button>
  );
}
