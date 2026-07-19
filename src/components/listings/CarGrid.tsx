import CarCard, { CarCardSkeleton } from "./CarCard";
import type { CarItem } from "@/types";

interface CarGridProps {
  items: CarItem[];
  isLoading: boolean;
}

export default function CarGrid({ items, isLoading }: CarGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-4xl">🔍</div>
        <h3 className="text-lg font-semibold">No cars found</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <CarCard key={item._id} item={item} />
      ))}
    </div>
  );
}
