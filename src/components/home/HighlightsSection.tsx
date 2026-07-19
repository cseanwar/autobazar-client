"use client";

import Link from "next/link";
import { MapPin, Fuel, Gauge, ArrowRight, Loader2 } from "lucide-react";
import { useItems } from "@/hooks/useItems";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatMileage(mileage: number) {
  return `${mileage.toLocaleString()} mi`;
}

function fuelLabel(fuelType: string) {
  const labels: Record<string, string> = {
    gasoline: "Gasoline",
    diesel: "Diesel",
    electric: "Electric",
    hybrid: "Hybrid",
  };
  return labels[fuelType] || fuelType;
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="aspect-[4/3] bg-[var(--surface-secondary)] animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-[var(--surface-secondary)] animate-pulse" />
        <div className="flex gap-3">
          <div className="h-3 w-20 rounded bg-[var(--surface-secondary)] animate-pulse" />
          <div className="h-3 w-16 rounded bg-[var(--surface-secondary)] animate-pulse" />
          <div className="h-3 w-16 rounded bg-[var(--surface-secondary)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function HighlightsSection() {
  const { data, isLoading } = useItems({
    page: 1,
    limit: 4,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const items = data?.items || [];

  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
              Featured Listings
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Arrivals
            </h2>
          </div>
          <Link
            href="/listings"
            className="hidden items-center gap-1 text-sm font-medium text-[var(--accent)] transition-colors hover:underline sm:flex"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : items.length === 0 ? (
            <p className="col-span-full text-center text-sm text-[var(--muted)] py-12">
              No listings yet. Be the first to list your car.
            </p>
          ) : (
            items.map((car) => (
              <Link
                key={car._id}
                href={`/listings/${car._id}`}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--accent)]/30 hover:shadow-[var(--surface-shadow)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-secondary)]">
                  {car.images?.[0] && (
                    <img
                      src={car.images[0]}
                      alt={car.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-lg bg-[var(--accent)] px-3 py-1 text-sm font-bold text-[var(--accent-foreground)]">
                    {formatPrice(car.price)}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-[var(--accent)]">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" /> {car.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="size-3" /> {fuelLabel(car.fuelType)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="size-3" /> {formatMileage(car.mileage)}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View All Listings <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}