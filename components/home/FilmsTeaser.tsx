"use client";

import { useState } from "react";
import Link from "next/link";
import { films } from "@/lib/content/films";
import { FilmCard } from "@/components/films/FilmCard";
import { FilmModal } from "@/components/films/FilmModal";
import { driftUp, viewportOnce } from "@/lib/motion";
import { motion } from "motion/react";
import type { Film } from "@/lib/content/films";

export function FilmsTeaser() {
  const [active, setActive] = useState<Film | null>(null);

  return (
    <section className="bg-black px-6 py-28 text-parchment md:px-12 md:py-40">
      <motion.div
        variants={driftUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-14"
      >
        <p className="eyebrow mb-4 text-terracotta-soft">Films</p>
        <h2 className="max-w-lg font-serif text-4xl italic leading-[1.05] md:text-5xl">
          Motion tells what stills can&apos;t.
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {films.slice(0, 2).map((film) => (
          <FilmCard key={film.slug} film={film} onPlay={setActive} />
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/films"
          data-cursor-hover="true"
          className="eyebrow border-b border-current pb-1 text-parchment/80 hover:text-terracotta-soft"
        >
          Watch All Films →
        </Link>
      </div>

      <FilmModal film={active} onClose={() => setActive(null)} />
    </section>
  );
}
