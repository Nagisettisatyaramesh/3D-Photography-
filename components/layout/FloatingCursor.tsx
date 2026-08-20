"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

const BASE_SIZE = 16;

export function FloatingCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const hasPositioned = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Near-critical damping — tracks the real cursor almost one-to-one with
  // just enough smoothing to feel fluid rather than robotic or laggy.
  const springX = useSpring(x, { stiffness: 1000, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 1000, damping: 40, mass: 0.3 });

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-floating-cursor");
      return;
    }
    document.documentElement.classList.add("has-floating-cursor");

    function handleMove(e: MouseEvent) {
      if (!hasPositioned.current) {
        springX.jump(e.clientX);
        springY.jump(e.clientY);
        hasPositioned.current = true;
        setVisible(true);
      }
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor-hover]");
      if (target) {
        const value = target.getAttribute("data-cursor-hover");
        setActive(true);
        setLabel(value && value !== "true" ? value : null);
      } else {
        setActive(false);
        setLabel(null);
      }
    }

    function handleLeave() {
      setVisible(false);
      hasPositioned.current = false;
    }

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.classList.remove("has-floating-cursor");
    };
  }, [enabled, springX, springY, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center rounded-full bg-parchment mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        width: BASE_SIZE,
        height: BASE_SIZE,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: active ? (label ? 5.25 : 2.75) : 0.5,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        scale: { type: "spring", stiffness: 380, damping: 24, mass: 0.6 },
        opacity: { duration: 0.25, ease: "easeOut" },
      }}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ scale: 1 / 5.25 }}
            className="eyebrow whitespace-nowrap text-[9px] text-black"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
