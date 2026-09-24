"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { LiveService } from "@/lib/content/liveServices";
import { driftUp, viewportOnce } from "@/lib/motion";

export function ServiceFlipCard({ service, index }: { service: LiveService; index: number }) {
  return (
    <motion.div
      variants={driftUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: index * 0.08 }}
      className="flip3d h-[440px]"
    >
      <div className="flip3d-inner">
        <div className="flip3d-face rounded-md">
          {service.image && (
            <Image src={service.image} alt={service.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="scale-110 object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-black/0" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-parchment">
            <p className="eyebrow mb-2 text-terracotta-soft">{`0${index + 1}`}</p>
            <p className="font-serif text-3xl italic leading-tight">{service.name}</p>
          </div>
        </div>

        <div className="flip3d-face flip3d-back flex flex-col justify-between rounded-md bg-terracotta p-7 text-ink">
          <div>
            <p className="font-serif text-2xl italic leading-tight">{service.name}</p>
            {service.description && <p className="mt-4 text-sm leading-relaxed">{service.description}</p>}
          </div>
          <div>
            {service.priceVisible && service.startingPrice != null && (
              <>
                <p className="eyebrow mb-1">Starting from</p>
                <p className="font-serif text-3xl italic">₹{service.startingPrice.toLocaleString("en-IN")}</p>
              </>
            )}
            <Link href="/contact" className="eyebrow mt-4 inline-block border-b border-ink pb-1">
              Get your quote →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
