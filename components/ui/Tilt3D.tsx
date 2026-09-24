"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** Wraps any block in a perspective scene that tilts toward the cursor and
 * lifts slightly, with a moving light glare. Skipped on touch devices and
 * under reduced motion. */
export function Tilt3D({
  children,
  className,
  max = 12,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 18 });
  const sy = useSpring(py, { stiffness: 160, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareX = useTransform(sx, [0, 1], [0, 100]);
  const glareY = useTransform(sy, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 55%)`;
  const lift = useSpring(0, { stiffness: 200, damping: 20 });
  const glareOpacity = useTransform(lift, [0, 1], [0, 1]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    lift.set(1);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
    lift.set(0);
  }

  const z = useTransform(lift, [0, 1], [0, 40]);

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn("relative", className)} style={{ perspective: 1000 }}>
      <motion.div style={{ rotateX, rotateY, z, transformStyle: "preserve-3d" }} className="relative h-full w-full">
        {children}
        <motion.div aria-hidden style={{ background: glare, opacity: glareOpacity }} className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light" />
      </motion.div>
    </div>
  );
}
