import { API } from "@/contants/api";
import { http } from "@/lib/api/axios";
import { BaseResponse, Pagination } from "@/types/base";
import { NewsPostFormValues } from "@/types/news";

export const newsService = {
  checkSlug: (slug: string) =>
    http.get<BaseResponse<{ slug: string }>>(API.CHECK_NEWS_SLUG, {
      params: { slug },
    }),

  list: async (req: Pagination) => {
    return await http.post<BaseResponse<NewsPostFormValues[]>, Pagination>(
      API.NEWS_LIST,
      req,
    );
  },

  create: (values: NewsPostFormValues) =>
    http.post<BaseResponse<NewsPostFormValues>, NewsPostFormValues>(
      API.NEWS,
      values,
    ),

  update: async (id: string, req: Partial<NewsPostFormValues>) => {
    return await http.patch<BaseResponse<NewsPostFormValues>>(
      `${API.NEWS}/${id}`,
      req,
    );
  },

  remove: async (id: string) => {
    return await http.delete<BaseResponse<void>>(`${API.NEWS}/${id}`);
  },

  getBySlug: async (slug: string) => {
    return await http.get<BaseResponse<NewsPostFormValues>>(
      `${API.DETAIL_NEWS_BY_SLUG.replace(":slug", slug)}`,
    );
  },
};
