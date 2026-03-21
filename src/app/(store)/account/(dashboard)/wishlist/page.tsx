"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlistStore";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const toggle = useWishlistStore((s) => s.toggle);

  const wishlistProducts = products.filter((p) => productIds.includes(p.id));

  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-3xl text-[var(--bark)]">
        Wishlist
        {wishlistProducts.length > 0 && (
          <span className="text-lg font-normal text-[var(--gray-400)] ml-2">
            ({wishlistProducts.length} items)
          </span>
        )}
      </h1>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-md border border-[var(--border)] p-16 text-center">
          <Heart size={48} className="text-[var(--gray-200)] mx-auto mb-4" />
          <p className="font-display text-xl text-[var(--bark)] mb-2">No saved items yet</p>
          <p className="text-[var(--gray-400)] text-sm mb-6">
            Heart a product to save it for later
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--spice)] text-white font-semibold rounded-md text-sm hover:bg-[var(--spice-dark)] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-md border border-[var(--border)] p-4 flex gap-4"
            >
              <Link href={`/products/${product.slug}`} className="relative w-20 h-20 rounded-md overflow-hidden bg-[var(--cream-dark)] shrink-0">
                <Image
                  src={product.images[0]?.url}
                  alt={product.name}
                  fill className="object-cover"
                  sizes="80px"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold text-sm text-[var(--bark)] hover:text-[var(--spice)] transition-colors line-clamp-2 leading-snug mb-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="font-display font-bold text-[var(--spice)] mb-3">
                  {formatPrice(product.price)}
                  <span className="text-xs text-[var(--gray-400)] font-normal ml-1">/ {product.unit}</span>
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--spice)] text-white text-xs font-semibold rounded-md hover:bg-[var(--spice-dark)] transition-colors"
                  >
                    <ShoppingCart size={12} />
                    Add to Cart
                  </Link>
                   <button
                    onClick={() => {
                      toggle(product.id);
                      toast.success(`${product.name} removed from wishlist`);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-500 text-xs font-semibold rounded-md hover:bg-red-100 transition-colors"
                  >
                    <Heart size={12} className="fill-red-400" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
