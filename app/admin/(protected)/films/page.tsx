import Link from "next/link";
import Image from "next/image";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteFilm } from "@/app/admin/actions/films";

export default async function AdminFilmsPage() {
  const supabase = getSupabaseAdminClient();
  const { data: items } = supabase ? await supabase.from("films").select("*").order("display_order") : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow mb-2 text-terracotta">Content</p>
          <h1 className="font-serif text-4xl italic">Films</h1>
        </div>
        <Link
          href="/admin/films/new"
          className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black"
        >
          + Add Film
        </Link>
      </div>

      <div className="mt-10 flex flex-col divide-y divide-ink/10 border border-ink/10 bg-white/50">
        {(items ?? []).map((f) => (
          <div key={f.id} className="flex items-center gap-4 px-5 py-4">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden border border-ink/10">
              <Image src={f.thumbnail_url} alt={f.title} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{f.title}</p>
              <p className="text-xs text-ink/50">{f.film_type}</p>
            </div>
            <Link href={`/admin/films/${f.id}`} className="text-xs uppercase tracking-[0.1em] text-terracotta hover:text-ink">
              Edit
            </Link>
            <DeleteButton action={deleteFilm.bind(null, f.id)} confirmText="Delete this film?" />
          </div>
        ))}
        {(!items || items.length === 0) && <p className="px-5 py-10 text-ink/40">No films yet.</p>}
      </div>
    </div>
  );
}
