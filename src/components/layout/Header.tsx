import Link from "next/link";
import Image from "next/image";
import { ClientNav } from "./ClientNav";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[var(--cream)]/95 backdrop-blur-md border-b border-[var(--spice)]/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
            <Image 
              src="/images/glowspice-logo.png" 
              alt="GlowSpice Logo" 
              width={160} 
              height={24} 
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Client-side nav (search, wishlist, cart, mobile menu) */}
          <ClientNav />
        </div>
      </div>
    </header>
  );
}
