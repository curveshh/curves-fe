import { API } from "@/contants/api";
import { Promotion } from "@/schemas/promotion";
import { BaseResponse } from "@/types/base";
import { baseFetch } from "./fetch";

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
