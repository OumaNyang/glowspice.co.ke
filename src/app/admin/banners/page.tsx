"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Eye, EyeOff, Image as ImageIcon } from "lucide-react";
import { useAdminStore } from "@/store/adminStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

export default function BannerManagementPage() {
  const { banners, addBanner, removeBanner, updateBanner } = useAdminStore();
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAdd = () => {
    if (!newImageUrl) return;
    const id = `banner_${Date.now()}`;
    addBanner({
      id,
      image: newImageUrl,
      isActive: true,
    });
    setNewImageUrl("");
    toast.success("New banner added successfully");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--bark)]">Hero Banners</h1>
          <p className="text-[var(--gray-400)] text-sm">Manage the carousel images on your homepage</p>
        </div>
      </div>

      {/* Add New Banner */}
      <div className="bg-white p-6 rounded-xl border border-[var(--border)] mb-8 shadow-sm">
        <h2 className="font-semibold mb-4 text-[var(--bark)] flex items-center gap-2">
          <Plus size={18} className="text-[var(--spice)]" />
          Add New Banner
        </h2>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]">
              <ImageIcon size={18} />
            </div>
            <Input
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Paste image URL here (e.g., /images/banner1.png)"
              className="pl-10"
            />
          </div>
          <Button onClick={handleAdd} variant="primary" disabled={!newImageUrl}>
            Add Banner
          </Button>
        </div>
      </div>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-xl border border-[var(--border)] overflow-hidden shadow-sm group">
            <div className="aspect-[21/9] relative bg-[var(--cream)]">
              <Image src={banner.image} alt="Banner Preview" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => updateBanner(banner.id, { isActive: !banner.isActive })}
                  className="p-2 rounded-full bg-white text-[var(--bark)] hover:bg-[var(--spice)] hover:text-white transition-all shadow-lg"
                  title={banner.isActive ? "Deactivate" : "Activate"}
                >
                  {banner.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={() => {
                    removeBanner(banner.id);
                    toast.info("Banner removed");
                  }}
                  className="p-2 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-4 border-t border-[var(--border)] flex items-center justify-between">
              <code className="text-[10px] text-[var(--gray-400)] truncate max-w-[150px]">
                {banner.image}
              </code>
              <div className="flex items-center gap-2">
                {banner.isActive ? (
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-600 text-[10px] font-bold uppercase">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold uppercase">
                    Inactive
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
