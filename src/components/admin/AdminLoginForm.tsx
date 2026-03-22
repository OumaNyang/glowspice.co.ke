"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { loginAdmin } from "@/app/actions/auth";
import Link from "next/link";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin/dashboard";
  const login = useAuthStore((s) => s.login);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(async () => {
      try {
        const response = await loginAdmin(email, password, code);
        
        if (response.error) {
          toast.error(response.error);
          return;
        }

        if (response.twoFactor) {
          setShowTwoFactor(true);
          return;
        }

        const { user } = response;
        if (user) {
          if (user.role !== "admin") {
            toast.error("Unauthorized access. Admin privileges required.");
            return;
          }

          login(user as any);
          toast.success("Welcome to GlowSpice Admin!");
          router.push("/admin");
        }
      } catch (err) {
        toast.error("An error occurred during login");
      }
    });
  };

  return (
    <div className="px-6 py-4 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {showTwoFactor && (
          <div>
            <label className="block text-xs font-bold text-[var(--bark)] uppercase tracking-wider mb-2">2FA Code</label>
            <div className="relative">
              <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full bg-[var(--cream)] border border-[var(--border)] px-4 py-2.5 rounded-md focus:ring-2 focus:ring-[var(--spice)] outline-none transition-all text-center text-xl font-bold"
                placeholder="000000"
                maxLength={6}
              />
              <p className="mt-2 text-[10px] text-center text-[var(--gray-500)] font-medium">
                Enter the code sent to your admin email.
              </p>
            </div>
          </div>
        )}

        {!showTwoFactor && (
          <>
            <div>
              <label className="block text-xs font-bold text-[var(--bark)] uppercase tracking-wider mb-2">Admin Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[var(--cream)] border border-[var(--border)] px-4 py-2.5 rounded-md focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all pl-11"
                  placeholder="admin@glowspice.shop"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-400)]" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--bark)] uppercase tracking-wider mb-2">Master Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[var(--cream)] border border-[var(--border)] px-4 py-2.5 rounded-md focus:ring-1 focus:ring-[var(--spice)] focus:border-transparent outline-none transition-all pl-11 pr-11"
                  placeholder="••••••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-400)]" size={18} />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--gray-400)] hover:text-[var(--bark)]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </>
        )}

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-[var(--bark)] hover:bg-black text-white font-black py-3 rounded-md flex items-center justify-center gap-2 transform active:scale-95 transition-all shadow-lg hover:shadow-[var(--spice)]/20 disabled:opacity-70"
        >
          {isPending ? <Loader2 size={20} className="animate-spin" /> : (
            <>{showTwoFactor ? "CONFIRM CODE" : "LOGIN"} <ArrowRight size={20} /></>
          )}
        </button>

        {showTwoFactor && (
          <button
            type="button"
            onClick={() => setShowTwoFactor(false)}
            className="w-full text-[10px] font-bold text-[var(--gray-500)] hover:text-[var(--bark)] uppercase tracking-widest transition-colors"
          >
            Back to login
          </button>
        )}
      </form>

      <div className="text-center">
        <Link href="/" className="text-sm text-[var(--gray-400)] hover:text-[var(--spice)] transition-colors">
          ← Return to Storefront
        </Link>
      </div>
    </div>
  );
}
