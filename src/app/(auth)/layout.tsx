import Link from "next/link";
import { Leaf } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bark)] via-[#5c3524] to-[var(--herb-dark)] flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-10">
        <div className="w-10 h-10 bg-[var(--spice)] rounded-md flex items-center justify-center shadow-lg">
          <Leaf size={20} className="text-white" />
        </div>
        <span className="font-display font-bold text-2xl text-white">
          Glow<span className="text-[var(--spice-light)]">Spice</span>
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-[var(--cream)] rounded-3xl shadow-2xl overflow-hidden">
        {children}
      </div>

      <p className="text-white/30 text-xs mt-8">
        © {new Date().getFullYear()} GlowSpice Kenya
      </p>
    </div>
  );
}
