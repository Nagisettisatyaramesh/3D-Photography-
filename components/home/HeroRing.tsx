"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { brand } from "@/lib/content/brandImages";

const panels = [
  { src: brand.heroRing1, alt: "Couple in a close embrace" },
  { src: brand.heroRing2, alt: "Couple smiling together in festive outfits" },
  { src: brand.heroRing3, alt: "Couple laughing over cups of tea" },
  { src: brand.heroRing4, alt: "Couple in traditional silk attire" },
  { src: brand.heroRing5, alt: "Couple seated on a decorated stage" },
  { src: brand.heroRing6, alt: "Couple in a studio portrait" },
  { src: brand.heroRing7, alt: "Bride seated during a ceremony" },
  { src: brand.heroRing8, alt: "Smiling bride in traditional jewellery" },
];

/** Photos arranged on a slowly turning 3D cylinder; the whole scene tilts
 * toward the cursor. Purely decorative — pauses on hover, static under
 * reduced motion. */
export function HeroRing() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotY = useSpring(px, { stiffness: 60, damping: 20 });
  const rotX = useSpring(py, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function move(e: PointerEvent) {
      px.set((e.clientX / window.innerWidth - 0.5) * 22);
      py.set(-9 + (e.clientY / window.innerHeight - 0.5) * -14);
    }
    py.set(-9);
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [px, py]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ perspective: 1700, perspectiveOrigin: "50% 46%" }}>
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-serif text-[36vw] font-extrabold italic leading-none text-terracotta/15 md:text-[24vw]">
        Stories
      </p>
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="absolute left-1/2 top-[46%] h-0 w-0"
      >
        <div className="ring3d absolute left-0 top-0 h-0 w-0 [--ring-radius:330px] md:[--ring-radius:620px]">
          {panels.map((p, i) => (
            <div
              key={p.src}
              className="absolute -left-[90px] -top-[130px] h-[260px] w-[180px] overflow-hidden rounded-md shadow-[0_40px_80px_rgba(0,0,0,0.55)] md:-left-[130px] md:-top-[190px] md:h-[380px] md:w-[260px]"
              style={{ transform: `rotateY(${i * 45}deg) translateZ(var(--ring-radius, 440px))` }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                // Every panel but the front-facing one sits at a steep
                // rotateY angle on the cylinder, so an exact-size source
                // looks softened once Chromium perspective-warps it — see
                // the matching note in Coverflow.tsx.
                sizes="(max-width: 768px) 360px, 520px"
                quality={92}
                loading={i < 3 ? "eager" : undefined}
                fetchPriority={i < 3 ? "high" : undefined}
                className="scale-[1.12] object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40" />
    </div>
  );
}
