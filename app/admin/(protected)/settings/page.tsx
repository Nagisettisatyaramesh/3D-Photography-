import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const supabase = getSupabaseAdminClient();
  const { data: settings } = supabase
    ? await supabase.from("website_settings").select("*").eq("id", 1).single()
    : { data: null };

  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Configuration</p>
      <h1 className="mb-10 font-serif text-4xl italic">Website Settings</h1>
      {settings ? (
        <SettingsForm settings={settings} />
      ) : (
        <p className="text-ink/50">Website settings aren&apos;t configured yet.</p>
      )}
    </div>
  );
}
