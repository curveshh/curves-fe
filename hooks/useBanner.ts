import { QUERY_KEYS } from "@/queries/query-keys";
import { useApiMutation } from "@/queries/use-api-mutation";
import { useApiQuery } from "@/queries/use-api-query";
import { bannerServices } from "@/services/banner";
import { Banner, MoveBannerReq, UpdateBannerRequest } from "@/types/banner";
import { useQueryClient } from "@tanstack/react-query";

export const useBanner = () => {
  const queryClient = useQueryClient();

  const list = useApiQuery({
    queryFn: () => bannerServices.list(),
    queryKey: QUERY_KEYS.BANNERS,
    select(data) {
      return data.data;
    },
  });

  const create = useApiMutation<Banner, Banner>({
    mutationFn: (req: Banner) => bannerServices.create(req),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANNERS,
      });
    },
  });

  const update = useApiMutation<Banner, UpdateBannerRequest>({
    mutationFn: ({ id, req }) => bannerServices.update(id, req),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANNERS,
      });
    },
  });

  const remove = useApiMutation<void, string>({
    mutationFn: (id: string) => bannerServices.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANNERS,
      });
    },
  });

  const move = useApiMutation<void, MoveBannerReq>({
    mutationFn: ({ id, order }: MoveBannerReq) =>
      bannerServices.move(id, { order }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANNERS,
      });
    },
  });

  return {
    list,
    create,
    update,
    remove,
    move,
  };
};
