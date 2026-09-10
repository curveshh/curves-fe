import { API } from "@/contants/api";
import { http } from "@/lib/api/axios";
import { BaseResponse } from "@/types/base";
import { Channel, Customer } from "@/types/customer";
import { SocialMessage } from "@/types/social";

export const socialServices = {
  create: async (channel: Channel, req: SocialMessage) => {
    return await http.post<BaseResponse<Customer>>(
      `${API.WEBHOOK_META}/${channel}`,
      req,
    );
  },
};
