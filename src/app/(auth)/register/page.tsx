"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const update = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)] mb-2">
          Create Account
        </h1>
        <p className="text-[var(--gray-500)] text-sm">
          Join thousands of happy GlowSpice customers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Full Name"
          placeholder="Jane Doe"
          icon={<User size={16} />}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail size={16} />}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
        />
        <Input
          id="phone"
          label="Phone Number"
          placeholder="+254 700 000 000"
          icon={<Phone size={16} />}
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <Input
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Min 8 characters"
          icon={<Lock size={16} />}
          rightIcon={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-[var(--bark)] transition-colors">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          required
        />

        <p className="text-xs text-[var(--gray-400)]">
          By creating an account, you agree to our{" "}
          <Link href="#" className="text-[var(--spice)] hover:underline">Terms of Service</Link>{" "}
          and{" "}
          <Link href="#" className="text-[var(--spice)] hover:underline">Privacy Policy</Link>.
        </p>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--gray-500)]">
        Already have an account?{" "}
        <Link href="/login" className="text-[var(--spice)] font-semibold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
