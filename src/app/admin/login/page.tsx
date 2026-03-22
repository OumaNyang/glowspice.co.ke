import { Metadata } from "next";
import { Lock } from "lucide-react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

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

        <AdminLoginForm />
      </div>
    </div>
  );
}
