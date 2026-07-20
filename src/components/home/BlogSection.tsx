import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
    title: "The Complete Guide to Buying a Used Car in 2025",
    excerpt:
      "Everything you need to know before making your next used car purchase — from inspection checklists to negotiating tips.",
    date: "Jan 15, 2025",
    slug: "used-car-buying-guide-2025",
  },
  {
    image: "https://media.istockphoto.com/id/1693201783/sv/foto/human-hands-holding-electric-plug-and-gasoline-nozzle.jpg?s=612x612&w=0&k=20&c=I86s5yLuY6H74FTQjwWlHdt1UIW-k2pHHYqr2rX2OPw=",
    title: "Electric vs. Hybrid: Which Powertrain Is Right for You?",
    excerpt:
      "A detailed comparison of electric and hybrid vehicles to help you choose the perfect powertrain for your lifestyle.",
    date: "Jan 8, 2025",
    slug: "electric-vs-hybrid-guide",
  },
  {
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
    title: "Top 10 Sports Cars Under $100,000 in 2025",
    excerpt:
      "Our experts rank the best performance vehicles that deliver thrills without breaking the bank.",
    date: "Dec 28, 2024",
    slug: "top-sports-cars-2025",
  },
];

export default function BlogSection() {
  return (
    <section className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
              From the Blog
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden items-center gap-1 text-sm font-medium text-[var(--accent)] transition-colors hover:underline sm:flex"
          >
            All Posts <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--accent)]/30 hover:shadow-[var(--surface-shadow)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                  <Calendar className="size-3" />
                  {post.date}
                </div>
                <h3 className="mt-2 font-semibold leading-snug group-hover:text-[var(--accent)]">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            All Posts <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
