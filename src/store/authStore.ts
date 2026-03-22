import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser } from "@/lib/types";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      updateUser: (user) => set((state) => ({
        user: state.user ? { ...state.user, ...user } as AuthUser : null
      })),
    }),
    {
      name: 'glowspice-auth-storage', // localStorage key
    }
  )
);
