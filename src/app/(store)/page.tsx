import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Shield, Truck, Leaf, Award } from "lucide-react";
import { getFeaturedProducts, getBestSellers, getNewArrivals, categories } from "@/lib/data";
import { formatPrice, discountPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { WishlistButton } from "@/components/store/WishlistButton";

export const metadata: Metadata = {
  title: "GlowSpice — Premium Spices & Herbs, Kenya",
  description: "Shop the world's finest spices, herbs, and spice blends. Fresh from source, delivered across Kenya.",
};

const features = [
  { icon: Leaf, title: "Source Direct", desc: "Farm-to-table sourcing from 30+ countries" },
  { icon: Shield, title: "100% Natural", desc: "No additives, fillers, or artificial preservatives" },
  { icon: Truck, title: "Fast Delivery", desc: "Next-day delivery across Nairobi" },
  { icon: Award, title: "Premium Quality", desc: "Every batch is tested for purity and freshness" },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const bestSellers = getBestSellers().slice(0, 4);
  const newArrivals = getNewArrivals();

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, var(--bark) 0%, #5c3524 50%, var(--herb-dark) 100%)",
          }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Decorative spice blobs */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[var(--spice)]/20 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-[var(--herb)]/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center py-24">
          {/* left — copy */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-[var(--sand)] mb-6">
              <Leaf size={14} className="text-[var(--spice-light)]" />
              Sourced from 30+ Countries
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
              The World&apos;s<br />
              <span className="text-gradient" style={{ background: "linear-gradient(135deg, var(--spice-light), #f0a868)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Finest Spices
              </span><br />
              Delivered Fresh
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              Hand-sourced premium spices, herbs, and botanicals from the world&apos;s 
              great spice growing regions — arriving at your kitchen in Nairobi, 
              fresh from the source.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-semibold rounded-md transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
              >
                Shop All Spices
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products?filter=bestsellers"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-md transition-all duration-200"
              >
                Best Sellers
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "200+", label: "Premium Products" },
                { value: "30+", label: "Source Countries" },
                { value: "5,000+", label: "Happy Customers" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-bold text-2xl text-white">{stat.value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right — floating product cards */}
          <div className="hidden lg:block relative h-[500px]">
            {featured.slice(0, 3).map((product, i) => {
              const offsets = [
                { top: "0px", right: "0px", rotate: "2deg" },
                { top: "120px", right: "200px", rotate: "-3deg" },
                { top: "260px", right: "60px", rotate: "1.5deg" },
              ];
              const o = offsets[i];
              return (
                <div
                  key={product.id}
                  className="absolute w-52 bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-3 shadow-xl"
                  style={{ top: o.top, right: o.right, transform: `rotate(${o.rotate})`, animation: `float ${3 + i}s ease-in-out infinite alternate` }}
                >
                  <div className="relative h-32 rounded-md overflow-hidden mb-2">
                    <Image
                      src={product.images[0]?.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <p className="text-white text-xs font-semibold truncate">{product.name}</p>
                  <p className="text-[var(--spice-light)] text-xs font-bold">{formatPrice(product.price)}</p>
                </div>
              );
            })}
            <style>{`@keyframes float { from { transform: translateY(0); } to { transform: translateY(-12px); } }`}</style>
          </div>
        </div>
      </section>

      {/* ─── FEATURES STRIP ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-[var(--spice)]/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[var(--spice)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[var(--bark)]">{title}</h3>
                  <p className="text-xs text-[var(--gray-500)] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─────────────────────────────────────────── */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--spice)] tracking-widest uppercase mb-2">
              Explore by Category
            </p>
            <h2 className="font-display font-bold text-4xl text-[var(--bark)]">
              Find Your Perfect Spice
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group block"
              >
                <div className="relative h-36 rounded-md overflow-hidden mb-3 shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                  <div
                    className="absolute inset-0 opacity-80 transition-opacity duration-300 group-hover:opacity-60"
                    style={{ background: `linear-gradient(135deg, ${cat.color}cc, ${cat.color}88)` }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <span className="text-white font-display font-semibold text-sm text-center leading-tight">
                      {cat.name}
                    </span>
                    <span className="text-white/70 text-xs mt-1">
                      {cat.productCount} items
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ──────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-[var(--spice)] tracking-widest uppercase mb-2">
                Handpicked For You
              </p>
              <h2 className="font-display font-bold text-4xl text-[var(--bark)]">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[var(--spice)] hover:gap-3 transition-all duration-200"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((product) => (
              <div
                key={product.id}
                className="group bg-[var(--cream)] rounded-md overflow-hidden border border-[var(--border)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="relative aspect-[3/2] overflow-hidden bg-[var(--cream-dark)]">
                    <Image
                      src={product.images[0]?.url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isBestSeller && <Badge variant="spice">Best Seller</Badge>}
                      {product.isNew && <Badge variant="herb">New</Badge>}
                      {product.compareAtPrice && (
                        <Badge variant="warning">
                          -{discountPercent(product.price, product.compareAtPrice)}%
                        </Badge>
                      )}
                    </div>
                    {/* Wishlist */}
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
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={12}
                            className={s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                          />
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
        </div>
      </section>

      {/* ─── BANNER ──────────────────────────────────────────────── */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--herb-dark)] to-[var(--herb)] p-10 lg:p-16">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, var(--spice) 0%, transparent 60%)" }} />
            <div className="relative z-10 max-w-xl">
              <Badge variant="spice" className="mb-4">Limited Stock</Badge>
              <h2 className="font-display font-bold text-4xl text-white mb-4">
                Grade 1 Khorasan<br />
                <span style={{ color: "var(--sand)" }}>Saffron Threads</span>
              </h2>
              <p className="text-white/70 text-lg mb-8">
                The world&apos;s most precious spice, hand-harvested from Iran&apos;s finest fields. 
                Experience maximum crocin, stunning colour, and honeyed depth.
              </p>
              <Link
                href="/products/saffron-threads"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-semibold rounded-md transition-all duration-200 shadow-lg hover:-translate-y-0.5 group"
              >
                Shop Saffron
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-[var(--herb)] tracking-widest uppercase mb-2">
                Customer Favourites
              </p>
              <h2 className="font-display font-bold text-4xl text-[var(--bark)]">
                Best Sellers
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product, i) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex gap-4 bg-[var(--cream)] hover:bg-white border border-[var(--border)] hover:border-[var(--spice)]/30 rounded-md p-4 transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[var(--cream-dark)] shrink-0">
                  <Image
                    src={product.images[0]?.url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="80px"
                  />
                  <div className="absolute -top-2 -left-2 w-7 h-7 bg-[var(--spice)] rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                    {i + 1}
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-[var(--bark)] leading-tight mb-1 line-clamp-2 group-hover:text-[var(--spice)] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star size={11} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-[var(--bark)]">{product.rating}</span>
                    <span className="text-xs text-[var(--gray-400)]">({product.reviewCount})</span>
                  </div>
                  <span className="font-display font-bold text-[var(--spice)]">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-20 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[var(--spice)] tracking-widest uppercase mb-2">
              What Customers Say
            </p>
            <h2 className="font-display font-bold text-4xl text-[var(--bark)]">
              Real Reviews
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Amina Ochieng", text: "This is the best quality cinnamon I've ever had. The aroma alone is worth every shilling. My chai has never been better!", rating: 5, location: "Nairobi" },
              { name: "James Kariuki", text: "The Garam Masala tastes genuinely freshly ground. You can really tell the difference from supermarket blends. Totally hooked!", rating: 5, location: "Westlands" },
              { name: "Fatuma Hassan", text: "Ordered the Saffron for my biryani. The colour and fragrance were absolutely stunning! Will never use cheap saffron again.", rating: 5, location: "Mombasa Road" },
            ].map((r) => (
              <div key={r.name} className="bg-white rounded-md p-6 border border-[var(--border)] shadow-sm">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[var(--bark)] text-sm leading-relaxed mb-4 italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm text-[var(--bark)]">{r.name}</p>
                  <p className="text-xs text-[var(--gray-400)]">{r.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ───────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm font-semibold text-[var(--herb)] tracking-widest uppercase mb-2">
                  Just Arrived
                </p>
                <h2 className="font-display font-bold text-4xl text-[var(--bark)]">
                  New Arrivals
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {newArrivals.map((product) => (
                <div
                  key={product.id}
                  className="group bg-[var(--cream)] rounded-md overflow-hidden border border-[var(--border)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={product.images[0]?.url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="herb">New</Badge>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-[var(--bark)] text-sm leading-snug mb-2 group-hover:text-[var(--spice)] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-[var(--spice)]">
                        {formatPrice(product.price)}
                        <span className="text-xs text-[var(--gray-400)] font-normal ml-1">/ {product.unit}</span>
                      </span>
                      <AddToCartButton product={product} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
