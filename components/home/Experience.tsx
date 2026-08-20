"use client";

import { motion } from "motion/react";
import { driftUp, staggerFloat, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { number: "01", title: "Enquire", body: "Tell us your date and vision — we usually reply within a day." },
  { number: "02", title: "Meet", body: "A call to understand your story, in person or over video." },
  { number: "03", title: "Customize", body: "We build a proposal around exactly what your day needs." },
  { number: "04", title: "Celebrate", body: "You focus on the day. We stay quietly close, camera in hand." },
  { number: "05", title: "Capture", body: "Every ritual, every reaction — documented as it actually happened." },
  { number: "06", title: "Relive", body: "Galleries, films and albums delivered for you to return to for years." },
];

export function Experience() {
  return (
    <section className="px-6 py-28 md:px-12 md:py-40">
      <SectionHeading eyebrow="The Experience" title="From enquiry to album." align="center" className="mb-20" />

      <motion.div
        variants={staggerFloat(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-6xl gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {steps.map((step) => (
          <motion.div key={step.number} variants={driftUp}>
            <p className="font-serif text-5xl italic text-terracotta/70">{step.number}</p>
            <p className="mt-3 font-serif text-2xl italic">{step.title}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/60">{step.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
