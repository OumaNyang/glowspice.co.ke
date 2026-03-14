import Link from "next/link";
import { Leaf } from "lucide-react";
import { ClientNav } from "./ClientNav";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[var(--cream)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-[var(--shadow-sm)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="GlowSpice Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--spice)] to-[var(--spice-dark)] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Leaf size={16} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-[var(--bark)] leading-none">
                Glow<span className="text-[var(--spice)]">Spice</span>
              </span>
              <p className="text-[10px] text-[var(--gray-400)] leading-none tracking-widest uppercase">
                Nairobi, Kenya
              </p>
            </div>
          </Link>

          {/* Client-side nav (search, wishlist, cart, mobile menu) */}
          <ClientNav />
        </div>
      </div>
    </header>
  );
}
