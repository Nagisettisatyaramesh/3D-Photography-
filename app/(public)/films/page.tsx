import { getFilms } from "@/lib/content/liveFilms";
import { FilmsGrid } from "@/components/films/FilmsGrid";
import { RevealText } from "@/components/ui/RevealText";

export default async function FilmsPage() {
  const films = await getFilms();

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

      <FilmsGrid films={films} />
    </main>
  );
}
