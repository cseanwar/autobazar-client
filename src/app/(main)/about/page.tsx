"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Users,
  ShieldCheck,
  ArrowRight,
  Quote,
  Target,
  Heart,
} from "lucide-react";

const stats = [
  { value: "10K+", label: "Cars Listed" },
  { value: "5K+", label: "Happy Customers" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "50+", label: "Cities Covered" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "Every listing is verified. What you see is exactly what you get — no hidden surprises.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We built a marketplace where buyers and sellers connect directly with confidence.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description:
      "Our smart algorithms connect you with the perfect car based on your preferences.",
  },
  {
    icon: Heart,
    title: "Passion for Cars",
    description:
      "We're enthusiasts ourselves. Every feature is designed with automotive passion.",
  },
];

const team = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    bio: "Former automotive engineer with 15 years in the industry.",
  },
  {
    name: "Sarah Mitchell",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    bio: "Built scalable platforms for Fortune 500 companies.",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    bio: "15 years in automotive sales and dealership management.",
  },
  {
    name: "Elena Rodriguez",
    role: "Design Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    bio: "Award-winning designer with a passion for automotive aesthetics.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--background)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, var(--accent) 0%, transparent 50%), radial-gradient(circle at 70% 60%, var(--accent) 0%, transparent 50%)`,
          }}
        />
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1 text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
              Our Story
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Redefining How the
              <br />
              <span className="text-[var(--accent)]">World Buys Cars</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              AutoBazaar was born from a simple belief: buying and selling cars
              should be transparent, enjoyable, and trustworthy. We&apos;re
              building the future of automotive commerce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <p className="font-display text-3xl font-bold text-[var(--accent)] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
                Our Journey
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                From a Garage to a
                <br />
                Global Marketplace
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
                <p>
                  AutoBazaar started in 2020 when our founder Alex Chen realized
                  how broken the traditional car buying experience was. After
                  spending months helping friends find the right cars, he saw an
                  opportunity to build something better.
                </p>
                <p>
                  What began as a small community of car enthusiasts quickly grew
                  into a trusted platform connecting thousands of buyers and
                  sellers across the country. We&apos;ve maintained our
                  community-driven ethos while building enterprise-grade
                  technology.
                </p>
                <p>
                  Today, AutoBazaar serves over 50 cities with more than 10,000
                  listings and a 99% customer satisfaction rate. But we&apos;re
                  just getting started.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=800&q=80"
                  alt="AutoBazaar team at work"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
                <Quote className="size-8 text-[var(--accent)]" />
                <p className="mt-2 max-w-xs text-sm italic text-[var(--muted)]">
                  &ldquo;We&apos;re not just building a marketplace — we&apos;re
                  building trust in automotive commerce.&rdquo;
                </p>
                <p className="mt-2 text-xs font-medium">Alex Chen, Founder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
              What We Believe
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              Every decision we make is guided by these principles.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 transition-all hover:border-[var(--accent)]/30 hover:shadow-[var(--surface-shadow)]"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
              Leadership
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Meet the Team
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              The people behind AutoBazaar, driven by a passion for cars and
              technology.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className="mx-auto size-28 overflow-hidden rounded-full border-2 border-[var(--border)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {member.name}
                </h3>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Award className="mx-auto size-12 text-[var(--accent)]" />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Find Your Perfect Car?
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              Join thousands of satisfied customers. Start your journey today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:opacity-90"
              >
                Browse Cars
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/items/add"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--surface-hover)]"
              >
                Sell Your Car
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
