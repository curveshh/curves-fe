import { BaseApiError, BaseResponse } from "@/types/base";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export function useApiMutation<TResponse, TRequest = void>(
  options: UseMutationOptions<BaseResponse<TResponse>, BaseApiError, TRequest>,
) {
  return useMutation(options);
}
