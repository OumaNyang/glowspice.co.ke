"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

export function WishlistButton({
  productId,
  productName,
  size = "md",
  className,
}: {
  productId: string;
  productName?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(productId));
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
        
        if (isWishlisted) {
          toast.success(productName ? `${productName} removed from wishlist` : "Removed from wishlist");
        } else {
          toast.success(productName ? `${productName} added to wishlist` : "Added to wishlist");
        }
      }}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex items-center justify-center rounded-md bg-white/90 backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm",
        size === "sm" ? "w-7 h-7" : "w-9 h-9",
        className
      )}
    >
      <Heart
        size={size === "sm" ? 14 : 16}
        className={cn(
          "transition-colors",
          isWishlisted ? "fill-red-500 text-red-500" : "text-[var(--gray-400)] hover:text-red-400"
        )}
      />
    </button>
  );
}
