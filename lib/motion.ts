import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Transition,
  type Variants,
} from "motion/react";

export const easeFluid = [0.16, 1, 0.3, 1] as const;
export const easeFloat = [0.22, 0.61, 0.36, 1] as const;

export const floatSpring: Transition = {
  type: "spring",
  stiffness: 90,
  damping: 22,
  mass: 1.1,
};

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;

/** Drift up into place with a soft blur-in — the default reveal for text and floating chips. */
export const driftUp: Variants = {
  hidden: { opacity: 0, y: 46, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: floatSpring,
  },
};

/** Large photographs expanding into frame — softer and slower than a plain fade. */
export const expandReveal: Variants = {
  hidden: { opacity: 0, scale: 1.16, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: easeFluid },
  },
};

/** A clip-path curtain reveal, used for section/typography transitions. */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1.1, ease: easeFluid },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: easeFluid } },
};

export const staggerFloat = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/**
 * Parallax offset for an element relative to its own scroll progress through
 * the viewport. `range` is the pixel travel distance — pass a negative first
 * value for elements that should drift upward as they enter.
 */
export function useParallax(range: [number, number] = [80, -80]) {
  const nodeRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: nodeRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], range);
  return { nodeRef, y, scrollYProgress };
}

/**
 * Subtle pointer-reactive drift for hero imagery / floating labels — tracks
 * the pointer within `containerRef` and returns a lightly-springed offset,
 * scaled down by `strength`. Disabled entirely under reduced-motion.
 */
export function usePointerDrift(
  containerRef: React.RefObject<HTMLElement | null>,
  strength = 18
) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    function handleMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px * strength);
      y.set(py * strength);
    }
    function handleLeave() {
      x.set(0);
      y.set(0);
    }

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [containerRef, strength, x, y]);

  return { x: springX, y: springY };
}

export type { MotionValue };
