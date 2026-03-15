"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/lib/types";
import { ProductVariationModal } from "./ProductVariationModal";

interface AddToCartButtonProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

export function AddToCartButton({ 
  product, 
  size = "md", 
  fullWidth = false,
  className,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // In case it's wrapped in a Link
    
    if (product.variations && product.variations.length > 0) {
      setModalOpen(true);
      return;
    }
    
    addItem(product, 1);
    toast.success(`${product.name} added to cart`, {
      description: "1 item added",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
    md: "px-4 py-2 text-sm gap-2 rounded-md",
    lg: "px-6 py-3 text-base gap-2 rounded-md",
  };

  return (
    <>
      <button
        onClick={handleAdd}
        disabled={product.stock === 0}
        aria-label="Add to cart"
        className={cn(
          "flex items-center justify-center font-semibold text-white transition-all duration-300",
          sizes[size],
          fullWidth && "w-full",
          added
            ? "bg-[var(--herb)] pointer-events-none"
            : "bg-[var(--spice)] hover:bg-[var(--spice-dark)] active:scale-95 disabled:bg-[var(--gray-300)] disabled:pointer-events-none",
          className
        )}
      >
        {added ? (
          <>
            <Check size={size === "sm" ? 14 : 18} className="animate-in zoom-in" />
            <span>Added</span>
          </>
        ) : (
          <>
            <ShoppingCart size={size === "sm" ? 14 : 18} />
            <span>{product.stock === 0 ? "Out of Stock" : (product.variations && product.variations.length > 0 ? "Select Options" : "Add to Cart")}</span>
          </>
        )}
      </button>
      
      <ProductVariationModal 
        product={product}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
