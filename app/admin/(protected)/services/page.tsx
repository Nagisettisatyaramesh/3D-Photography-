import Link from "next/link";
import Image from "next/image";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteService } from "@/app/admin/actions/services";

export default async function AdminServicesPage() {
  const supabase = getSupabaseAdminClient();
  const { data: services } = supabase
    ? await supabase.from("services").select("*").order("display_order")
    : { data: [] };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow mb-2 text-terracotta">Content</p>
          <h1 className="font-serif text-4xl italic">Services & Pricing</h1>
        </div>
        <Link
          href="/admin/services/new"
          className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black"
        >
          + Add Service
        </Link>
      </div>

      <div className="mt-10 flex flex-col divide-y divide-ink/10 border border-ink/10 bg-white/50">
        {(services ?? []).map((s) => (
          <div key={s.id} className="flex items-center gap-4 px-5 py-4">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden border border-ink/10">
              {s.image_url && <Image src={s.image_url} alt={s.name} fill className="object-cover" />}
            </div>
            <div className="flex-1">
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-ink/50">
                {s.price_visible && s.starting_price ? `Starting from ₹${Number(s.starting_price).toLocaleString("en-IN")}` : "Price hidden"}
                {!s.published && " · Hidden from site"}
              </p>
            </div>
            <Link href={`/admin/services/${s.id}`} className="text-xs uppercase tracking-[0.1em] text-terracotta hover:text-ink">
              Edit
            </Link>
            <DeleteButton action={deleteService.bind(null, s.id)} confirmText="Delete this service?" />
          </div>
        ))}
        {(!services || services.length === 0) && <p className="px-5 py-10 text-ink/40">No services yet.</p>}
      </div>
    </div>
  );
}
