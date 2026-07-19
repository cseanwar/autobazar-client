import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Car Buyer",
    avatar: "SM",
    content:
      "Found my dream 911 through AutoBazaar. The verification process gave me peace of mind, and the seller was incredibly responsive. Couldn't be happier.",
    rating: 5,
  },
  {
    name: "James Crawford",
    role: "Car Seller",
    avatar: "JC",
    content:
      "Sold my BMW within 48 hours of listing. The platform is intuitive, the buyer was pre-qualified, and the whole process was seamless. Highly recommend.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Car Enthusiast",
    avatar: "ER",
    content:
      "I've bought and sold three cars on AutoBazaar. The market insights tool helped me price my cars perfectly every time. A game-changer for the industry.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
            Testimonials
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Community Says
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Real stories from real users who found success on AutoBazaar.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[var(--accent)] text-[var(--accent)]" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-sm font-semibold text-[var(--accent)]">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-[var(--muted)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
