import { API } from "@/contants/api";
import { Banner } from "@/types/banner";
import { BaseResponse } from "@/types/base";
import { baseFetch } from "./fetch";

export async function getBannerList() {
  return baseFetch<BaseResponse<Banner[]>>(API.BANNER, {
    next: {
      revalidate: 300,
      tags: ["banners"],
    },
  });
}
