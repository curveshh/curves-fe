import { QUERY_KEYS } from "@/queries/query-keys";
import { useApiQuery } from "@/queries/use-api-query";
import { Contact } from "@/schemas/contact";
import { contactServices } from "@/services/contact";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useContact = () => {
  const queryClient = useQueryClient();

  const list = useApiQuery({
    queryKey: QUERY_KEYS.CONTACT,
    queryFn: () => contactServices.list(),
    select: (response) => response.data,
  });

  const update = useMutation({
    mutationFn: (data: Contact) => contactServices.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CONTACT,
      });
      toast.success("Cập nhật thông tin liên hệ thành công");
    },

    onError: () => {
      toast.error("Cập nhật thông tin liên hệ thất bại");
    },
  });

  return {
    list,
    update,
  };
};
