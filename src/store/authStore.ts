import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  name: string;
  email: string;
  role?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, name: string, role?: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, name) => set({ isAuthenticated: true, user: { email, name } }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'glowspice-auth-storage', // localStorage key
    }
  )
);
