"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    tagline: "Premium Automotive Marketplace",
    headline: "Find Your\nPerfect Drive",
    description:
      "Browse thousands of verified new and used cars from trusted sellers. Your next journey starts here.",
    cta: { label: "Browse Cars", href: "/listings" },
    secondary: { label: "Sell Your Car", href: "/items/add" },
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80",
  },
  {
    tagline: "Sell With Confidence",
    headline: "List Your Car\nin Minutes",
    description:
      "Reach thousands of serious buyers. Easy listing process, secure transactions, and dedicated support.",
    cta: { label: "Start Selling", href: "/items/add" },
    secondary: { label: "Learn More", href: "/about" },
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
  },
  {
    tagline: "Trusted by Thousands",
    headline: "Real Reviews.\nReal Results.",
    description:
      "Join a community of happy buyers and sellers. Transparent ratings, verified listings, fair deals.",
    cta: { label: "See Reviews", href: "/listings" },
    secondary: { label: "Our Story", href: "/about" },
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section className="relative flex min-h-[80dvh] items-center overflow-hidden bg-[var(--surface)]">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            i === current
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={s.image}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-[var(--surface)]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-4 py-20 sm:px-6 lg:px-8">
        <span className="mb-4 inline-block rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/15 px-4 py-1 text-xs font-medium tracking-widest uppercase text-[var(--accent)] backdrop-blur-sm">
          {slide.tagline}
        </span>

        <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
          {slide.headline.split("\n").map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg drop-shadow-md">
          {slide.description}
        </p>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
          <Link
            href={slide.cta.href}
            className="group inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:opacity-90"
          >
            {slide.cta.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={slide.secondary.href}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {slide.secondary.label}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        <button
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-8 bg-[var(--accent)]"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo((current + 1) % slides.length)}
          className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/70 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
