"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, User, Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/layout/CartDrawer";

const navLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products/category/whole-spices", label: "Whole Spices" },
  { href: "/products/category/ground-spices", label: "Ground Spices" },
  { href: "/products/category/fresh-herbs", label: "Herbs" },
  { href: "/products/category/spice-blends", label: "Blends" },
  { href: "/products/category/beverages-brews", label: "Brews" },
  { href: "/products/category/natures-sweeteners", label: "Sweeteners" },
  { href: "/products/category/nuts-dried-fruits", label: "Nuts & Fruits" },
  { href: "/products/category/cooking-oils", label: "Oils" },
];

export function ClientNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openDrawer = useCartStore((s) => s.openDrawer);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3 py-1.5 text-md font-semibold rounded-md transition-colors duration-200",
              pathname === link.href || (link.href !== "/products" && pathname.startsWith(link.href))
                ? "text-[var(--spice)] bg-[var(--spice)]/10"
                : "text-[var(--bark-light)] hover:text-[var(--spice)] hover:bg-[var(--spice)]/5"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-1">
        <Link
          href="/products"
          className="p-2 rounded-md text-[var(--bark-light)] hover:text-[var(--spice)] hover:bg-[var(--spice)]/5 transition-colors duration-200"
          aria-label="Search"
        >
          <Search size={20} />
        </Link>
        <Link
          href="/account/wishlist"
          className="p-2 rounded-md text-[var(--bark-light)] hover:text-[var(--spice)] hover:bg-[var(--spice)]/5 transition-colors duration-200"
          aria-label="Wishlist"
        >
          <Heart size={20} />
        </Link>
        <Link
          href="/account"
          className="p-2 rounded-md text-[var(--bark-light)] hover:text-[var(--spice)] hover:bg-[var(--spice)]/5 transition-colors duration-200"
          aria-label="Account"
        >
          <User size={20} />
        </Link>
        <button
          id="cart-toggle-btn"
          onClick={openDrawer}
          className="relative p-2 rounded-md text-[var(--bark-light)] hover:text-[var(--spice)] hover:bg-[var(--spice)]/5 transition-colors duration-200"
          aria-label="Cart"
        >
          <ShoppingBag size={20} />
          {mounted && totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--spice)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md text-[var(--bark-light)] hover:bg-[var(--cream-dark)] transition-colors duration-200 ml-1"
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-[var(--bark)]/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-[var(--cream)] border-b border-[var(--border)] shadow-xl p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-[var(--spice)]/10 text-[var(--spice)]"
                    : "text-[var(--bark)] hover:bg-[var(--cream-dark)]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-[var(--border)] my-2" />
            <Link
              href="/account"
              className="block px-4 py-3 rounded-md text-sm font-medium text-[var(--bark)] hover:bg-[var(--cream-dark)]"
            >
              My Account
            </Link>
            <Link
              href="/account/wishlist"
              className="block px-4 py-3 rounded-md text-sm font-medium text-[var(--bark)] hover:bg-[var(--cream-dark)]"
            >
              Wishlist
            </Link>
          </div>
        </div>
      )}

      {/* Cart Drawer has been moved to global layout */}
    </>
  );
}
