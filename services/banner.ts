import { API } from "@/contants/api";
import { http } from "@/lib/api/axios";
import { baseFetch } from "@/lib/api/fetch";
import { Banner } from "@/types/banner";
import { BaseResponse } from "@/types/base";

export const bannerServices = {
  list: async () => {
    return await http.get<BaseResponse<Banner[]>>(API.BANNER);
  },

  create: (values: Banner) =>
    http.post<BaseResponse<Banner>, Banner>(API.BANNER, values),

  update: async (id: string, req: Partial<Banner>) => {
    return await http.patch<BaseResponse<Banner>>(`${API.BANNER}/${id}`, req);
  },

  remove: async (id: string) => {
    return await http.delete<BaseResponse<void>>(`${API.BANNER}/${id}`);
  },

  move: async (
    id: string,
    data: {
      order: number;
    },
  ) => {
    return await http.patch<BaseResponse<void>>(
      `${API.BANNER}/${id}/move`,
      data,
    );
  },
};

export async function getBannerList() {
  return baseFetch<BaseResponse<Banner[]>>(API.BANNER, {
    next: {
      revalidate: 300,
      tags: ["banners"],
    },
  });
}
