"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Banner } from "@/lib/types";
import { initialBanners } from "@/lib/data";

interface AdminStore {
  banners: Banner[];
  setBanners: (banners: Banner[]) => void;
  updateBanner: (id: string, updates: Partial<Banner>) => void;
  addBanner: (banner: Banner) => void;
  removeBanner: (id: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      banners: initialBanners,
      setBanners: (banners) => set({ banners }),
      updateBanner: (id, updates) =>
        set((state) => ({
          banners: state.banners.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),
      addBanner: (banner) =>
        set((state) => ({
          banners: [...state.banners, banner],
        })),
      removeBanner: (id) =>
        set((state) => ({
          banners: state.banners.filter((b) => b.id !== id),
        })),
    }),
    {
      name: "admin-storage",
    }
  )
);
