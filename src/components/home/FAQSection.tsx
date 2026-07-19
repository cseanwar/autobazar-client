"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I list a car for sale?",
    a: "Simply create an account, click 'Sell' in the navigation, fill out the listing form with your car's details and photos, and submit. Your listing will be reviewed and published within 24 hours.",
  },
  {
    q: "Is there a fee for listing cars?",
    a: "Basic listings are free. We offer premium featured listings for enhanced visibility starting at $29.99 per listing. Premium listings appear at the top of search results and get a featured badge.",
  },
  {
    q: "How do I know a listing is verified?",
    a: "Verified listings undergo a manual review process including photo authenticity checks and seller verification. Look for the verified badge on listings and seller profiles for added confidence.",
  },
  {
    q: "What payment methods are accepted?",
    a: "AutoBazaar facilitates secure connections between buyers and sellers but does not process vehicle payments directly. We recommend using secure escrow services for high-value transactions.",
  },
  {
    q: "Can I cancel or edit my listing?",
    a: "Yes, you can edit or remove your listing at any time from your dashboard. Premium listing fees are non-refundable, but you can modify the listing details freely.",
  },
  {
    q: "How does the vehicle inspection work?",
    a: "We partner with certified inspection services across the country. Sellers can schedule an inspection to add a verified condition report to their listing, increasing buyer confidence.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)] py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="mb-2 inline-block text-xs font-medium tracking-widest uppercase text-[var(--accent)]">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Everything you need to know about buying and selling on AutoBazaar.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-[var(--surface-hover)]"
              >
                <span className="pr-4 text-sm font-medium">{faq.q}</span>
                <ChevronDown
                  className={`size-4 shrink-0 text-[var(--muted)] transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="border-t border-[var(--border)] px-5 py-4">
                  <p className="text-sm leading-relaxed text-[var(--muted)]">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
