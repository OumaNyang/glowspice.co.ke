"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)] mb-2">
          Welcome Back
        </h1>
        <p className="text-[var(--gray-500)] text-sm">
          Sign in to your GlowSpice account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail size={16} />}
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
        />
        <Input
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          icon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-[var(--bark)] transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-[var(--spice)]" />
            <span className="text-[var(--gray-500)]">Remember me</span>
          </label>
          <Link href="#" className="text-[var(--spice)] font-semibold hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--gray-500)]">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[var(--spice)] font-semibold hover:underline">
          Create Account
        </Link>
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--border)] text-center">
        <Link href="/admin" className="text-xs text-[var(--gray-400)] hover:text-[var(--spice)] transition-colors">
          Admin Login →
        </Link>
      </div>
    </div>
  );
}
