import { API } from "@/contants/api";
import { BaseOption, BaseResponse } from "@/types/base";
import { NewsListParams, NewsPostFormValues } from "@/types/news";
import { baseFetch } from "./fetch";

export async function getNewsList(params: NewsListParams) {
  return baseFetch<BaseResponse<NewsPostFormValues[]>>(API.NEWS_LIST, {
    method: "POST",
    body: JSON.stringify(params),
    cache: "no-store",
  });
}

export async function getBadgeOptions() {
  return baseFetch<BaseResponse<BaseOption>>(API.BADGE_OPTIONS, {
    cache: "no-store",
  });
}
