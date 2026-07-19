"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";
import type { CarItem } from "@/types";

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<CarItem>) => {
      const res = await api.post<CarItem>(endpoints.items.create, data);
      if (!res.success || !res.data) throw new Error(res.error || "Failed to create listing");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}

export function useUpdateItem(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<CarItem>) => {
      const res = await api.put<CarItem>(endpoints.items.update(id), data);
      if (!res.success || !res.data) throw new Error(res.error || "Failed to update listing");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", id] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(endpoints.items.delete(id));
      if (!res.success) throw new Error(res.error || "Failed to delete listing");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
