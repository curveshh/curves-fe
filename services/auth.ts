import { API } from "@/contants/api";
import { http } from "@/lib/api/axios";
import { LoginValues } from "@/schemas/login";
import { BaseResponse } from "@/types/base";
import { LoginRes } from "@/types/login";

export const authServices = {
  login: async (req: LoginValues) => {
    return await http.post<BaseResponse<LoginRes>>(API.LOGIN, req);
  },
  logout: async () => {
    return await http.post(API.LOGOUT, {});
  },
};
