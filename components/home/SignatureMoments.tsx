"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { brand, type BrandImageKey } from "@/lib/content/brandImages";
import { driftUp, useParallax, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const moments: { image: BrandImageKey; label: string; range: [number, number] }[] = [
  { image: "brideHaldi1", label: "Bride's Haldi", range: [60, -30] },
  { image: "halfSaree3", label: "Half Saree", range: [0, -60] },
  { image: "makeoverBrideCloseup", label: "Makeover", range: [80, -20] },
];

export function SignatureMoments() {
  return (
    <section className="bg-blush/40 px-6 py-28 md:px-12 md:py-40">
      <SectionHeading eyebrow="Signature Moments" title="The details in between." align="center" className="mb-20" />

      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        {moments.map((m) => (
          <MomentCard key={m.label} {...m} />
        ))}
      </div>
    </section>
  );
}

function MomentCard({
  image,
  label,
  range,
}: {
  image: BrandImageKey;
  label: string;
  range: [number, number];
}) {
  const { nodeRef, y } = useParallax(range);

  return (
    <motion.div
      ref={nodeRef as React.RefObject<HTMLDivElement>}
      style={{ y }}
      variants={driftUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image src={brand[image]} alt={label} fill className="object-cover" sizes="(min-width: 640px) 30vw, 90vw" />
      </div>
      <p className="mt-4 text-center font-serif text-xl italic">{label}</p>
    </motion.div>
  );
}
