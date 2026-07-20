"use client";

import { Suspense, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useItems } from "@/hooks/useItems";
import CarGrid from "@/components/listings/CarGrid";
import SearchBar from "@/components/listings/SearchBar";
import FilterPanel, { type Filters, defaultFilters } from "@/components/listings/FilterPanel";
import SortDropdown from "@/components/listings/SortDropdown";
import Pagination from "@/components/listings/Pagination";
import { CarFront, Loader2 } from "lucide-react";

const BODY_TYPE_LABELS: Record<string, string> = {
  sedan: "Sedan",
  suv: "SUV",
  sports: "Sports",
  electric: "Electric",
  luxury: "Luxury",
  "off-road": "Off-Road",
  truck: "Truck",
};

function ListingsContent() {
  const searchParams = useSearchParams();
  const urlBodyType = searchParams.get("bodyType") || undefined;
  const urlFuelType = searchParams.get("fuelType") || undefined;

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const categoryLabel = urlBodyType
    ? BODY_TYPE_LABELS[urlBodyType]
    : urlFuelType === "electric"
      ? "Electric"
      : undefined;

  const { data, isLoading } = useItems({
    page,
    limit: 12,
    search: search || undefined,
    make: filters.make || undefined,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    fuelType: urlFuelType || filters.fuelType || undefined,
    condition: filters.condition || undefined,
    bodyType: urlBodyType,
    sortBy,
    sortOrder,
  });

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const items = data?.items || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className="flex-1">
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <CarFront className="size-6 text-[var(--accent)]" />
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {categoryLabel ? `${categoryLabel} Cars` : "Browse Cars"}
            </h1>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {data ? `${data.total} cars found` : "Search our inventory"}
            {categoryLabel && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-0.5 text-xs text-[var(--accent)]">
                {categoryLabel}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
          <aside className="w-full shrink-0 lg:w-64">
            <FilterPanel filters={filters} onChange={handleFiltersChange} />
          </aside>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <SearchBar value={search} onChange={handleSearchChange} />
              </div>
              <div className="w-full sm:w-48">
                <SortDropdown
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onChange={(by, order) => {
                    setSortBy(by);
                    setSortOrder(order);
                  }}
                />
              </div>
            </div>

            <div className="mt-6">
              <CarGrid items={items} isLoading={isLoading} />
            </div>

            <div className="mt-8">
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-1 items-center justify-center py-32">
        <Loader2 className="size-8 animate-spin text-[var(--accent)]" />
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}