import Link from "next/link";
import { LayoutDashboard, Package, Heart, User, LogOut } from "lucide-react";

const navItems = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard },
  { href: "/account/orders", label: "My Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/profile", label: "Profile", icon: User },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--cream)] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Profile card */}
            <div className="bg-white rounded-md p-5 border border-[var(--border)] mb-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--spice)] to-[var(--spice-dark)] rounded-full flex items-center justify-center text-white text-2xl font-display font-bold mx-auto mb-3">
                A
              </div>
              <p className="font-semibold text-[var(--bark)]">Amina Ochieng</p>
              <p className="text-sm text-[var(--gray-400)]">amina@example.com</p>
            </div>

            <nav className="bg-white rounded-md border border-[var(--border)] overflow-hidden">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-[var(--bark-light)] hover:text-[var(--spice)] hover:bg-[var(--spice)]/5 transition-colors border-b border-[var(--border)] last:border-0"
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
              <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={16} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}
