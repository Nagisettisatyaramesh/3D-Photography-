import { FilmForm } from "@/components/admin/FilmForm";
import { createFilm } from "@/app/admin/actions/films";

export default function NewFilmPage() {
  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Films</p>
      <h1 className="mb-10 font-serif text-4xl italic">Add Film</h1>
      <FilmForm action={createFilm} />
    </div>
  );
}
