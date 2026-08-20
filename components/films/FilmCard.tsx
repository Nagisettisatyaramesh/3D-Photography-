"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Film } from "@/lib/content/films";
import { brand } from "@/lib/content/brandImages";
import { expandReveal, viewportOnce } from "@/lib/motion";

type FilmCardProps = {
  film: Film;
  onPlay: (film: Film) => void;
};

export function FilmCard({ film, onPlay }: FilmCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onPlay(film)}
      variants={expandReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      data-cursor-hover="Play Film"
      className="group relative block h-[50vh] min-h-[340px] w-full overflow-hidden text-left"
    >
      <Image
        src={brand[film.thumbnail]}
        alt={film.title}
        fill
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/50" />

      <motion.div
        initial={{ scale: 0.85, opacity: 0.8 }}
        whileHover={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-parchment/70"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-5 w-5 text-parchment">
          <path d="M8 5v14l11-7z" />
        </svg>
      </motion.div>

      <div className="absolute bottom-6 left-6 text-parchment md:bottom-8 md:left-8">
        <p className="font-serif text-2xl italic md:text-3xl">{film.title}</p>
        <p className="eyebrow mt-2 opacity-80">{film.type}</p>
      </div>
    </motion.button>
  );
}
