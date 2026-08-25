import { QUERY_KEYS } from "@/queries/query-keys";
import { useApiMutation } from "@/queries/use-api-mutation";
import { useApiQuery } from "@/queries/use-api-query";
import { CategoryFormValues } from "@/schemas/category";
import { categoryService } from "@/services/category";
import { BaseResponse } from "@/types/base";
import { CategoryItem, UpdateCategoryReq } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCategory = () => {
  const queryClient = useQueryClient();

  const list = useApiQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: () => categoryService.list(),
    select: (response) => response.data,
  });

  const create = useApiMutation({
    mutationFn: (req: CategoryFormValues) => categoryService.create(req),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CATEGORIES,
      });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: UpdateCategoryReq) =>
      categoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CATEGORIES,
      });
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => categoryService.remove(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.CATEGORIES,
      });

      const previousCategories = queryClient.getQueryData(
        QUERY_KEYS.CATEGORIES,
      );

      queryClient.setQueryData(
        QUERY_KEYS.CATEGORIES,
        (old: BaseResponse<CategoryItem[]> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.filter((item) => String(item.id) !== id),
          };
        },
      );

      return { previousCategories };
    },

    onError: (_error, _id, context) => {
      // Rollback
      if (context?.previousCategories) {
        queryClient.setQueryData(
          QUERY_KEYS.CATEGORIES,
          context.previousCategories,
        );
      }
    },

    onSettled: () => {
      // Thành công hoặc lỗi đều sync lại với server
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CATEGORIES,
      });
    },
  });

  const move = useMutation({
    mutationFn: ({
      id,
      parentId,
      order,
    }: {
      id: string;
      parentId: number | null;
      order: number;
    }) =>
      categoryService.move(id, {
        parentId,
        order,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CATEGORIES,
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
