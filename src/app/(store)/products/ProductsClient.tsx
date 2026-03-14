"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "@/lib/data";
import { formatPrice, discountPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { WishlistButton } from "@/components/store/WishlistButton";
import { Input } from "@/components/ui/Input";
import type { ProductFilters } from "@/lib/types";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const DEFAULT_FILTERS: ProductFilters = {
  search: "",
  categoryId: "",
  minPrice: 0,
  maxPrice: 5000,
  sortBy: "newest",
  inStock: false,
};

export function ProductsClient({
  initialCategorySlug,
}: {
  initialCategorySlug?: string;
}) {
  const initialCat = initialCategorySlug
    ? categories.find((c) => c.slug === initialCategorySlug)
    : undefined;

  const [filters, setFilters] = useState<ProductFilters>({
    ...DEFAULT_FILTERS,
    categoryId: initialCat?.id ?? "",
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    if (filters.categoryId) {
      list = list.filter((p) => p.categoryId === filters.categoryId);
    }
    if (filters.inStock) {
      list = list.filter((p) => p.stock > 0);
    }
    list = list.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    switch (filters.sortBy) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [filters]);

  const activeFilterCount = [
    filters.categoryId,
    filters.search,
    filters.inStock,
    filters.minPrice > 0,
    filters.maxPrice < 5000,
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-4xl text-[var(--bark)] mb-2">
          {initialCat ? initialCat.name : "All Products"}
        </h1>
        <p className="text-[var(--gray-500)]">
          {filtered.length} {filtered.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {/* Top bar: search + sort + filter toggle */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="flex-1 min-w-48">
          <Input
            placeholder="Search spices..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          />
        </div>

        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((f) => ({ ...f, sortBy: e.target.value as ProductFilters["sortBy"] }))
          }
          className="bg-white border border-[var(--border)] rounded-md px-4 py-2.5 text-sm text-[var(--bark)] focus:outline-none focus:border-[var(--spice)] cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[var(--border)] rounded-md text-sm font-medium text-[var(--bark)] hover:border-[var(--spice)] transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-[var(--spice)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="flex items-center gap-1.5 text-sm text-[var(--gray-500)] hover:text-[var(--spice)] transition-colors"
          >
            <X size={14} /> Clear all
          </button>
        )}
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        {filtersOpen && (
          <aside className="w-64 shrink-0 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-semibold text-[var(--bark)] mb-3">Category</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setFilters((f) => ({ ...f, categoryId: "" }))}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!filters.categoryId ? "bg-[var(--spice)]/10 text-[var(--spice)] font-semibold" : "text-[var(--bark-light)] hover:bg-[var(--cream-dark)]"}`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        categoryId: f.categoryId === cat.id ? "" : cat.id,
                      }))
                    }
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${filters.categoryId === cat.id ? "bg-[var(--spice)]/10 text-[var(--spice)] font-semibold" : "text-[var(--bark-light)] hover:bg-[var(--cream-dark)]"}`}
                  >
                    {cat.name}
                    <span className="text-xs text-[var(--gray-400)]">{cat.productCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-semibold text-[var(--bark)] mb-3">Price Range</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))
                  }
                  className="w-full accent-[var(--spice)]"
                />
                <div className="flex justify-between text-xs text-[var(--gray-500)]">
                  <span>KES 0</span>
                  <span>KES {filters.maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* In Stock */}
            <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, inStock: e.target.checked }))
                  }
                  className="w-4 h-4 accent-[var(--spice)] rounded"
                />
                <span className="text-sm font-medium text-[var(--bark)]">In Stock Only</span>
              </label>
            </div>
          </aside>
        )}

        {/* Product grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-[var(--gray-400)]">
              <p className="text-5xl mb-4">🌿</p>
              <p className="font-display text-xl text-[var(--bark)] mb-2">No products found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="group bg-[var(--cream)] rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative h-48 overflow-hidden bg-[var(--cream-dark)]">
                      <Image
                        src={product.images[0]?.url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.isBestSeller && <Badge variant="spice">Best Seller</Badge>}
                        {product.isNew && <Badge variant="herb">New</Badge>}
                        {product.compareAtPrice && (
                          <Badge variant="warning">
                            -{discountPercent(product.price, product.compareAtPrice)}%
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <WishlistButton productId={product.id} />
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${product.slug}`}>
                      <p className="text-xs text-[var(--gray-400)] mb-1 uppercase tracking-wide">
                        {product.category.name}
                      </p>
                      <h3 className="font-semibold text-[var(--bark)] text-sm leading-snug mb-2 group-hover:text-[var(--spice)] transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={11} className={s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                          ))}
                        </div>
                        <span className="text-xs text-[var(--gray-400)]">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-display font-bold text-[var(--spice)] text-lg">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs text-[var(--gray-400)] line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                        <span className="text-xs text-[var(--gray-400)]">/ {product.unit}</span>
                      </div>
                    </Link>
                    <AddToCartButton product={product} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
