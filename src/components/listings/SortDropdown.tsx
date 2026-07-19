"use client";

import { ArrowUpDown } from "lucide-react";

interface SortOption {
  label: string;
  sortBy: string;
  sortOrder: string;
}

const SORT_OPTIONS: SortOption[] = [
  { label: "Newest First", sortBy: "createdAt", sortOrder: "desc" },
  { label: "Oldest First", sortBy: "createdAt", sortOrder: "asc" },
  { label: "Price: Low to High", sortBy: "price", sortOrder: "asc" },
  { label: "Price: High to Low", sortBy: "price", sortOrder: "desc" },
  { label: "Year: Newest", sortBy: "year", sortOrder: "desc" },
  { label: "Year: Oldest", sortBy: "year", sortOrder: "asc" },
];

interface SortDropdownProps {
  sortBy: string;
  sortOrder: string;
  onChange: (sortBy: string, sortOrder: string) => void;
}

export default function SortDropdown({ sortBy, sortOrder, onChange }: SortDropdownProps) {
  return (
    <div className="relative">
      <select
        value={`${sortBy}|${sortOrder}`}
        onChange={(e) => {
          const [by, order] = e.target.value.split("|");
          onChange(by, order);
        }}
        className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--field-background)] px-4 py-2.5 pl-10 pr-8 text-sm outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.label} value={`${opt.sortBy}|${opt.sortOrder}`}>
            {opt.label}
          </option>
        ))}
      </select>
      <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
    </div>
  );
}
