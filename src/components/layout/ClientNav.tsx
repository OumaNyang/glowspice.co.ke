"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Heart, User, Menu, X, Search, ChevronDown, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/layout/CartDrawer";

type NavLink = {
  label: string;
  href?: string;
  subLinks?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { href: "/products", label: "Shop All" },
  { 
    label: "Spices & Herbs", 
    subLinks: [
      { href: "/products/category/whole-spices", label: "Whole Spices" },
      { href: "/products/category/ground-spices", label: "Ground Spices" },
      { href: "/products/category/spice-blends", label: "Spice Blends" },
      { href: "/products/category/fresh-herbs", label: "Fresh Herbs" },
      { href: "/products/category/specialty-salts", label: "Specialty Salts" },
    ]
  },
  { 
    label: "Pantry", 
    subLinks: [
      { href: "/products/category/cooking-oils", label: "Cooking Oils" },
      { href: "/products/category/nuts-dried-fruits", label: "Nuts & Dried Fruits" },
      { href: "/products/category/natures-sweeteners", label: "Sweeteners" },
      { href: "/products/category/beverages-brews", label: "Beverages & Brews" },
    ]
  },
  { 
    label: "Sauces & Condiments", 
    subLinks: [
      { href: "/products/category/soy-sauces", label: "Soy & Teriyaki" },
      { href: "/products/category/seasoning-pastes", label: "Seasoning Pastes" },
      { href: "/products/category/hot-sauces", label: "Hot & Chili Oils" },
      { href: "/products/category/marinades", label: "Marinades & Glazes" },
    ]
  },
  { 
    label: "Learn", 
    subLinks: [
      { href: "/learn/guide", label: "The Spice Guide" },
      { href: "/learn/sourcing", label: "Our Sourcing" },
      { href: "/learn/health", label: "Health Benefits" },
    ]
  },
  { href: "/recipes", label: "Recipes" },
  { href: "/about", label: "About Us" },
];

export function ClientNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openDrawer = useCartStore((s) => s.openDrawer);
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setExpandedMenu(null);
  }, [pathname]);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          link.subLinks ? (
            <div key={link.label} className="relative group">
              <button className={cn(
                "py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5",
                link.subLinks.some(sub => pathname.startsWith(sub.href)) 
                  ? "text-[var(--spice)]" 
                  : "text-[var(--bark)] hover:text-[var(--spice)]"
              )}>
                {link.label}
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                <div className="relative bg-[var(--cream)] border border-[var(--border)] shadow-xl rounded-md py-2 w-56 flex flex-col overflow-hidden
                  before:content-[''] before:absolute before:-top-[9px] before:left-1/2 before:-translate-x-1/2 before:border-[8px] before:border-transparent before:border-b-[var(--border)]
                  after:content-[''] after:absolute after:-top-[8px] after:left-1/2 after:-translate-x-1/2 after:border-[8px] after:border-transparent after:border-b-[var(--cream)]
                ">
                  {link.subLinks.map(sub => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={cn(
                        "px-4 py-2.5 text-sm font-semibold transition-all duration-200 block border-l-2",
                         pathname === sub.href 
                           ? "text-[var(--spice)] bg-[var(--spice)]/5 border-[var(--spice)]" 
                           : "text-[var(--bark-light)] border-transparent hover:bg-[var(--spice)]/5 hover:text-[var(--spice)] hover:border-[var(--spice)] hover:pl-5"
                      )}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={link.label}
              href={link.href!}
              className={cn(
                "py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200",
                pathname === link.href || (link.href !== "/products" && pathname.startsWith(link.href!))
                  ? "text-[var(--spice)]"
                  : "text-[var(--bark)] hover:text-[var(--spice)]"
              )}
            >
              {link.label}
            </Link>
          )
        ))}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-2">
        <Link
          href="/products"
          className="p-1.5 text-[var(--bark-light)] hover:text-[var(--spice)] hover:scale-110 transition-transform duration-200"
          aria-label="Search"
        >
          <Search size={22} />
        </Link>
        <Link
          href="/account/wishlist"
          className="p-1.5 text-[var(--bark-light)] hover:text-[var(--spice)] hover:scale-110 transition-transform duration-200"
          aria-label="Wishlist"
        >
          <Heart size={22} />
        </Link>
        <Link
          href={isAuthenticated ? "/account" : "/account/login"}
          className="p-1.5 text-[var(--bark-light)] hover:text-[var(--spice)] hover:scale-110 transition-transform duration-200"
          aria-label="Account"
        >
          <User size={22} />
        </Link>
        <button
          id="cart-toggle-btn"
          onClick={openDrawer}
          className="relative p-1.5 text-[var(--bark-light)] hover:text-[var(--spice)] hover:scale-110 transition-transform duration-200"
          aria-label="Cart"
        >
          <ShoppingBag size={22} />
          {mounted && totalItems > 0 && (
            <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[var(--spice)] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-[var(--cream)]">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-1.5 text-[var(--bark-light)] hover:text-[var(--spice)] transition-colors duration-200 ml-2"
          aria-label="Open mobile menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer Menu via Portal */}
      {mounted && createPortal(
        <div 
          className={cn(
            "fixed inset-0 z-[100] md:hidden transition-all duration-300",
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          {/* Backdrop */}
          <div
            className={cn(
              "absolute inset-0 bg-[var(--bark)]/50 backdrop-blur-sm transition-opacity duration-300",
              mobileOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setMobileOpen(false)}
          />
          
          {/* Drawer */}
          <div 
            className={cn(
              "absolute top-0 left-0 bottom-0 w-full bg-[var(--cream)] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 group transition-opacity hover:opacity-90">
                <Image 
                  src="/images/glowspice-logo.png" 
                  alt="GlowSpice Logo" 
                  width={150} 
                  height={20} 
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md text-[var(--bark-light)] hover:bg-[var(--cream-dark)] hover:text-[var(--spice)] transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-4 text-left">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.subLinks ? (
                  <div>
                    <button 
                      onClick={() => setExpandedMenu(expandedMenu === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between py-4 border-b border-[var(--border)] text-lg font-bold text-[var(--bark)] hover:text-[var(--spice)] transition-colors"
                    >
                      {link.label}
                      <ChevronDown size={20} className={cn("transition-transform duration-200", expandedMenu === link.label ? "rotate-180" : "")} />
                    </button>
                    <div 
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        expandedMenu === link.label ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="flex flex-col pl-4 border-l-2 border-[var(--spice)]/20 ml-2 space-y-2 mb-2">
                        {link.subLinks.map(sub => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "block py-2 text-base font-semibold transition-colors",
                              pathname === sub.href ? "text-[var(--spice)]" : "text-[var(--bark-light)] hover:text-[var(--spice)]"
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href!}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-4 border-b border-[var(--border)] text-lg font-bold transition-colors",
                      pathname === link.href || (link.href !== "/products" && pathname.startsWith(link.href!))
                        ? "text-[var(--spice)]"
                        : "text-[var(--bark)] hover:text-[var(--spice)]"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-4 border-b border-[var(--border)] text-lg font-bold text-[var(--bark)] hover:text-[var(--spice)] transition-colors"
                >
                  <User size={20} />
                  My Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center justify-start gap-3 py-4 border-b border-[var(--border)] text-lg font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/account/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 py-4 bg-[var(--bark)] text-white hover:bg-black rounded-xl text-lg font-bold transition-colors mt-6"
              >
                Sign In / Register
              </Link>
            )}
            <Link
              href="/account/wishlist"
              className="flex items-center gap-3 py-4 border-b border-[var(--border)] text-lg font-bold text-[var(--bark)] hover:text-[var(--spice)] transition-colors"
            >
              <Heart size={20} />
              Wishlist
            </Link>
          </div>
        </div>
      </div>, document.body)}

      {/* Cart Drawer has been moved to global layout */}
    </>
  );
}
