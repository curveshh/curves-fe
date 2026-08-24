"use client";

import { CategoryItem } from "@/types/category";
import { create } from "zustand";

type CategoryState = {
  categorySelected: CategoryItem | null;
  setCategorySelected: (category: CategoryItem | null) => void;
};

export const useCategoryStore = create<CategoryState>()((set) => ({
  categorySelected: null,
  setCategorySelected: (categorySelected: CategoryItem | null) =>
    set({ categorySelected }),
}));
