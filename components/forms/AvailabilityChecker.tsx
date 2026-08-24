"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { buildWhatsAppLink } from "@/lib/utils";
import { siteConfig } from "@/lib/content/siteConfig";

type Result = { date: string; status: string } | null;

const todayISO = new Date().toISOString().split("T")[0];

export function AvailabilityChecker() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    if (!date) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/availability?date=${date}`);
      const data = await res.json();
      setResult({ date, status: data.status ?? "unknown" });
    } catch {
      setResult({ date, status: "unknown" });
    } finally {
      setLoading(false);
    }
  }

  const isAvailable = result?.status === "available";
  const formattedDate = result
    ? new Date(result.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <div className="border border-ink/10 bg-white/50 p-6">
      <p className="eyebrow mb-1 text-terracotta">Check Availability</p>
      <p className="mb-5 text-sm text-ink/60">See if we&apos;re free on your date before you enquire.</p>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="date"
          min={todayISO}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-terracotta"
        />
        <button
          type="button"
          onClick={handleCheck}
          disabled={!date || loading}
          data-cursor-hover="true"
          className="rounded-full bg-ink px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black disabled:opacity-50"
        >
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.date + result.status}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <span
              className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.1em] ${
                isAvailable ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
              }`}
            >
              {isAvailable ? "Available" : "Not Available"}
            </span>
            <span className="text-sm text-ink/60">{formattedDate}</span>
            {!isAvailable && (
              <a
                href={buildWhatsAppLink(
                  `Hi! I was checking availability for ${formattedDate} — is there any flexibility, or could we discuss alternate dates?`,
                  siteConfig.whatsapp
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover="true"
                className="text-xs uppercase tracking-[0.15em] text-terracotta hover:text-ink"
              >
                Ask us anyway →
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
