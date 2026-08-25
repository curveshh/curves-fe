"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";
import type { Banner, Post } from "@/lib/data/admin";
const useContentMutation = <T>(
  key: string,
  request: (payload: T) => Promise<unknown>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: request,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });
};
export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => (await api.get<Post[]>("/admin/posts")).data,
  });
}
export function usePostMutations() {
  return {
    create: useContentMutation<Omit<Post, "id" | "updatedAt">>(
      "posts",
      (payload) => api.post("/admin/posts", payload),
    ),
    update: useContentMutation<{ id: string; values: Partial<Post> }>(
      "posts",
      ({ id, values }) => api.patch(`/admin/posts/${id}`, values),
    ),
    remove: useContentMutation<string>("posts", (id) =>
      api.delete(`/admin/posts/${id}`),
    ),
  };
}
export function useBanners() {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => (await api.get<Banner[]>("/admin/banners")).data,
  });
}
export function useBannerMutations() {
  return {
    create: useContentMutation<Omit<Banner, "id">>("banners", (payload) =>
      api.post("/admin/banners", payload),
    ),
    update: useContentMutation<{ id: string; values: Partial<Banner> }>(
      "banners",
      ({ id, values }) => api.patch(`/admin/banners/${id}`, values),
    ),
    remove: useContentMutation<string>("banners", (id) =>
      api.delete(`/admin/banners/${id}`),
    ),
  };
}
