"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGenerateDescription } from "@/hooks/useAI";
import {
  Sparkles,
  Wand2,
  Loader2,
  ChevronDown,
  X,
  Check,
} from "lucide-react";

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "enthusiast", label: "Enthusiast" },
  { value: "luxury", label: "Luxury" },
];

const LENGTHS = [
  { value: "short", label: "Short (50-80 words)" },
  { value: "medium", label: "Medium (100-150 words)" },
  { value: "long", label: "Long (200-300 words)" },
];

const SUGGESTED_FEATURES = [
  "Leather Seats",
  "Sunroof",
  "Navigation",
  "Bluetooth",
  "Backup Camera",
  "Heated Seats",
  "Apple CarPlay",
  "Blind Spot Monitoring",
  "Lane Keep Assist",
  "Adaptive Cruise Control",
  "Premium Sound System",
  "All-Wheel Drive",
];

interface Props {
  make: string;
  model: string;
  year: string;
  condition: string;
  fuelType: string;
  transmission: string;
  mileage: string;
  color: string;
  onDescription: (short: string, full: string) => void;
  disabled?: boolean;
}

export default function AIDescriptionGenerator({
  make,
  model,
  year,
  condition,
  fuelType,
  transmission,
  mileage,
  color,
  onDescription,
  disabled,
}: Props) {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [features, setFeatures] = useState<string[]>([]);
  const [inserted, setInserted] = useState(false);

  const generate = useGenerateDescription();

  const canGenerate = make.trim() && model.trim() && year;

  async function handleGenerate() {
    if (!canGenerate) return;

    setInserted(false);
    const result = await generate.mutateAsync({
      make: make.trim(),
      model: model.trim(),
      year: Number(year),
      condition,
      fuelType,
      transmission,
      mileage: mileage ? Number(mileage) : undefined,
      color: color || undefined,
      features: features.length > 0 ? features : undefined,
      tone: tone as "professional" | "enthusiast" | "luxury",
      length: length as "short" | "medium" | "long",
    });

    const full = result;
    const short = full.split(/[.!?]/).slice(0, 2).join(". ") + ".";
    onDescription(short, full);
    setInserted(true);
  }

  function toggleFeature(f: string) {
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={disabled}
        className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-4 py-2 text-xs font-medium text-[var(--accent)] transition-all hover:bg-[var(--accent)]/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Sparkles className="size-3.5" />
        AI Description Generator
        <ChevronDown
          className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--surface)] p-5">
              <div className="flex items-center gap-2">
                <Wand2 className="size-4 text-[var(--accent)]" />
                <span className="text-sm font-semibold">
                  Generate Description
                </span>
              </div>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Enter at least Make, Model, and Year above, then customize
                below.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                    Tone
                  </span>
                  <div className="relative">
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    >
                      {TONES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-[var(--muted)]" />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                    Length
                  </span>
                  <div className="relative">
                    <select
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    >
                      {LENGTHS.map((l) => (
                        <option key={l.value} value={l.value}>
                          {l.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-[var(--muted)]" />
                  </div>
                </label>
              </div>

              <div className="mt-4">
                <span className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                  Key Features
                </span>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {SUGGESTED_FEATURES.map((f) => {
                    const active = features.includes(f);
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => toggleFeature(f)}
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium transition-all ${
                          active
                            ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                            : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/30"
                        }`}
                      >
                        {f}
                        {active && <X className="size-2.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!canGenerate || generate.isPending}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--accent-foreground)] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {generate.isPending ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-3.5" />
                      {inserted ? "Regenerate" : "Generate"}
                    </>
                  )}
                </button>

                {inserted && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400">
                    <Check className="size-3.5" />
                    Description inserted
                  </span>
                )}

                {!canGenerate && (
                  <span className="text-xs text-[var(--muted)]">
                    Fill in Make, Model, and Year first
                  </span>
                )}
              </div>

              {generate.isError && (
                <p className="mt-3 text-xs text-red-400">
                  {generate.error?.message || "Generation failed"}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
