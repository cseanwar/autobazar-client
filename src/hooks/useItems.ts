"use client";

import { useQuery } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";
import type { CarItem, PaginatedResponse } from "@/types";

interface ItemFilters {
  page?: number;
  limit?: number;
  search?: string;
  make?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  condition?: string;
  bodyType?: string;
  sortBy?: string;
  sortOrder?: string;
}

function buildQueryString(filters: ItemFilters): string {
  const params = new URLSearchParams();
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.search) params.set("search", filters.search);
  if (filters.make) params.set("make", filters.make);
  if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
  if (filters.fuelType) params.set("fuelType", filters.fuelType);
  if (filters.condition) params.set("condition", filters.condition);
  if (filters.bodyType) params.set("bodyType", filters.bodyType);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
  return params.toString();
}

export function useItems(filters: ItemFilters = {}) {
  return useQuery({
    queryKey: ["items", filters],
    queryFn: async () => {
      const qs = buildQueryString(filters);
      const res = await api.get<PaginatedResponse<CarItem>>(endpoints.items.list(qs));
      if (!res.success || !res.data) throw new Error(res.error || "Failed to fetch items");
      return res.data;
    },
    placeholderData: (prev) => prev,
  });
}

export function useItem(id: string) {
  return useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await api.get<CarItem>(endpoints.items.byId(id));
      if (!res.success || !res.data) throw new Error(res.error || "Item not found");
      return res.data;
    },
    enabled: !!id,
  });
}
