"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import AuthGuard from "@/components/AuthGuard";
import { useDeleteItem } from "@/hooks/useItemMutations";
import { api, endpoints } from "@/lib/api";
import type { CarItem, PaginatedResponse } from "@/types";
import {
  Plus,
  Trash2,
  Eye,
  Car,
  Fuel,
  Gauge,
  Calendar,
  MapPin,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Tag,
} from "lucide-react";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    available: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
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
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
        styles[status] || styles.available
      }`}
    >
      <Icon className="size-3" />
      {status}
    </span>
  );
}

function ConfirmDialog({
  open,
  title,
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-4 w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl"
      >
        <div className="flex size-12 items-center justify-center rounded-xl bg-red-500/10 mx-auto">
          <AlertTriangle className="size-6 text-red-400" />
        </div>
        <h3 className="mt-4 text-center font-display text-lg font-semibold">
          Delete Listing
        </h3>
        <p className="mt-2 text-center text-sm text-[var(--muted)]">
          Are you sure you want to delete &ldquo;{title}&rdquo;? This action
          cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--surface-hover)] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex animate-pulse items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="aspect-[4/3] w-28 shrink-0 rounded-xl bg-[var(--surface-secondary)]" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-[var(--surface-secondary)]" />
        <div className="h-3 w-1/3 rounded bg-[var(--surface-secondary)]" />
        <div className="flex gap-3">
          <div className="h-3 w-16 rounded bg-[var(--surface-secondary)]" />
          <div className="h-3 w-12 rounded bg-[var(--surface-secondary)]" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="size-9 rounded-xl bg-[var(--surface-secondary)]" />
        <div className="size-9 rounded-xl bg-[var(--surface-secondary)]" />
      </div>
    </div>
  );
}

export default function ManageListingsPage() {
  const [deleteTarget, setDeleteTarget] = useState<CarItem | null>(null);
  const deleteItem = useDeleteItem();

  const { data, isLoading } = useQuery({
    queryKey: ["my-items"],
    queryFn: async () => {
      const res = await api.get<PaginatedResponse<CarItem>>(endpoints.items.my);
      if (!res.success || !res.data) throw new Error(res.error || "Failed to fetch");
      return res.data;
    },
  });

  const items = data?.items || [];
  const total = data?.total || 0;

  async function handleConfirmDelete() {
    if (!deleteTarget?._id) return;
    try {
      await deleteItem.mutateAsync(deleteTarget._id);
      setDeleteTarget(null);
    } catch {
      // handled by mutation
    }
  }

  return (
    <AuthGuard>
      <div className="flex-1">
        <div className="border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                  <Car className="size-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    My Listings
                  </h1>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {total === 1
                      ? "1 listing"
                      : `${total} listings`}
                  </p>
                </div>
              </div>
              <Link
                href="/items/add"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:opacity-90"
              >
                <Plus className="size-4" />
                Add Listing
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
                <Car className="size-7 text-[var(--muted)]" />
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold">
                No Listings Yet
              </h2>
              <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
                You haven&apos;t listed any cars yet. Create your first listing
                and start selling today.
              </p>
              <Link
                href="/items/add"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:opacity-90"
              >
                <Plus className="size-4" />
                List Your First Car
              </Link>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent)]/20 hover:shadow-[var(--surface-shadow)]"
                >
                  <Link
                    href={`/listings/${item._id}`}
                    className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={item.images?.[0] || PLACEHOLDER_IMAGE}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="112px"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/listings/${item._id}`}
                          className="font-semibold transition-colors hover:text-[var(--accent)]"
                        >
                          {item.title}
                        </Link>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                          <span>${item.price.toLocaleString()}</span>
                          <span className="text-[var(--border)]">·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" /> {item.year}
                          </span>
                          <span className="text-[var(--border)]">·</span>
                          <span className="flex items-center gap-1">
                            <Fuel className="size-3" /> {item.fuelType}
                          </span>
                          <span className="text-[var(--border)]">·</span>
                          <span className="flex items-center gap-1">
                            <Gauge className="size-3" />{" "}
                            {item.mileage.toLocaleString()} mi
                          </span>
                        </div>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-[var(--muted)]">
                      <MapPin className="size-3" />
                      {item.location}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/listings/${item._id}`}
                      className="flex size-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--accent)]/30 hover:text-[var(--accent)]"
                      aria-label="View listing"
                    >
                      <Eye className="size-4" />
                    </Link>
                    {item._id && (
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="flex size-9 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                        aria-label="Delete listing"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <ConfirmDialog
          open={!!deleteTarget}
          title={deleteTarget?.title || ""}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteItem.isPending}
        />
      </div>
    </AuthGuard>
  );
}
