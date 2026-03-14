import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Package, MapPin, ChevronRight, Shield } from "lucide-react";
import { getProductBySlug, getProductReviews, products } from "@/lib/data";
import { formatPrice, discountPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { WishlistButton } from "@/components/store/WishlistButton";
import { ProductImageGallery } from "@/components/store/ProductImageGallery";
import { QuantityAddToCart } from "@/components/store/QuantityAddToCart";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const reviews = getProductReviews(product.id);

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-[var(--gray-400)]">
            <Link href="/" className="hover:text-[var(--spice)] transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-[var(--spice)] transition-colors">
              Products
            </Link>
            <ChevronRight size={14} />
            <Link
              href={`/products/category/${product.category.slug}`}
              className="hover:text-[var(--spice)] transition-colors"
            >
              {product.category.name}
            </Link>
            <ChevronRight size={14} />
            <span className="text-[var(--bark)] font-medium truncate max-w-48">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Images */}
          <ProductImageGallery images={product.images} productName={product.name} />

          {/* Right — Info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.isBestSeller && <Badge variant="spice">Best Seller</Badge>}
              {product.isNew && <Badge variant="herb">New Arrival</Badge>}
              {product.compareAtPrice && (
                <Badge variant="warning">
                  Save {discountPercent(product.price, product.compareAtPrice)}%
                </Badge>
              )}
            </div>

            {/* Category */}
            <Link
              href={`/products/category/${product.category.slug}`}
              className="text-sm font-semibold text-[var(--spice)] uppercase tracking-widest hover:underline"
            >
              {product.category.name}
            </Link>

            {/* Name */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[var(--bark)] mt-2 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={
                      s <= Math.round(product.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200 fill-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="font-semibold text-sm text-[var(--bark)]">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-[var(--gray-400)]">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display font-bold text-4xl text-[var(--spice)]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xl text-[var(--gray-400)] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="text-sm text-[var(--gray-500)]">per {product.unit}</span>
            </div>

            {/* Short description */}
            <p className="text-[var(--bark-light)] leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.origin && (
                <div className="flex items-center gap-2 bg-white rounded-md p-3 border border-[var(--border)]">
                  <MapPin size={16} className="text-[var(--spice)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--gray-400)]">Origin</p>
                    <p className="text-sm font-semibold text-[var(--bark)]">{product.origin}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 bg-white rounded-md p-3 border border-[var(--border)]">
                <Package size={16} className="text-[var(--spice)] shrink-0" />
                <div>
                  <p className="text-xs text-[var(--gray-400)]">Pack Size</p>
                  <p className="text-sm font-semibold text-[var(--bark)]">{product.unit}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-md p-3 border border-[var(--border)]">
                <Shield size={16} className="text-[var(--herb)] shrink-0" />
                <div>
                  <p className="text-xs text-[var(--gray-400)]">Stock</p>
                  <p className={`text-sm font-semibold ${product.stock > 20 ? "text-[var(--herb)]" : "text-amber-600"}`}>
                    {product.stock > 20 ? "In Stock" : `Only ${product.stock} left`}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Add to cart */}
            <div className="flex items-center gap-3 mb-6">
              <QuantityAddToCart product={product} />
              <WishlistButton productId={product.id} />
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🌱", label: "100% Natural" },
                { icon: "🚚", label: "Fast Delivery" },
                { icon: "↩️", label: "Easy Returns" },
              ].map((g) => (
                <div key={g.label} className="text-center bg-white rounded-md p-3 border border-[var(--border)]">
                  <div className="text-xl mb-1">{g.icon}</div>
                  <p className="text-xs font-semibold text-[var(--bark)]">{g.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl text-[var(--bark)] mb-4">
              Product Description
            </h2>
            <div className="bg-white rounded-md p-6 border border-[var(--border)]">
              <p className="text-[var(--bark-light)] leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-[var(--herb)]/5 border border-[var(--herb)]/20 rounded-md p-5">
              <h3 className="font-semibold text-[var(--herb)] mb-2">Storage Instructions</h3>
              <p className="text-sm text-[var(--bark-light)] leading-relaxed">
                Store in a cool, dry place away from direct sunlight. Keep in an airtight container to preserve freshness, aroma, and potency.
              </p>
            </div>
            <div className="bg-[var(--spice)]/5 border border-[var(--spice)]/20 rounded-md p-5">
              <h3 className="font-semibold text-[var(--spice)] mb-2">Quality Promise</h3>
              <p className="text-sm text-[var(--bark-light)] leading-relaxed">
                Every product is batch-tested for purity, freshness, and flavour before dispatch. No additives, fillers, or preservatives — ever.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display font-bold text-2xl text-[var(--bark)] mb-6">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-md p-5 border border-[var(--border)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={13}
                          className={
                            s <= review.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-200 fill-gray-200"
                          }
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <Badge variant="success" className="text-[10px]">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm text-[var(--bark)] mb-2">
                    {review.title}
                  </h4>
                  <p className="text-sm text-[var(--bark-light)] leading-relaxed mb-3 italic">
                    &ldquo;{review.body}&rdquo;
                  </p>
                  <div>
                    <p className="text-xs font-semibold text-[var(--bark)]">{review.author}</p>
                    <p className="text-xs text-[var(--gray-400)]">
                      {new Date(review.createdAt).toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
