"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Mail, Phone, MapPin } from "lucide-react";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "Amina Ochieng",
    email: "amina@example.com",
    phone: "+254 712 345 678",
    address: "14 Garden Estate Road",
    city: "Nairobi",
    bio: "",
  });

  const update = (field: string, val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Profile Settings</h1>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Avatar section */}
        <div className="bg-white rounded-md border border-[var(--border)] p-6 flex items-center gap-5">
          <div className="w-20 h-20 bg-gradient-to-br from-[var(--spice)] to-[var(--spice-dark)] rounded-full flex items-center justify-center text-white text-3xl font-display font-bold shrink-0">
            {form.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-[var(--bark)]">Profile Photo</p>
            <p className="text-sm text-[var(--gray-400)] mb-3">JPG or PNG, max 2MB</p>
            <button type="button" className="text-sm px-4 py-2 border border-[var(--border)] rounded-md hover:bg-[var(--cream-dark)] transition-colors text-[var(--bark-light)] font-medium">
              Change Photo
            </button>
          </div>
        </div>

        {/* Personal info */}
        <div className="bg-white rounded-md border border-[var(--border)] p-6 space-y-4">
          <h2 className="font-semibold text-[var(--bark)]">Personal Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              id="name"
              label="Full Name"
              icon={<User size={15} />}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              icon={<Mail size={15} />}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            <Input
              id="phone"
              label="Phone"
              icon={<Phone size={15} />}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
            <Input
              id="city"
              label="City"
              icon={<MapPin size={15} />}
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
            <div className="sm:col-span-2">
              <Input
                id="address"
                label="Street Address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Textarea
                id="bio"
                label="Bio (optional)"
                placeholder="Tell us a bit about yourself..."
                rows={3}
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="bg-white rounded-md border border-[var(--border)] p-6 space-y-4">
          <h2 className="font-semibold text-[var(--bark)]">Change Password</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input id="currentPw" label="Current Password" type="password" placeholder="••••••••" />
            <Input id="newPw" label="New Password" type="password" placeholder="••••••••" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" size="lg" loading={loading}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </Button>
          {saved && <p className="text-sm text-[var(--herb)] font-semibold">Your profile has been updated.</p>}
        </div>
      </form>
    </div>
  );
}
