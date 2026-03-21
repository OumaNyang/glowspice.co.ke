"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function AccountRegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    login(email, name);
    toast.success("Account created successfully!");
    router.push("/account");
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-md shadow-xl border border-[var(--border)] p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-black text-[var(--bark)] mb-2">Create Account</h1>
          <p className="text-[var(--gray-500)] text-sm">Join the GlowSpice family.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[var(--bark)] mb-1.5">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-md border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent transition-all bg-white"
              placeholder="John Doe"
            />
          </div>

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
            <label className="block text-sm font-semibold text-[var(--bark)] mb-1.5">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-md border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--spice)] focus:border-transparent transition-all bg-white pr-12"
                placeholder="••••••••"
                minLength={6}
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
            className="w-full bg-[var(--bark)] hover:bg-black text-white font-bold py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-70 mt-4"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : (
              <>Register <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[var(--gray-600)]">
          Already have an account?{" "}
          <Link href="/account/login" className="font-bold text-[var(--spice)] hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
