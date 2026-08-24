import { CategoryFormValues } from "@/schemas/category";

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  children?: CategoryItem[];
}

export interface UpdateCategoryReq {
  id: string;
  data: Partial<CategoryFormValues>;
}
