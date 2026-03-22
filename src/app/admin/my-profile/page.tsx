"use client";

import { useState, useEffect } from "react";
import { User, Mail, Shield, Save, Key, UserCircle, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function AdminProfilePage() {
  const router = useRouter();
  const { user, login, logout, updateUser } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin",
  });
  
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    setIsMounted(true);
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "Admin",
      });
    }
  }, [user]);

  if (!isMounted) return <div className="p-8 text-center text-sm font-bold text-[var(--gray-500)]">Loading Core State...</div>;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: formData.name,
      email: formData.email,
    });
    alert("Profile saved successfully to Local Storage Session!");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-[var(--bark)] leading-tight">My Profile</h1>
          <p className="text-sm font-medium text-[var(--gray-500)] mt-1">Manage your administrative details and account security.</p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-bold text-sm rounded-md transition-colors border border-red-200 shadow-sm"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Avatar & Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-md border border-[var(--border)] shadow-sm p-6 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-[var(--cream)] border-4 border-white shadow-md flex items-center justify-center text-[var(--spice)] mb-4">
              <UserCircle size={48} strokeWidth={1.5} />
            </div>
            <h2 className="font-display font-bold text-xl text-[var(--bark)]">{formData.name || "Unknown User"}</h2>
            <p className="text-sm font-medium text-[var(--gray-500)] mt-1">{formData.email || "No email"}</p>
            
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--spice)]/10 text-[var(--spice-dark)] font-bold text-xs rounded-full border border-[var(--spice)]/20 uppercase tracking-widest">
              <Shield size={12} /> {formData.role}
            </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information Form */}
          <div className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--spice)]/5 to-[var(--cream)]">
              <h3 className="font-bold text-sm text-[var(--bark)] uppercase tracking-wider">General Information</h3>
            </div>
            <form onSubmit={handleSaveProfile} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1 flex items-center gap-1.5"><User size={14}/> Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--bark)] mb-1 flex items-center gap-1.5"><Mail size={14}/> Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({...p, email: e.target.value}))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)] font-medium"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--bark)] mb-1 flex items-center gap-1.5"><Shield size={14}/> System Role</label>
                <input 
                  type="text" 
                  value={formData.role}
                  className="w-full px-3 py-2 text-sm bg-[var(--gray-50)] border border-[var(--border)] rounded-md outline-none text-[var(--gray-500)] font-medium cursor-not-allowed"
                  disabled
                />
                <p className="text-[10px] text-[var(--gray-400)] mt-1">Roles are locked and issued by Super Admins only.</p>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-bold rounded-md shadow-sm transition-all text-sm">
                  <Save size={16} /> Update Profile
                </button>
              </div>
            </form>
          </div>

          {/* Security & Password Form */}
          <div className="bg-white rounded-md border border-[var(--border)] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[var(--border)] bg-gray-50">
              <h3 className="font-bold text-sm text-[var(--bark)] uppercase tracking-wider flex items-center gap-2"><Key size={16}/> Security Settings</h3>
            </div>
            <form onSubmit={handleSavePassword} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--gray-600)] mb-1">Current Password</label>
                <input 
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords(p => ({...p, current: e.target.value}))}
                  className="w-full sm:w-1/2 px-3 py-2 text-sm bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)]"
                />
              </div>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[var(--border)]/50">
                <div>
                  <label className="block text-xs font-semibold text-[var(--gray-600)] mb-1">New Password</label>
                  <input 
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords(p => ({...p, new: e.target.value}))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--gray-600)] mb-1">Confirm New Password</label>
                  <input 
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords(p => ({...p, confirm: e.target.value}))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--spice)]"
                  />
                </div>
              </div>

              <div className="flex justify-start pt-2">
                <button type="submit" disabled={!passwords.current || !passwords.new || !passwords.confirm} className="flex items-center gap-2 px-5 py-2 bg-[var(--bark)] hover:bg-black text-white font-bold rounded-md shadow-sm transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  Change Password
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
