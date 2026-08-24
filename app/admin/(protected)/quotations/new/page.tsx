import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { QuotationCreateForm } from "@/components/admin/QuotationCreateForm";

export default async function NewQuotationPage({
  searchParams,
}: {
  searchParams: Promise<{ lead_id?: string }>;
}) {
  const { lead_id } = await searchParams;
  const supabase = getSupabaseAdminClient();

  const { data: lead } =
    supabase && lead_id ? await supabase.from("leads").select("*").eq("id", lead_id).single() : { data: null };

  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Proposals</p>
      <h1 className="mb-10 font-serif text-4xl italic">New Quotation</h1>
      <QuotationCreateForm leadId={lead_id} lead={lead} />
    </div>
  );
}
