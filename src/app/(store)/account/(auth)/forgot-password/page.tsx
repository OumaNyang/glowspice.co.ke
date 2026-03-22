"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";

import { forgotPassword } from "@/app/actions/auth";

export default function AccountForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      if (response.error) {
        toast.error(response.error);
      } else {
        setSubmitted(true);
        toast.success("Reset link sent!");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-md shadow-xl border border-[var(--border)] p-8">
        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[var(--bark)]/5 text-[var(--bark)] rounded-full flex items-center justify-center mx-auto mb-4">
                <KeyRound size={28} />
              </div>
              <h1 className="text-3xl font-heading font-black text-[var(--bark)] mb-2">Reset Password</h1>
              <p className="text-[var(--gray-500)] text-sm">Enter your email and we'll send you a link to reset your password.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[var(--bark)] mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-md border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--bark)] focus:border-transparent transition-all bg-white"
                  placeholder="you@example.com"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[var(--bark)] hover:bg-black text-white font-bold py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-70 mt-2"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-[var(--bark)] mb-4">Check your inbox</h2>
            <p className="text-[var(--gray-500)] mb-8">
              We've sent a link to reset your password to <strong>{email}</strong>.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-[var(--spice)] font-bold hover:underline"
            >
              Try another email address
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center text-sm">
          <Link href="/account/login" className="font-bold text-[var(--bark-light)] hover:text-[var(--bark)] hover:underline">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
