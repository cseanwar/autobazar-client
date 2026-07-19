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
  { icon: Car, label: "Sedan", href: "/listings?bodyType=sedan" },
  { icon: Truck, label: "SUV", href: "/listings?bodyType=suv" },
  { icon: Gauge, label: "Sports", href: "/listings?bodyType=sports" },
  { icon: Zap, label: "Electric", href: "/listings?fuelType=electric" },
  { icon: Crown, label: "Luxury", href: "/listings?bodyType=luxury" },
  { icon: Mountain, label: "Off-Road", href: "/listings?bodyType=off-road" },
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
              href={cat.href}
              className="group flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center transition-all hover:border-[var(--accent)]/30 hover:shadow-[var(--surface-shadow)]"
            >
              <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-foreground)]">
                <cat.icon className="size-6" />
              </div>
              <h3 className="text-sm font-semibold">{cat.label}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
