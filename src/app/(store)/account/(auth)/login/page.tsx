"use client";

import { useAuthStore } from "@/store/authStore";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { loginUser } from "@/app/actions/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    
    try {
      const response = await loginUser(email);
      
      if (response.error || !response.user) {
        toast.error(response.error || "Login failed");
        setLoading(false);
        return;
      }
      
      const { user } = response;
      login(user.email, user.name, user.role);
      toast.success("Welcome back to GlowSpice!");
      
      const redirectTo = searchParams.get("redirect") || "/account";
      router.push(redirectTo);
    } catch (err) {
      toast.error("An error occurred during login");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-[var(--bark)] mb-1.5">Email Address</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent transition-all bg-white"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-[var(--bark)]">Password</label>
          <Link href="/account/forgot-password" rural-link="true" className="text-sm font-medium text-[var(--spice)] hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent transition-all bg-white pr-12"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--gray-400)] hover:text-[var(--bark)] transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-bold py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
      >
        {loading ? <Loader2 size={20} className="animate-spin" /> : (
          <>Sign In <ArrowRight size={18} /></>
        )}
      </button>
    </form>
  );
}

export default function AccountLoginPage() {
  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-md shadow-xl border border-[var(--border)] p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--spice)]/10 text-[var(--spice)] rounded-full flex items-center justify-center mx-auto mb-4 font-heading font-black text-2xl">
            G
          </div>
          <h1 className="text-3xl font-heading font-black text-[var(--bark)] mb-2">Account Login</h1>
          <p className="text-[var(--gray-500)] text-sm">Access your GlowSpice dashboard.</p>
        </div>

        <Suspense fallback={<div className="py-12 flex justify-center"><Loader2 className="animate-spin text-[var(--spice)]" size={32} /></div>}>
          <LoginForm />
        </Suspense>

        <div className="mt-8 text-center text-sm text-[var(--gray-600)]">
          Don't have an account?{" "}
          <Link href="/account/register" className="font-bold text-[var(--spice)] hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
