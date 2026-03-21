import { Metadata } from "next";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Login | GlowSpice",
  description: "Administrative access to the GlowSpice dashboard.",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[var(--bark)] flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-md shadow-2xl overflow-hidden border border-white/10">
        <div className="bg-[var(--spice)] px-6 py-2 text-center text-white">
          <div className="w-18 h-18 bg-white/20 rounded-md flex items-center justify-center mx-auto mb-2 backdrop-blur-md border border-white/30">
            <Lock size={35} />
          </div>
          <h1 className="text-xl font-heading font-black">Admin Access</h1>
         </div>

        <div className="px-6 py-4 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[var(--bark)] uppercase tracking-wider mb-2">Admin Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  className="w-full bg-[var(--cream)] border border-[var(--border)] px-4 py-2.5 rounded-md focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all pl-11"
                  placeholder="[EMAIL_ADDRESS]"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-400)]" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--bark)] uppercase tracking-wider mb-2">Master Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  className="w-full bg-[var(--cream)] border border-[var(--border)] px-4 py-2.5 rounded-md focus:ring-1 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all pl-11 pr-11"
                  placeholder="••••••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-400)]" size={18} />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--gray-400)] hover:text-[var(--bark)]">
                  <Eye size={18} />
                </button>
              </div>
            </div>
          </div>

          <button className="w-full bg-[var(--bark)] hover:bg-black text-white font-black py-3 rounded-md flex items-center justify-center gap-2 transform active:scale-95 transition-all shadow-lg hover:shadow-[var(--spice)]/20">
            LOGIN <ArrowRight size={20} />
          </button>

          <div className="text-center">
            <Link href="/" className="text-sm text-[var(--gray-400)] hover:text-[var(--spice)] transition-colors">
              ← Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
