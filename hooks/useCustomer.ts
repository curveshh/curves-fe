import { QUERY_KEYS } from "@/queries/query-keys";
import { useApiMutation } from "@/queries/use-api-mutation";
import { useApiQuery } from "@/queries/use-api-query";
import { CustomerFormValues } from "@/schemas/customer";
import { customerServices } from "@/services/customer";
import { Channel } from "@/types/customer";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCustomer = (channel: Channel) => {
  const queryClient = useQueryClient();

  const { data } = useApiQuery({
    queryKey: QUERY_KEYS.CUSTOMER,
    queryFn: () => customerServices.list(channel),
    select: (response) => response.data,
  });

  const create = useApiMutation({
    mutationFn: (data: CustomerFormValues) => customerServices.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CUSTOMER,
      });
      toast.success("Cập nhật thông tin liên hệ thành công");
    },

    onError: () => {
      toast.error("Cập nhật thông tin liên hệ thất bại");
    },
  });

  return {
    list: data,
    create,
  };
};
