import { ShieldCheck, Zap, HeadphonesIcon, BarChart3 } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every car listing is manually reviewed to ensure accuracy and prevent fraud. Buy with confidence.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "List your car in minutes with our streamlined process. Get your vehicle in front of thousands instantly.",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description:
      "Our automotive experts are available 24/7 to answer questions and guide you through every step.",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description:
      "Access real-time pricing data and market trends to make informed buying and selling decisions.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
            Why AutoBazaar
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Built for Buyers &amp; Sellers
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Everything you need for a seamless automotive marketplace experience.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent)]/30 hover:shadow-[var(--surface-shadow)]"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                <feature.icon className="size-6" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
