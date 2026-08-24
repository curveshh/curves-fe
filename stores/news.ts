"use client";

import { NewsPostFormValues } from "@/types/news";
import { create } from "zustand";

type CategoryState = {
  newsSelected: NewsPostFormValues | null;
  setNewsSelected: (news: NewsPostFormValues | null) => void;
};

export const useNewsStore = create<CategoryState>()((set) => ({
  newsSelected: null,
  setNewsSelected: (newsSelected: NewsPostFormValues | null) =>
    set({ newsSelected }),
}));
