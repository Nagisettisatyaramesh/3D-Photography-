import Link from "next/link";
import Image from "next/image";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deletePortfolioItem } from "@/app/admin/actions/portfolio";

export default async function AdminPortfolioPage() {
  const supabase = getSupabaseAdminClient();
  const { data: items } = supabase
    ? await supabase.from("portfolio_items").select("*").order("display_order")
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow mb-2 text-terracotta">Content</p>
          <h1 className="font-serif text-4xl italic">Portfolio</h1>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black"
        >
          + Add Portfolio Item
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {(items ?? []).map((item) => (
          <div key={item.id} className="group relative border border-ink/10 bg-white/50">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image src={item.cover_image_url} alt={item.title} fill className="object-cover" />
              {!item.published && (
                <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] uppercase tracking-wider text-white">
                  Hidden
                </span>
              )}
              {item.featured && (
                <span className="absolute right-2 top-2 rounded-full bg-terracotta px-2 py-1 text-[10px] uppercase tracking-wider text-white">
                  Featured
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="truncate text-xs text-ink/50">{item.category}</p>
              <div className="mt-2 flex items-center justify-between">
                <Link href={`/admin/portfolio/${item.id}`} className="text-xs uppercase tracking-[0.1em] text-terracotta hover:text-ink">
                  Edit
                </Link>
                <DeleteButton action={deletePortfolioItem.bind(null, item.id)} label="Delete" confirmText="Delete this portfolio item?" />
              </div>
            </div>
          </div>
        ))}
        {(!items || items.length === 0) && <p className="text-ink/40">No portfolio items yet.</p>}
      </div>
    </div>
  );
}
