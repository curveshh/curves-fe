import { API } from "@/contants/api";
import { http } from "@/lib/api/axios";
import { baseFetch } from "@/lib/api/fetch";
import { Promotion } from "@/schemas/promotion";
import { BaseResponse } from "@/types/base";
import { SearchReqPromotion } from "@/types/promotion";

export const promotionService = {
  list: async (req: SearchReqPromotion) => {
    return await http.post<BaseResponse<Promotion[]>>(API.PROMOTION_LIST, req);
  },

  create: async (req: Promotion) => {
    return await http.post<BaseResponse<Promotion>>(API.PROMOTION, req);
  },

  update: async (id: number, req: Partial<Promotion>) => {
    return await http.patch<BaseResponse<Promotion>>(
      `${API.PROMOTION}/${id}`,
      req,
    );
  },

  remove: async (id: number) => {
    return await http.delete<BaseResponse<string>>(`${API.PROMOTION}/${id}`);
  },
};

export async function getPromotionDetails(id: number) {
  return baseFetch<BaseResponse<Promotion>>(
    API.PROMOTION_DETAILS.replace(":id", String(id)),
    {
      cache: "no-store",
    },
  );
}

export async function getPromotionHome() {
  return baseFetch<BaseResponse<Promotion>>(API.PROMOTION_HOME, {
    cache: "no-store",
    next: {
      revalidate: 500,
      tags: ["promotion"],
    },
  });
}
