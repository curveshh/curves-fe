import { ROUTE } from "@/contants/route";
import { QUERY_KEYS } from "@/queries/query-keys";
import { useApiMutation } from "@/queries/use-api-mutation";
import { useApiQuery } from "@/queries/use-api-query";
import { newsService } from "@/services/news";
import { Pagination } from "@/types/base";
import { NewsPostFormValues } from "@/types/news";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type UpdateNewsRequest = {
  id: string;
  req: Partial<NewsPostFormValues>;
};

export const useNews = (req: Pagination = { page: 1, limit: 10 }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const list = useApiQuery({
    queryFn: () => newsService.list(req),
    queryKey: [...QUERY_KEYS.NEWS, req],
  });

  const prefetchList = useCallback(
    (nextReq: Pagination) =>
      queryClient.prefetchQuery({
        queryFn: () => newsService.list(nextReq),
        queryKey: [...QUERY_KEYS.NEWS, nextReq],
      }),
    [queryClient],
  );

  const create = useApiMutation<NewsPostFormValues, NewsPostFormValues>({
    mutationFn: (req: NewsPostFormValues) => newsService.create(req),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.NEWS, req],
      });

      router.push(ROUTE.LIST_POST);
    },
  });

  const update = useApiMutation<NewsPostFormValues, UpdateNewsRequest>({
    mutationFn: ({ id, req }) => newsService.update(id, req),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.NEWS, req],
      });

      router.push(ROUTE.LIST_POST);
    },
  });

  const remove = useApiMutation<void, string>({
    mutationFn: (id: string) => newsService.remove(id),
    onSuccess: async () => {
      router.refresh();
    },
  });

  const useGetBySlug = (slug: string) =>
    useApiQuery<NewsPostFormValues, string>({
      queryKey: QUERY_KEYS.NEWS_BY_SLUG(slug),
      queryFn: () => newsService.getBySlug(slug),
    });

  return {
    list,
    prefetchList,
    create,
    update,
    remove,
    getBySlug: useGetBySlug,
  };
};
