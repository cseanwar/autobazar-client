"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section className="border-t border-[var(--border)] bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--accent)]/10 via-[var(--background)] to-[var(--accent)]/5 p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, var(--accent) 0%, transparent 60%)`,
            }}
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
              Stay Updated
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Get the Latest in Your Inbox
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              Weekly curated content — new listings, market trends, buying tips, and exclusive deals.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md gap-2">
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--field-background)] py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-opacity hover:opacity-90 cursor-pointer"
              >
                {submitted ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
                {submitted ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
