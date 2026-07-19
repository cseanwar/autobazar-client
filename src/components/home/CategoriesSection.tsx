import Link from "next/link";
import {
  Car,
  Gauge,
  Mountain,
  Zap,
  Crown,
  Truck,
} from "lucide-react";

const categories = [
  { icon: Car, label: "Sedan", count: "2,341 cars" },
  { icon: Truck, label: "SUV", count: "1,892 cars" },
  { icon: Gauge, label: "Sports", count: "567 cars" },
  { icon: Zap, label: "Electric", count: "823 cars" },
  { icon: Crown, label: "Luxury", count: "456 cars" },
  { icon: Mountain, label: "Off-Road", count: "334 cars" },
];

export default function CategoriesSection() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
            Browse by Category
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Find Your Type
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Explore our wide selection of vehicles across every category.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={`/listings?category=${cat.label.toLowerCase()}`}
              className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-[var(--surface-shadow)]"
            >
              <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)]">
                <cat.icon className="size-6" />
              </div>
              <h3 className="text-sm font-semibold">{cat.label}</h3>
              <p className="mt-1 text-xs text-[var(--muted)]">{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
