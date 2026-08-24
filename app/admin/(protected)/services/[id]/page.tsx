import { notFound } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { updateService } from "@/app/admin/actions/services";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdminClient();
  const { data: item } = supabase ? await supabase.from("services").select("*").eq("id", id).single() : { data: null };

  if (!item) notFound();

  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Services</p>
      <h1 className="mb-10 font-serif text-4xl italic">Edit Service</h1>
      <ServiceForm action={updateService.bind(null, id)} item={item} />
    </div>
  );
}
