import { API } from "@/contants/api";
import { http } from "@/lib/api/axios";
import { CustomerFormValues } from "@/schemas/customer";
import { BaseResponse } from "@/types/base";
import { Channel, Customer } from "@/types/customer";

export const customerServices = {
  list: async (channel: Channel) => {
    return await http.get<BaseResponse<Customer[]>>(
      `${API.CUSTOMER}/${channel}`,
    );
  },
  create: async (req: CustomerFormValues) => {
    return await http.post<BaseResponse<Customer>>(API.CUSTOMER, req);
  },
};
