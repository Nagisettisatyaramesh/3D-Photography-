"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { isResendConfigured, sendQuotationPdfEmail } from "@/lib/email/resend";
import { renderQuotationPdf } from "@/lib/pdf/renderQuotationPdf";
import type { QuotationData } from "@/lib/pdf/QuotationDocument";

async function generateQuotationNumber(supabase: ReturnType<typeof getSupabaseAdminClient>) {
  const year = new Date().getFullYear();
  const { data } = await supabase!
    .from("quotations")
    .select("quotation_number")
    .ilike("quotation_number", `QT-${year}-%`)
    .order("quotation_number", { ascending: false })
    .limit(1);

  const last = data?.[0]?.quotation_number as string | undefined;
  const lastSeq = last ? Number(last.split("-").pop()) || 0 : 0;
  const next = String(lastSeq + 1).padStart(3, "0");
  return `QT-${year}-${next}`;
}

export async function createQuotation(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const quotation_number = await generateQuotationNumber(supabase);
  const leadId = String(formData.get("lead_id") || "") || null;

  const { data, error } = await supabase
    .from("quotations")
    .insert({
      quotation_number,
      lead_id: leadId,
      customer_name: String(formData.get("customer_name") || "") || null,
      bride_name: String(formData.get("bride_name") || "") || null,
      groom_name: String(formData.get("groom_name") || "") || null,
      mobile: String(formData.get("mobile") || "") || null,
      email: String(formData.get("email") || "") || null,
      event_date: String(formData.get("event_date") || "") || null,
      event_location: String(formData.get("event_location") || "") || null,
      wedding_type: String(formData.get("wedding_type") || "") || null,
      number_of_events: formData.get("number_of_events") ? Number(formData.get("number_of_events")) : null,
      number_of_guests: formData.get("number_of_guests") ? Number(formData.get("number_of_guests")) : null,
    })
    .select("id")
    .single();

  if (error || !data) return { error: error?.message ?? "Could not create quotation." };

  revalidatePath("/admin/quotations");
  redirect(`/admin/quotations/${data.id}`);
}

export async function updateQuotationDetails(id: string, formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const update: Record<string, unknown> = {
    customer_name: String(formData.get("customer_name") || "") || null,
    bride_name: String(formData.get("bride_name") || "") || null,
    groom_name: String(formData.get("groom_name") || "") || null,
    mobile: String(formData.get("mobile") || "") || null,
    email: String(formData.get("email") || "") || null,
    event_date: String(formData.get("event_date") || "") || null,
    event_location: String(formData.get("event_location") || "") || null,
    wedding_type: String(formData.get("wedding_type") || "") || null,
    number_of_events: formData.get("number_of_events") ? Number(formData.get("number_of_events")) : null,
    number_of_guests: formData.get("number_of_guests") ? Number(formData.get("number_of_guests")) : null,
    intro_note: String(formData.get("intro_note") || "") || null,
    terms: String(formData.get("terms") || "") || null,
    discount_type: String(formData.get("discount_type") || "fixed"),
    discount_value: Number(formData.get("discount_value") || 0),
    additional_charges: Number(formData.get("additional_charges") || 0),
    tax_percent: Number(formData.get("tax_percent") || 0),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("quotations").update(update).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath(`/admin/quotations/${id}`);
  return { success: true };
}

export async function deleteQuotation(id: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { error } = await supabase.from("quotations").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/quotations");
  redirect("/admin/quotations");
}

export async function addQuotationItem(quotationId: string, formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { data: existing } = await supabase
    .from("quotation_items")
    .select("display_order")
    .eq("quotation_id", quotationId)
    .order("display_order", { ascending: false })
    .limit(1);
  const nextOrder = (existing?.[0]?.display_order ?? -1) + 1;

  const { error } = await supabase.from("quotation_items").insert({
    quotation_id: quotationId,
    service_name: String(formData.get("service_name") || ""),
    description: String(formData.get("description") || "") || null,
    quantity: Number(formData.get("quantity") || 1),
    unit_price: Number(formData.get("unit_price") || 0),
    display_order: nextOrder,
  });

  if (error) return { error: error.message };

  revalidatePath(`/admin/quotations/${quotationId}`);
  return { success: true };
}

export async function updateQuotationItem(itemId: string, quotationId: string, formData: FormData) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { error } = await supabase
    .from("quotation_items")
    .update({
      service_name: String(formData.get("service_name") || ""),
      description: String(formData.get("description") || "") || null,
      quantity: Number(formData.get("quantity") || 1),
      unit_price: Number(formData.get("unit_price") || 0),
    })
    .eq("id", itemId);

  if (error) return { error: error.message };

  revalidatePath(`/admin/quotations/${quotationId}`);
  return { success: true };
}

export async function deleteQuotationItem(itemId: string, quotationId: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { error } = await supabase.from("quotation_items").delete().eq("id", itemId);
  if (error) return { error: error.message };

  revalidatePath(`/admin/quotations/${quotationId}`);
  return { success: true };
}

async function loadQuotationData(quotationId: string): Promise<QuotationData | null> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return null;

  const { data: quotation } = await supabase.from("quotations").select("*").eq("id", quotationId).single();
  if (!quotation) return null;

  const { data: items } = await supabase
    .from("quotation_items")
    .select("*")
    .eq("quotation_id", quotationId)
    .order("display_order", { ascending: true });

  return {
    ...quotation,
    items: (items ?? []).map((i) => ({
      service_name: i.service_name,
      description: i.description,
      quantity: i.quantity,
      unit_price: i.unit_price,
    })),
  } as QuotationData;
}

export async function sendQuotationEmail(quotationId: string) {
  if (!isResendConfigured) {
    return { error: "Email sending isn't configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL to send quotations." };
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const data = await loadQuotationData(quotationId);
  if (!data) return { error: "Quotation not found." };
  if (!data.email) return { error: "This quotation has no customer email address yet." };
  if (data.items.length === 0) return { error: "Add at least one line item before sending." };

  try {
    const pdfBuffer = await renderQuotationPdf(data);
    await sendQuotationPdfEmail({
      to: data.email,
      customerName: [data.groom_name, data.bride_name].filter(Boolean).join(" & ") || data.customer_name || "there",
      quotationNumber: data.quotation_number,
      pdfBuffer,
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to send email." };
  }

  const { error } = await supabase
    .from("quotations")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", quotationId);
  if (error) return { error: error.message };

  revalidatePath(`/admin/quotations/${quotationId}`);
  revalidatePath("/admin/quotations");
  return { success: true };
}

export async function updateQuotationStatus(quotationId: string, status: string) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return { error: "Supabase not configured." };

  const { error } = await supabase.from("quotations").update({ status }).eq("id", quotationId);
  if (error) return { error: error.message };

  revalidatePath(`/admin/quotations/${quotationId}`);
  revalidatePath("/admin/quotations");
  return { success: true };
}

export { loadQuotationData };
