import Image from "next/image";
import Link from "next/link";
import { MapPin, Fuel, Gauge } from "lucide-react";
import type { CarItem } from "@/types";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80";

function fixImageUrl(url: string): string {
  return url.replace(/^hhttps:/, "https:");
}

export default function CarCard({ item }: { item: CarItem }) {
  const image = fixImageUrl(item.images?.[0] || PLACEHOLDER_IMAGE);

  return (
    <Link
      href={`/listings/${item._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--accent)]/30 hover:shadow-[var(--surface-shadow)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-lg bg-[var(--accent)] px-3 py-1 text-sm font-bold text-[var(--accent-foreground)]">
          ${item.price.toLocaleString()}
        </span>
        {item.condition === "new" && (
          <span className="absolute right-3 top-3 rounded-lg bg-emerald-500 px-2 py-0.5 text-xs font-medium text-white">
            New
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold leading-snug group-hover:text-[var(--accent)]">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
          {item.shortDescription}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-3 text-xs text-[var(--muted)]">
          <span className="flex items-center gap-1">
            <MapPin className="size-3" /> {item.location}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="size-3" /> {item.fuelType}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="size-3" /> {item.mileage.toLocaleString()} mi
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CarCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="aspect-[4/3] bg-[var(--surface-secondary)] animate-pulse" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="h-4 w-3/4 rounded bg-[var(--surface-secondary)] animate-pulse" />
        <div className="h-3 w-full rounded bg-[var(--surface-secondary)] animate-pulse" />
        <div className="mt-auto flex gap-3 pt-3">
          <div className="h-3 w-16 rounded bg-[var(--surface-secondary)] animate-pulse" />
          <div className="h-3 w-12 rounded bg-[var(--surface-secondary)] animate-pulse" />
          <div className="h-3 w-14 rounded bg-[var(--surface-secondary)] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
