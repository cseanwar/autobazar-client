"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AuthGuard from "@/components/AuthGuard";
import { useCreateItem } from "@/hooks/useItemMutations";
import AIDescriptionGenerator from "@/components/ai/AIDescriptionGenerator";
import type { CarItem } from "@/types";
import {
  Car,
  Plus,
  X,
  Image as ImageIcon,
  Fuel,
  Gauge,
  Calendar,
  Palette,
  MapPin,
  FileText,
  Tag,
  DollarSign,
  Settings2,
  ChevronDown,
  Sparkles,
  Shuffle,
} from "lucide-react";

const FUEL_OPTIONS = [
  { value: "gasoline", label: "Gasoline" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
];

const TRANS_OPTIONS = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automatic" },
];

const CONDITION_OPTIONS = [
  { value: "used", label: "Used" },
  { value: "new", label: "New" },
];

const COMMON_MAKES = [
  "BMW", "Mercedes-Benz", "Audi", "Porsche", "Tesla",
  "Toyota", "Honda", "Ford", "Chevrolet", "Volkswagen",
  "Volvo", "Lexus", "Jaguar", "Land Rover", "Ferrari",
  "Lamborghini", "McLaren", "Bentley", "Rolls-Royce", "Maserati",
];

interface FormData {
  title: string;
  make: string;
  model: string;
  year: string;
  price: string;
  condition: string;
  fuelType: string;
  transmission: string;
  mileage: string;
  color: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
}

const emptyForm: FormData = {
  title: "",
  make: "",
  model: "",
  year: "",
  price: "",
  condition: "used",
  fuelType: "gasoline",
  transmission: "automatic",
  mileage: "",
  color: "",
  location: "",
  shortDescription: "",
  fullDescription: "",
  images: [""],
};

type FieldError = string | null;

function validateForm(data: FormData): Record<string, FieldError> {
  const errors: Record<string, FieldError> = {};
  if (!data.title.trim()) errors.title = "Title is required";
  if (!data.make.trim()) errors.make = "Make is required";
  if (!data.model.trim()) errors.model = "Model is required";
  if (!data.year || Number(data.year) < 1900 || Number(data.year) > 2030)
    errors.year = "Enter a valid year (1900–2030)";
  if (!data.price || Number(data.price) <= 0)
    errors.price = "Enter a valid price";
  if (!data.mileage || Number(data.mileage) < 0)
    errors.mileage = "Enter a valid mileage";
  if (!data.location.trim()) errors.location = "Location is required";
  if (!data.shortDescription.trim())
    errors.shortDescription = "Short description is required";
  return errors;
}

function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        <Icon className="size-3.5" />
        {label}
      </span>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </label>
  );
}

export default function AddListingPage() {
  const router = useRouter();
  const createItem = useCreateItem();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, FieldError>>({});
  const [showMakes, setShowMakes] = useState(false);

  const update = useCallback(
    (key: keyof FormData, value: string | string[]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: null }));
    },
    [],
  );

  const handleImageChange = useCallback(
    (index: number, value: string) => {
      const next = [...form.images];
      next[index] = value;
      if (index === next.length - 1 && value.trim()) {
        next.push("");
      }
      update("images", next);
    },
    [form.images, update],
  );

  const removeImage = useCallback(
    (index: number) => {
      const next = form.images.filter((_, i) => i !== index);
      update("images", next.length === 0 ? [""] : next);
    },
    [form.images, update],
  );

  const handleAIDescription = useCallback(
    (short: string, full: string) => {
      setForm((prev) => ({
        ...prev,
        shortDescription: short,
        fullDescription: full,
      }));
    },
    [],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateForm(form);
    setErrors(validation);
    if (Object.values(validation).some(Boolean)) return;

    const payload: Partial<CarItem> = {
      title: form.title.trim(),
      make: form.make.trim(),
      model: form.model.trim(),
      year: Number(form.year),
      price: Number(form.price),
      condition: form.condition as CarItem["condition"],
      fuelType: form.fuelType as CarItem["fuelType"],
      transmission: form.transmission as CarItem["transmission"],
      mileage: Number(form.mileage),
      color: form.color.trim(),
      location: form.location.trim(),
      shortDescription: form.shortDescription.trim(),
      fullDescription: form.fullDescription.trim(),
      images: form.images.filter((u) => u.trim()),
    };

    try {
      await createItem.mutateAsync(payload);
      router.push("/listings");
    } catch {
      // handled by mutation
    }
  }

  return (
    <AuthGuard>
      <div className="flex-1">
        {/* Header */}
        <div className="border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--accent)]/10">
                <Plus className="size-5 text-[var(--accent)]" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  List Your Car
                </h1>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Fill in the details below to create your listing
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-10"
          >
            {/* Basic Info */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">
                  <Car className="size-3.5" />
                  Basic Information
                </span>
                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>
              <div className="space-y-5">
                <Field label="Title" icon={Tag} error={errors.title}>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="e.g. 2024 Porsche 911 Carrera"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="relative">
                    <Field label="Make" icon={Car} error={errors.make}>
                      <input
                        type="text"
                        value={form.make}
                        onChange={(e) => {
                          update("make", e.target.value);
                          setShowMakes(true);
                        }}
                        onFocus={() => setShowMakes(true)}
                        onBlur={() =>
                          setTimeout(() => setShowMakes(false), 200)
                        }
                        placeholder="e.g. Porsche"
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                      />
                    </Field>
                    {showMakes && (
                      <div className="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1 shadow-lg">
                        {COMMON_MAKES.filter((m) =>
                          m.toLowerCase().includes(form.make.toLowerCase()),
                        ).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onMouseDown={() => {
                              update("make", m);
                              setShowMakes(false);
                            }}
                            className="w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors hover:bg-[var(--surface-hover)]"
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Field label="Model" icon={Settings2} error={errors.model}>
                    <input
                      type="text"
                      value={form.model}
                      onChange={(e) => update("model", e.target.value)}
                      placeholder="e.g. 911 Carrera"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Year" icon={Calendar} error={errors.year}>
                    <input
                      type="number"
                      value={form.year}
                      onChange={(e) => update("year", e.target.value)}
                      placeholder="2024"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </Field>
                  <Field label="Price ($)" icon={DollarSign} error={errors.price}>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => update("price", e.target.value)}
                      placeholder="129900"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </Field>
                  <Field label="Condition" icon={Shuffle}>
                    <div className="relative">
                      <select
                        value={form.condition}
                        onChange={(e) => update("condition", e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 pr-10 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                      >
                        {CONDITION_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                    </div>
                  </Field>
                </div>
              </div>
            </section>

            {/* Specs */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">
                  <Settings2 className="size-3.5" />
                  Specifications
                </span>
                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Fuel Type" icon={Fuel}>
                  <div className="relative">
                    <select
                      value={form.fuelType}
                      onChange={(e) => update("fuelType", e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 pr-10 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    >
                      {FUEL_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                  </div>
                </Field>
                <Field label="Transmission" icon={Settings2}>
                  <div className="relative">
                    <select
                      value={form.transmission}
                      onChange={(e) => update("transmission", e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 pr-10 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    >
                      {TRANS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                  </div>
                </Field>
                <Field label="Mileage (mi)" icon={Gauge} error={errors.mileage}>
                  <input
                    type="number"
                    value={form.mileage}
                    onChange={(e) => update("mileage", e.target.value)}
                    placeholder="3200"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </Field>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Color" icon={Palette}>
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => update("color", e.target.value)}
                    placeholder="e.g. Guards Red"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </Field>
                <Field label="Location" icon={MapPin} error={errors.location}>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="e.g. Los Angeles, CA"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </Field>
              </div>
            </section>

            {/* Description */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">
                  <FileText className="size-3.5" />
                  Description
                </span>
                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>
              <div className="space-y-5">
                <Field
                  label="Short Summary"
                  icon={FileText}
                  error={errors.shortDescription}
                >
                  <input
                    type="text"
                    value={form.shortDescription}
                    onChange={(e) => update("shortDescription", e.target.value)}
                    placeholder="Brief overview for listing cards"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </Field>
                <div className="pb-2">
                  <AIDescriptionGenerator
                    make={form.make}
                    model={form.model}
                    year={form.year}
                    condition={form.condition}
                    fuelType={form.fuelType}
                    transmission={form.transmission}
                    mileage={form.mileage}
                    color={form.color}
                    onDescription={handleAIDescription}
                  />
                </div>
                <Field label="Full Description" icon={FileText}>
                  <textarea
                    rows={5}
                    value={form.fullDescription}
                    onChange={(e) => update("fullDescription", e.target.value)}
                    placeholder="Describe the car in detail — features, history, condition..."
                    className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </Field>
              </div>
            </section>

            {/* Images */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">
                  <ImageIcon className="size-3.5" />
                  Images
                </span>
                <div className="h-px flex-1 bg-[var(--border)]" />
              </div>
              <div className="space-y-3">
                {form.images.map((url, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageChange(i, e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                    {form.images.length > 1 && i !== form.images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                        aria-label="Remove image"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                ))}
                <p className="text-xs text-[var(--muted)]">
                  Paste image URLs. Add at least one image to showcase your car.
                </p>
              </div>
            </section>

            {/* Submit */}
            <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createItem.isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {createItem.isPending ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Publishing…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Publish Listing
                  </>
                )}
              </button>
            </div>

            {createItem.isError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {createItem.error?.message || "Something went wrong. Please try again."}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </AuthGuard>
  );
}
