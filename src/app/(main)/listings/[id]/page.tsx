"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Fuel,
  Gauge,
  Car,
  Palette,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Tag,
  CheckCircle2,
  Clock,
  Heart,
  Share2,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { useItem, useItems } from "@/hooks/useItems";
import type { CarItem } from "@/types";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80";

function DetailSkeleton() {
  return (
    <div className="flex-1">
      <div className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-4 w-24 animate-pulse rounded bg-[var(--surface-secondary)]" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div>
            <div className="aspect-[16/10] w-full animate-pulse rounded-2xl bg-[var(--surface-secondary)]" />
            <div className="mt-4 flex gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] w-24 animate-pulse rounded-lg bg-[var(--surface-secondary)]"
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-[var(--surface-secondary)]" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-[var(--surface-secondary)]" />
            <div className="h-4 w-full animate-pulse rounded bg-[var(--surface-secondary)]" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-[var(--surface-secondary)]" />
            <div className="grid grid-cols-2 gap-3 pt-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-xl bg-[var(--surface-secondary)]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const specIcons: Record<string, typeof Car> = {
  year: Calendar,
  fuelType: Fuel,
  mileage: Gauge,
  transmission: Car,
  condition: CheckCircle2,
  color: Palette,
};

function formatSpecLabel(key: string): string {
  const map: Record<string, string> = {
    year: "Year",
    fuelType: "Fuel Type",
    mileage: "Mileage",
    transmission: "Transmission",
    condition: "Condition",
    color: "Color",
  };
  return map[key] || key;
}

function formatSpecValue(key: string, value: string | number): string {
  if (key === "mileage") return `${Number(value).toLocaleString()} mi`;
  if (key === "price") return `$${Number(value).toLocaleString()}`;
  return String(value);
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    available:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",
    sold: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const icons: Record<string, typeof CheckCircle2> = {
    available: CheckCircle2,
    pending: Clock,
    sold: Tag,
  };

  const Icon = icons[status] || CheckCircle2;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize ${
        styles[status] || styles.available
      }`}
    >
      <Icon className="size-3.5" />
      {status}
    </span>
  );
}

export default function ListingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: item, isLoading, error } = useItem(id);
  const [selectedImage, setSelectedImage] = useState(0);

  const relatedQuery = useItems({
    make: item?.make,
    limit: 4,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const related = (relatedQuery.data?.items || []).filter(
    (r) => r._id !== id
  );

  if (isLoading) return <DetailSkeleton />;

  if (error || !item) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <Car className="mx-auto size-12 text-[var(--muted)]" />
          <h2 className="mt-4 font-display text-xl font-semibold">
            Car Not Found
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            The listing you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/listings"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:opacity-90"
          >
            <ArrowLeft className="size-4" />
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const images =
    item.images.length > 0
      ? item.images
      : [PLACEHOLDER_IMAGE];
  const currentImage = images[selectedImage] || images[0];

  const specs: [string, string | number][] = [
    ["year", item.year],
    ["fuelType", item.fuelType],
    ["mileage", item.mileage],
    ["transmission", item.transmission],
    ["condition", item.condition],
    ["color", item.color],
  ];

  return (
    <div className="flex-1">
      {/* --- Back bar --- */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="size-4" />
            Back to Listings
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <Heart className="size-3.5" />
              Save
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <Share2 className="size-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-[1fr_400px]"
        >
          {/* --- Left: Gallery --- */}
          <div>
            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-secondary)]">
              <Image
                src={currentImage}
                alt={item.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <StatusBadge status={item.status} />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage(
                        (selectedImage - 1 + images.length) % images.length
                      )
                    }
                    className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImage(
                        (selectedImage + 1) % images.length
                      )
                    }
                    className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === selectedImage
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      i === selectedImage
                        ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/30"
                        : "border-[var(--border)] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${item.title} thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- Right: Details --- */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {item.title}
                </h1>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {item.shortDescription}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-[var(--accent)]">
                ${item.price.toLocaleString()}
              </span>
              {item.condition === "new" && (
                <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  Brand New
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" /> {item.location}
              </span>
              <span className="text-[var(--border)]">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" /> Listed{" "}
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Specs Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {specs.map(([key, value]) => {
                const Icon = specIcons[key] || Tag;
                return (
                  <div
                    key={key}
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 transition-colors hover:border-[var(--accent)]/20"
                  >
                    <div className="flex items-center gap-2 text-[var(--muted)]">
                      <Icon className="size-3.5" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">
                        {formatSpecLabel(key)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold">
                      {formatSpecValue(key, value)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Description */}
            {item.fullDescription && (
              <div className="mt-8">
                <h2 className="font-display text-lg font-semibold">
                  Description
                </h2>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[var(--muted)]">
                  {item.fullDescription}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:opacity-90 cursor-pointer"
              >
                <MessageSquare className="size-4" />
                Contact Seller
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-surface-hover cursor-pointer"
              >
                <ShieldCheck className="size-4" />
                Request Inspection
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- Related Cars --- */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16 border-t border-[var(--border)] pt-12"
          >
            <div className="flex items-end justify-between">
              <div>
                <span className="mb-1 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
                  Related Listings
                </span>
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  More {item.make} Cars
                </h2>
              </div>
              <Link
                href={`/listings?make=${encodeURIComponent(item.make)}`}
                className="hidden items-center gap-1 text-sm font-medium text-[var(--accent)] transition-colors hover:underline sm:flex"
              >
                View All <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.slice(0, 4).map((car: CarItem, i: number) => (
                <motion.div
                  key={car._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={`/listings/${car._id}`}
                    className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--accent)]/30 hover:shadow-[var(--surface-shadow)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={car.images?.[0] || PLACEHOLDER_IMAGE}
                        alt={car.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-3 left-3 rounded-lg bg-[var(--accent)] px-3 py-1 text-sm font-bold text-[var(--accent-foreground)]">
                        ${car.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold group-hover:text-[var(--accent)]">
                        {car.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-3 text-xs text-[var(--muted)]">
                        <span className="flex items-center gap-1">
                          <Fuel className="size-3" /> {car.fuelType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Gauge className="size-3" />{" "}
                          {car.mileage.toLocaleString()} mi
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link
                href={`/listings?make=${encodeURIComponent(item.make)}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
              >
                View All {item.make} Cars <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
