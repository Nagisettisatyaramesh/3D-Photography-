import Link from "next/link";
import { getFilms } from "@/lib/content/liveFilms";
import { FilmsGrid } from "@/components/films/FilmsGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function FilmsTeaser() {
  const films = await getFilms();

  return (
    <section className="bg-black px-6 py-28 text-parchment md:px-12 md:py-40">
      <SectionHeading eyebrow="Films" title="Motion tells what stills can't." dark className="[&_h2]:text-parchment" />

      <FilmsGrid films={films.slice(0, 2)} />

      <div className="mt-14 text-center">
        <Link
          href="/films"
          data-cursor-hover="true"
          className="eyebrow border-b border-current pb-1 text-parchment/80 hover:text-terracotta-soft"
        >
          Watch All Films →
        </Link>
      </div>
    </section>
  );
}
