import { notFound } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { updatePortfolioItem } from "@/app/admin/actions/portfolio";

export default async function EditPortfolioItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdminClient();
  const { data: item } = supabase
    ? await supabase.from("portfolio_items").select("*").eq("id", id).single()
    : { data: null };

  if (!item) notFound();

  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Portfolio</p>
      <h1 className="mb-10 font-serif text-4xl italic">Edit Portfolio Item</h1>
      <PortfolioForm action={updatePortfolioItem.bind(null, id)} item={item} />
    </div>
  );
}
