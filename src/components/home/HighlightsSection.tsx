import Image from "next/image";
import Link from "next/link";
import { MapPin, Fuel, Gauge, ArrowRight } from "lucide-react";

const featured = [
  {
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80",
    title: "2024 Porsche 911 Carrera",
    price: "$129,900",
    location: "Los Angeles, CA",
    fuel: "Gasoline",
    mileage: "3,200 mi",
    href: "/listings/1",
  },
  {
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    title: "2023 Mercedes-Benz S-Class",
    price: "$94,500",
    location: "New York, NY",
    fuel: "Hybrid",
    mileage: "8,100 mi",
    href: "/listings/2",
  },
  {
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
    title: "2024 BMW M4 Competition",
    price: "$82,300",
    location: "Miami, FL",
    fuel: "Gasoline",
    mileage: "1,800 mi",
    href: "/listings/3",
  },
  {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    title: "2023 Audi RS e-tron GT",
    price: "$108,700",
    location: "San Francisco, CA",
    fuel: "Electric",
    mileage: "5,400 mi",
    href: "/listings/4",
  },
];

export default function HighlightsSection() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
              Featured Listings
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Top Picks This Week
            </h2>
          </div>
          <Link
            href="/listings"
            className="hidden items-center gap-1 text-sm font-medium text-[var(--accent)] transition-colors hover:underline sm:flex"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((car) => (
            <Link
              key={car.title}
              href={car.href}
              className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--accent)]/30 hover:shadow-[var(--surface-shadow)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-lg bg-[var(--accent)] px-3 py-1 text-sm font-bold text-[var(--accent-foreground)]">
                  {car.price}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-[var(--accent)]">
                  {car.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3" /> {car.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="size-3" /> {car.fuel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge className="size-3" /> {car.mileage}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View All Listings <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
