"use client";

import { useSearchParams } from "next/navigation";
import { useState, useTransition, Suspense } from "react";
import { Lock, Loader2, ArrowRight } from "lucide-react";
import { resetPassword } from "@/app/actions/auth";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
       toast.error("Passwords do not match!");
       return;
    }

    if (!token) {
       toast.error("Missing token!");
       return;
    }
    
    startTransition(() => {
      resetPassword(password, token)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            router.push("/account/login");
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-[var(--bark)] mb-1.5">
          New Password
        </label>
        <div className="relative">
          <input
            disabled={isPending}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--spice)] transition-all pl-11 bg-white"
            placeholder="••••••••"
          />
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-400)]" size={18} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[var(--bark)] mb-1.5">
          Confirm Password
        </label>
        <div className="relative">
          <input
            disabled={isPending}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-md border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--spice)] transition-all pl-11 bg-white"
            placeholder="••••••••"
          />
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-400)]" size={18} />
        </div>
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="w-full bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-bold py-3.5 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>Reset Password <ArrowRight size={18} /></>
        )}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-white rounded-md shadow-xl border border-[var(--border)] p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-black text-[var(--bark)] mb-2">
            Reset Password
          </h1>
          <p className="text-[var(--gray-500)] text-sm">
            Enter your new password below.
          </p>
        </div>

        <Suspense fallback={<div className="flex justify-center py-10"><Loader2 className="animate-spin text-[var(--spice)]" /></div>}>
          <ResetPasswordForm />
        </Suspense>

        <div className="mt-8 text-center text-sm text-[var(--gray-600)]">
           <Link href="/account/login" className="font-bold text-[var(--spice)] hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
