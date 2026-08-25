"use client";

import { User } from "@/schemas/login";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  user: User | null;
  setSession: (accessToken: string) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setSession: (accessToken) => set({ accessToken }),
      clearSession: () => set({ accessToken: null }),
    }),
    {
      name: "curves-auth",
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    },
  ),
);
