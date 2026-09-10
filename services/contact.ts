import { API } from "@/contants/api";
import { http } from "@/lib/api/axios";
import { baseFetch } from "@/lib/api/fetch";
import { Contact } from "@/schemas/contact";
import { BaseResponse } from "@/types/base";

export const contactServices = {
  list: async () => {
    return await http.get<BaseResponse<Contact>>(API.CONTACT);
  },

  update: async (req: Partial<Contact>) => {
    return await http.put<BaseResponse<Contact>>(`${API.CONTACT}`, req);
  },
};

export async function getContact() {
  return baseFetch<BaseResponse<Contact>>(API.CONTACT, {
    cache: "no-store",
  });
}
