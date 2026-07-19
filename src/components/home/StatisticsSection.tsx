"use client";

import { useRef, useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Cars Listed", value: "24,500+" },
  { label: "Happy Customers", value: "18,200+" },
  { label: "Verified Sellers", value: "3,800+" },
  { label: "Cities Covered", value: "250+" },
];

const chartData = [
  { month: "Jan", cars: 1800 },
  { month: "Feb", cars: 2100 },
  { month: "Mar", cars: 2400 },
  { month: "Apr", cars: 1900 },
  { month: "May", cars: 2800 },
  { month: "Jun", cars: 3200 },
  { month: "Jul", cars: 2900 },
  { month: "Aug", cars: 3500 },
];

export default function StatisticsSection() {
  const [mounted] = useState(typeof window !== "undefined");
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="border-t border-[var(--border)] bg-[var(--background)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
              Our Numbers
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              AutoBazaar by the Numbers
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              Our growing community and marketplace statistics speak for themselves.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <p className="font-display text-2xl font-bold text-[var(--accent)] sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {mounted && (
              <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <h3 className="mb-6 text-sm font-semibold">
                  Monthly Listings Growth
                </h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "var(--muted)" }}
                    />
                    <Bar
                      dataKey="cars"
                      radius={[4, 4, 0, 0]}
                      fill="var(--accent)"
                      opacity={0.8}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
