"use client";

import { useState } from "react";
import type { LiveFilm } from "@/lib/content/liveFilms";
import { FilmCard } from "@/components/films/FilmCard";
import { FilmModal } from "@/components/films/FilmModal";

export function FilmsGrid({ films }: { films: LiveFilm[] }) {
  const [active, setActive] = useState<LiveFilm | null>(null);

  return (
    <>
      <div className="mt-16 grid gap-6 px-6 md:grid-cols-2 md:gap-8 md:px-12">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} onPlay={setActive} />
        ))}
      </div>
      <FilmModal film={active} onClose={() => setActive(null)} />
    </>
  );
}
