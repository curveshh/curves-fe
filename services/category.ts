import { API } from "@/contants/api";
import { http } from "@/lib/api/axios";
import { CategoryFormValues } from "@/schemas/category";
import { BaseResponse } from "@/types/base";
import { CategoryItem } from "@/types/category";

export const categoryService = {
  list: async () => {
    return await http.get<BaseResponse<CategoryItem[]>>(API.CATEGORY);
  },

  create: async (req: CategoryFormValues) => {
    return await http.post<BaseResponse<CategoryItem>>(API.CATEGORY, req);
  },

  update: async (id: string, req: Partial<CategoryFormValues>) => {
    return await http.patch<BaseResponse<CategoryItem>>(
      `${API.CATEGORY}/${id}`,
      req,
    );
  },

  remove: async (id: string) => {
    return await http.delete(`${API.CATEGORY}/${id}`);
  },

  move: async (
    id: string,
    data: {
      parentId: number | null;
      order: number;
    },
  ) => {
    return await http.patch(`/categories/${id}/move`, data);
  },
};
