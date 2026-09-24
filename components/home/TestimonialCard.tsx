"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { LiveTestimonial } from "@/lib/content/liveTestimonials";
import { driftUp, viewportOnce } from "@/lib/motion";
import { Tilt3D } from "@/components/ui/Tilt3D";

export function TestimonialCard({ testimonial, delay }: { testimonial: LiveTestimonial; delay: number }) {
  return (
    <motion.div
      variants={driftUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      className="flex w-[85%] shrink-0 snap-start flex-col gap-6 sm:w-[46%] lg:w-[30%]"
    >
      <Tilt3D>
        <div className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_30px_60px_-30px_rgba(20,17,16,0.5)]">
          {testimonial.image && (
            <Image src={testimonial.image} alt={testimonial.names} fill className="object-cover" sizes="(min-width: 1024px) 30vw, 80vw" />
          )}
        </div>
      </Tilt3D>
      <p className="font-serif text-xl italic leading-snug">&ldquo;{testimonial.quote}&rdquo;</p>
      <p className="eyebrow text-ink/45">
        {testimonial.names}
        {testimonial.location ? ` · ${testimonial.location}` : ""}
      </p>
    </motion.div>
  );
}
