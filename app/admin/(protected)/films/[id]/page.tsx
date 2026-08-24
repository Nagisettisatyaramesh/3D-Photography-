import { notFound } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { FilmForm } from "@/components/admin/FilmForm";
import { updateFilm } from "@/app/admin/actions/films";

export default async function EditFilmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdminClient();
  const { data: item } = supabase ? await supabase.from("films").select("*").eq("id", id).single() : { data: null };

  if (!item) notFound();

  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Films</p>
      <h1 className="mb-10 font-serif text-4xl italic">Edit Film</h1>
      <FilmForm action={updateFilm.bind(null, id)} item={item} />
    </div>
  );
}
