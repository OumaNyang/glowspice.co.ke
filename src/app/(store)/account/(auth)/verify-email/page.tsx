"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { verifyEmail } from "@/app/actions/auth";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px]">
      <h1 className="text-3xl font-heading font-black text-[var(--bark)] mb-4">
        Email Verification
      </h1>
      <div className="flex items-center justify-center w-full">
        {!success && !error && (
          <Loader2 className="w-8 h-8 animate-spin text-[var(--spice)]" />
        )}
        {success && (
          <div className="text-center">
            <p className="text-emerald-600 font-bold mb-4">{success}</p>
            <Link 
              href="/account/login" 
              className="text-[var(--spice)] hover:underline font-bold"
            >
              Back to login
            </Link>
          </div>
        )}
        {error && (
          <div className="text-center">
            <p className="text-rose-600 font-bold mb-4">{error}</p>
            <Link 
              href="/account/login" 
              className="text-[var(--spice)] hover:underline font-bold"
            >
              Back to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="max-w-md mx-auto py-20 px-4">
       <div className="bg-white rounded-md shadow-xl border border-[var(--border)] p-8">
          <Suspense fallback={<div className="flex justify-center py-10"><Loader2 className="animate-spin text-[var(--spice)]" /></div>}>
            <VerifyEmailContent />
          </Suspense>
       </div>
    </div>
  );
}
