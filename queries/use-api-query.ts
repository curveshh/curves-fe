import { BaseApiError, BaseResponse } from "@/types/base";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

export function useApiQuery<TResponse, TData = BaseResponse<TResponse>>(
  options: UseQueryOptions<
    BaseResponse<TResponse>,
    BaseApiError,
    TData,
    QueryKey
  >,
) {
  return useQuery(options);
}
