import { ROUTE } from "@/contants/route";
import { QUERY_KEYS } from "@/queries/query-keys";
import { useApiMutation } from "@/queries/use-api-mutation";
import { useApiQuery } from "@/queries/use-api-query";
import { Promotion } from "@/schemas/promotion";
import { promotionService } from "@/services/promotion";
import { BaseResponse } from "@/types/base";
import { CategoryItem } from "@/types/category";
import { UpdatePromotionReq } from "@/types/promotion";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePromotion = (keyword: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const list = useApiQuery({
    queryKey: QUERY_KEYS.PROMOTIONS(keyword),
    queryFn: () =>
      promotionService.list({
        keyword,
      }),
    select: (response) => response.data,
  });

  const create = useApiMutation({
    mutationFn: (req: Promotion) => promotionService.create(req),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROMOTIONS(keyword),
      });
      router.push(ROUTE.DASHBOARD_PROMOTIONS);
    },
  });

  const update = useApiMutation({
    mutationFn: ({ id, data }: UpdatePromotionReq) =>
      promotionService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROMOTIONS(keyword),
      });
      router.push(ROUTE.DASHBOARD_PROMOTIONS);
    },
  });

  const remove = useApiMutation({
    mutationFn: (id: number) => promotionService.remove(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.PROMOTIONS(keyword),
      });

      const previousCategories = queryClient.getQueryData(
        QUERY_KEYS.PROMOTIONS(keyword),
      );

      queryClient.setQueryData(
        QUERY_KEYS.PROMOTIONS(keyword),
        (old: BaseResponse<CategoryItem[]> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.filter((item) => item.id !== id),
          };
        },
      );

      return { previousCategories };
    },

    onSettled: () => {
      // Thành công hoặc lỗi đều sync lại với server
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROMOTIONS(keyword),
      });
      router.push(ROUTE.DASHBOARD_PROMOTIONS);
    },
  });

  return {
    list,
    create,
    update,
    remove,
  };
};
