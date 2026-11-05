import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { SiteImagesManager } from "@/components/admin/SiteImagesManager";

export default async function AdminSiteImagesPage() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = supabase
    ? await supabase.from("site_images").select("slot, image_url")
    : { data: null, error: { message: "Supabase not configured." } };
  const overrides = Object.fromEntries((data ?? []).map((row) => [row.slot, row.image_url]));

  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Website Content</p>
      <h1 className="mb-3 font-serif text-4xl italic">Site Images</h1>
      <p className="mb-10 max-w-2xl text-sm text-ink/60">
        Replace the photos on the home page and the page covers. Each card lists the smallest size and largest file
        accepted. Photos for portfolio items, films, services and testimonials are changed in their own sections.
      </p>
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          Site images can&apos;t be loaded: {error.message} If this is a new setup, run
          supabase/schema_site_images.sql in the Supabase SQL editor.
        </p>
      ) : (
        <SiteImagesManager overrides={overrides} />
      )}
    </div>
  );
}
