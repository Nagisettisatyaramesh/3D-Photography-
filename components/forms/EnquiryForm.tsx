"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { services } from "@/lib/content/services";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { cn } from "@/lib/utils";

const eventTypes = [
  "Wedding",
  "Pre-Wedding",
  "Engagement",
  "Reception",
  "Destination Wedding",
  "Other",
];

const MOBILE_REGEX = /^[+]?[\d\s-]{10,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  fullName: string;
  mobile: string;
  email: string;
  eventType: string;
  eventDate: string;
  location: string;
  numberOfEvents: string;
  servicesInterested: string[];
  message: string;
};

const initialState: FormState = {
  fullName: "",
  mobile: "",
  email: "",
  eventType: "",
  eventDate: "",
  location: "",
  numberOfEvents: "",
  servicesInterested: [],
  message: "",
};

const todayISO = new Date().toISOString().split("T")[0];

export function EnquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleService(service: string) {
    setForm((prev) => ({
      ...prev,
      servicesInterested: prev.servicesInterested.includes(service)
        ? prev.servicesInterested.filter((s) => s !== service)
        : [...prev.servicesInterested, service],
    }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!MOBILE_REGEX.test(form.mobile)) next.mobile = "Enter a valid mobile number.";
    if (!EMAIL_REGEX.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.eventType) next.eventType = "Please select an event type.";
    if (!form.eventDate) {
      next.eventDate = "Please select your event date.";
    } else if (form.eventDate < todayISO) {
      next.eventDate = "Event date can't be in the past.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setServerError("Couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center py-16 text-center"
      >
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-terracotta text-terracotta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <p className="font-serif text-3xl italic">Thank you.</p>
        <p className="mt-4 max-w-xs text-ink/70">
          We&apos;ve received your enquiry and will be in touch within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 border-b border-current pb-0.5 text-xs uppercase tracking-[0.18em] text-terracotta hover:text-ink"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name *" error={errors.fullName}>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className={inputClass(!!errors.fullName)}
          />
        </Field>

        <Field label="Mobile Number *" error={errors.mobile}>
          <input
            type="tel"
            value={form.mobile}
            onChange={(e) => update("mobile", e.target.value)}
            placeholder="+91 98765 43210"
            className={inputClass(!!errors.mobile)}
          />
        </Field>

        <Field label="Email *" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label="Event Type *" error={errors.eventType}>
          <select
            value={form.eventType}
            onChange={(e) => update("eventType", e.target.value)}
            className={inputClass(!!errors.eventType)}
          >
            <option value="">Select</option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Event Date *" error={errors.eventDate}>
          <input
            type="date"
            min={todayISO}
            value={form.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
            className={inputClass(!!errors.eventDate)}
          />
        </Field>

        <Field label="Location">
          <input
            type="text"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className={inputClass(false)}
          />
        </Field>

        <Field label="Number of Events">
          <input
            type="number"
            min={1}
            value={form.numberOfEvents}
            onChange={(e) => update("numberOfEvents", e.target.value)}
            className={inputClass(false)}
          />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.15em] text-ink/50">Services Interested In</p>
        <div className="flex flex-wrap gap-2.5">
          {services.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => toggleService(s.name)}
              data-cursor-hover="true"
              className={cn(
                "rounded-full px-4 py-2 text-xs uppercase tracking-[0.1em] transition-all duration-300",
                form.servicesInterested.includes(s.name)
                  ? "bg-ink text-parchment"
                  : "border border-ink/15 bg-white/40 text-ink/60 hover:border-terracotta hover:text-terracotta"
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <Field label="Message">
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass(false)}
        />
      </Field>

      <AnimatePresence>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-l-2 border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
        <p className="text-xs text-ink/45">We typically reply within a day.</p>
        <FloatingButton type="submit" variant="ink" disabled={status === "submitting"} className="w-fit">
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
        </FloatingButton>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full border bg-white/50 px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-ink/35 focus:bg-white",
    hasError ? "border-red-400 focus:border-red-500" : "border-ink/12 focus:border-terracotta"
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.15em] text-ink/50">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
