import Link from "next/link";
import Image from "next/image";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTestimonial } from "@/app/admin/actions/testimonials";

export default async function AdminTestimonialsPage() {
  const supabase = getSupabaseAdminClient();
  const { data: items } = supabase
    ? await supabase.from("testimonials").select("*").order("display_order")
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow mb-2 text-terracotta">Content</p>
          <h1 className="font-serif text-4xl italic">Testimonials</h1>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black"
        >
          + Add Testimonial
        </Link>
      </div>

      <div className="mt-10 flex flex-col divide-y divide-ink/10 border border-ink/10 bg-white/50">
        {(items ?? []).map((t) => (
          <div key={t.id} className="flex items-center gap-4 px-5 py-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-ink/10">
              {t.image_url && <Image src={t.image_url} alt={t.names} fill className="object-cover" />}
            </div>
            <div className="flex-1">
              <p className="font-medium">
                {t.names} · {t.location}
              </p>
              <p className="max-w-md truncate text-xs text-ink/50">&ldquo;{t.quote}&rdquo;</p>
            </div>
            <Link href={`/admin/testimonials/${t.id}`} className="text-xs uppercase tracking-[0.1em] text-terracotta hover:text-ink">
              Edit
            </Link>
            <DeleteButton action={deleteTestimonial.bind(null, t.id)} confirmText="Delete this testimonial?" />
          </div>
        ))}
        {(!items || items.length === 0) && <p className="px-5 py-10 text-ink/40">No testimonials yet.</p>}
      </div>
    </div>
  );
}
