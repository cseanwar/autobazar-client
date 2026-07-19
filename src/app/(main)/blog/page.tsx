"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {   Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "electric-vehicle-guide-2024",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
    category: "Electric Vehicles",
    title: "The Complete Guide to Electric Vehicles in 2024",
    excerpt:
      "From range anxiety to charging infrastructure, everything you need to know before buying your first EV.",
    author: "Sarah Mitchell",
    date: "Mar 15, 2024",
    readTime: "8 min read",
  },
  {
    slug: "luxury-car-maintenance-tips",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    category: "Maintenance",
    title: "10 Essential Maintenance Tips for Luxury Cars",
    excerpt:
      "Keep your high-end vehicle in pristine condition with these expert maintenance recommendations.",
    author: "Marcus Johnson",
    date: "Mar 12, 2024",
    readTime: "6 min read",
  },
  {
    slug: "market-trends-summer-2024",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
    category: "Market Insights",
    title: "Summer 2024 Automotive Market Trends",
    excerpt:
      "An in-depth analysis of pricing trends, inventory levels, and what buyers and sellers need to know.",
    author: "Alex Chen",
    date: "Mar 10, 2024",
    readTime: "10 min read",
  },
  {
    slug: "first-car-buying-tips",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
    category: "Buying Guide",
    title: "How to Buy Your First Car: A Step-by-Step Guide",
    excerpt:
      "Navigating your first car purchase? Follow our comprehensive guide to make a confident decision.",
    author: "Elena Rodriguez",
    date: "Mar 8, 2024",
    readTime: "7 min read",
  },
  {
    slug: "porsche-vs-ferrari-2024",
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&q=80",
    category: "Comparisons",
    title: "Porsche 911 vs Ferrari Roma: 2024 Comparison",
    excerpt:
      "Two automotive legends go head-to-head. We compare performance, comfort, and value.",
    author: "Marcus Johnson",
    date: "Mar 5, 2024",
    readTime: "12 min read",
  },
  {
    slug: "hybrid-vs-plug-in-hybrid",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    category: "Electric Vehicles",
    title: "Hybrid vs Plug-in Hybrid: Which Is Right for You?",
    excerpt:
      "Understand the differences between traditional hybrids and plug-in hybrids to make the best choice.",
    author: "Sarah Mitchell",
    date: "Mar 3, 2024",
    readTime: "5 min read",
  },
  {
    slug: "classic-car-investment",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80",
    category: "Investment",
    title: "Classic Cars as Investment: 2024 Market Analysis",
    excerpt:
      "Which classic models are appreciating fastest? Our annual investment guide for car enthusiasts.",
    author: "Alex Chen",
    date: "Feb 28, 2024",
    readTime: "9 min read",
  },
  {
    slug: "winter-car-preparation",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    category: "Maintenance",
    title: "Winter Car Preparation: Essential Checklist",
    excerpt:
      "Get your vehicle ready for cold weather with this comprehensive winter preparation guide.",
    author: "Elena Rodriguez",
    date: "Feb 25, 2024",
    readTime: "6 min read",
  },
];

const categories = [
  "All",
  "Buying Guide",
  "Electric Vehicles",
  "Maintenance",
  "Market Insights",
  "Comparisons",
  "Investment",
];

export default function BlogPage() {
  return (
    <div className="flex-1">
      {/* Header */}
      <section className="border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-block rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1 text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
              Insights & Stories
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              The AutoBazaar
              <br />
              <span className="text-[var(--accent)]">Journal</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
              Expert advice, market analysis, and stories from the world of
              automotive.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className="shrink-0 rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-medium transition-colors hover:border-[var(--accent)]/30 hover:text-[var(--accent)]"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all hover:border-[var(--accent)]/30 hover:shadow-[var(--surface-shadow)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-[var(--accent)]/90 px-3 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--accent-foreground)]">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold leading-snug group-hover:text-[var(--accent)]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* Newsletter */}
        <section className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-12 sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Stay in the Loop
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Get the latest automotive insights delivered to your inbox every
              week.
            </p>
            <div className="mt-6 flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              />
              <button
                type="button"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:opacity-90"
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
