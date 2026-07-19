"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { api, endpoints } from "@/lib/api";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Automotive Blvd\nLos Angeles, CA 90001",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@autobazaar.com",
    href: "mailto:hello@autobazaar.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri: 9 AM – 7 PM\nSat: 10 AM – 5 PM\nSun: Closed",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("All fields are required");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post(endpoints.contact.submit, form);
      if (!res.success) {
        setError(res.error || "Failed to send message");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

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
              Get in Touch
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              We&apos;d Love to Hear
              <br />
              <span className="text-[var(--accent)]">From You</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
              Have a question, feedback, or want to partner with us? Our team is
              ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-16 text-center">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <CheckCircle2 className="size-8 text-emerald-400" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold">
                  Message Sent!
                </h2>
                <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
                  Thank you for reaching out. We&apos;ll get back to you within
                  24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-6 rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--surface-hover)]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 flex text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                      Name
                    </span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 flex text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                      Email
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 flex text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                    Subject
                  </span>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 flex text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                    Message
                  </span>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us more about what's on your mind..."
                    className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm placeholder:text-[var(--muted)]/50 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </label>

                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent)]/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{info.label}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="mt-1 block text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="mt-1 whitespace-pre-line text-sm text-[var(--muted)]">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                  <MessageSquare className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Live Chat</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Chat with our team during business hours for instant support.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
