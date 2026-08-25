"use client";

import { useQuery } from "@tanstack/react-query";
import { getClubs, type Club } from "@/lib/api/club";

export function useClubs(initialData?: Club[]) {
  return useQuery({
    queryKey: ["clubs"],
    queryFn: getClubs,
    initialData,
    staleTime: 1000 * 60 * 5,
  });
}
