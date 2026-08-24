import { Promotion } from "@/schemas/promotion";

export type UpdatePromotionReq = {
  id: number;
  data: Partial<Promotion>;
};

export type SearchReqPromotion = {
  keyword?: string;
};
