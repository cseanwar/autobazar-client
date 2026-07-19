"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const MAKES = [
  "BMW", "Mercedes-Benz", "Audi", "Porsche", "Toyota",
  "Honda", "Ford", "Chevrolet", "Tesla", "Lexus",
];

const FUEL_TYPES = ["gasoline", "diesel", "electric", "hybrid"];

const CONDITIONS = ["new", "used"];

interface Filters {
  make: string;
  minPrice: string;
  maxPrice: string;
  fuelType: string;
  condition: string;
  minYear: string;
  maxYear: string;
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const defaultFilters: Filters = {
  make: "",
  minPrice: "",
  maxPrice: "",
  fuelType: "",
  condition: "",
  minYear: "",
  maxYear: "",
};

export { defaultFilters };
export type { Filters };

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const [open, setOpen] = useState(false);

  function update(key: keyof Filters, value: string) {
    onChange({ ...filters, [key]: value });
  }

  function clearAll() {
    onChange(defaultFilters);
  }

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const content = (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
          Make
        </label>
        <select
          value={filters.make}
          onChange={(e) => update("make", e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--field-background)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">All Makes</option>
          {MAKES.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
            Min Price
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
            placeholder="$0"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--field-background)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
            Max Price
          </label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            placeholder="$999,999"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--field-background)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
            Min Year
          </label>
          <input
            type="number"
            value={filters.minYear}
            onChange={(e) => update("minYear", e.target.value)}
            placeholder="2020"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--field-background)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
            Max Year
          </label>
          <input
            type="number"
            value={filters.maxYear}
            onChange={(e) => update("maxYear", e.target.value)}
            placeholder="2025"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--field-background)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
          Fuel Type
        </label>
        <select
          value={filters.fuelType}
          onChange={(e) => update("fuelType", e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--field-background)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">All Fuel Types</option>
          {FUEL_TYPES.map((f) => (
            <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[var(--muted)]">
          Condition
        </label>
        <select
          value={filters.condition}
          onChange={(e) => update("condition", e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--field-background)] px-3 py-2.5 text-sm outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">All Conditions</option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full rounded-xl border border-[var(--border)] py-2 text-xs font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)]"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden lg:block">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="mb-4 text-sm font-semibold">Filters</h3>
          {content}
        </div>
      </div>

      <div className="lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 text-sm font-medium transition-colors hover:bg-[var(--surface-hover)]"
        >
          <SlidersHorizontal className="size-4" />
          Filters {hasActiveFilters ? "(Active)" : ""}
        </button>
        {open && (
          <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Filters</h3>
              <button onClick={() => setOpen(false)}>
                <X className="size-4 text-[var(--muted)]" />
              </button>
            </div>
            {content}
          </div>
        )}
      </div>
    </>
  );
}
