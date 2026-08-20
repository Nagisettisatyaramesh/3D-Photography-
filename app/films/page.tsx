"use client";

import { useState } from "react";
import { films, type Film } from "@/lib/content/films";
import { FilmCard } from "@/components/films/FilmCard";
import { FilmModal } from "@/components/films/FilmModal";
import { RevealText } from "@/components/ui/RevealText";

export default function FilmsPage() {
  const [active, setActive] = useState<Film | null>(null);

  return (
    <main className="bg-black pb-28 pt-32 text-parchment md:pb-40 md:pt-40">
      <div className="px-6 md:px-12">
        <p className="eyebrow mb-6 text-terracotta-soft">Films</p>
        <RevealText
          as="h1"
          lines={["Motion tells what", "stills can't."]}
          triggerOnMount
          className="font-serif text-5xl italic leading-[1.05] md:text-7xl"
        />
      </div>

      <div className="mt-16 grid gap-6 px-6 md:grid-cols-2 md:gap-8 md:px-12">
        {films.map((film) => (
          <FilmCard key={film.slug} film={film} onPlay={setActive} />
        ))}
      </div>

      <FilmModal film={active} onClose={() => setActive(null)} />
    </main>
  );
}
