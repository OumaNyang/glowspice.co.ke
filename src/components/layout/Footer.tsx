import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const links = {
  shop: [
    { href: "/products/category/whole-spices", label: "Whole Spices" },
    { href: "/products/category/ground-spices", label: "Ground Spices" },
    { href: "/products/category/fresh-herbs", label: "Fresh Herbs" },
    { href: "/products/category/spice-blends", label: "Spice Blends" },
    { href: "/products/category/additives", label: "Additives" },
    { href: "/products/category/specialty-salts", label: "Specialty Salts" },
    { href: "/products/category/natures-sweeteners", label: "Nature's Sweeteners" },
    { href: "/products/category/beverages-brews", label: "Beverages & Brews" },
  ],
  account: [
    { href: "/account", label: "My Account" },
    { href: "/account/orders", label: "My Orders" },
    { href: "/account/wishlist", label: "Wishlist" },
    { href: "/login", label: "Sign In" },
    { href: "/register", label: "Create Account" },
  ],
  help: [
    { href: "/shipping-policy", label: "Shipping Policy" },
    { href: "/returns-refunds", label: "Returns & Refunds" },
    { href: "/track-order", label: "Track Order" },
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--bark)] text-[var(--sand)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[var(--spice)] to-[var(--spice-dark)] flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Glow<span className="text-[var(--spice-light)]">Spice</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[var(--sand)]/70 mb-6 max-w-xs">
              Sourcing the world&apos;s finest spices, herbs, and botanicals and delivering 
              them fresh to your kitchen — from Nairobi to your door.
            </p>
            <div className="space-y-2 text-sm text-[var(--sand)]/70">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[var(--spice-light)] shrink-0" />
                <span>Westlands, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[var(--spice-light)] shrink-0" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[var(--spice-light)] shrink-0" />
                <span>hello@glowspice.co.ke</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2">
              {links.shop.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--sand)]/70 hover:text-[var(--spice-light)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2">
              {links.account.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--sand)]/70 hover:text-[var(--spice-light)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Help</h4>
            <ul className="space-y-2">
              {links.help.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--sand)]/70 hover:text-[var(--spice-light)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

       
        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-[var(--sand)]/50">
            © {new Date().getFullYear()} GlowSpice Kenya. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-md bg-white/10 hover:bg-[var(--spice)] flex items-center justify-center text-[var(--sand)]/60 hover:text-white transition-all duration-200"
                aria-label="Social media"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
