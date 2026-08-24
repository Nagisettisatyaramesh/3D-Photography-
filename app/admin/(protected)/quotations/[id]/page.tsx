import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { QuotationDetailsForm } from "@/components/admin/QuotationDetailsForm";
import { QuotationItemsEditor } from "@/components/admin/QuotationItemsEditor";
import { QuotationStatusSelect } from "@/components/admin/QuotationStatusSelect";
import { SendQuotationButton } from "@/components/admin/SendQuotationButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteQuotation } from "@/app/admin/actions/quotations";
import { computeQuotationTotals } from "@/lib/pdf/QuotationDocument";
import { isResendConfigured } from "@/lib/email/resend";

export default async function QuotationBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdminClient();

  const { data: quotation } = supabase
    ? await supabase.from("quotations").select("*").eq("id", id).single()
    : { data: null };
  if (!quotation) notFound();

  const { data: items } = supabase
    ? await supabase.from("quotation_items").select("*").eq("quotation_id", id).order("display_order", { ascending: true })
    : { data: [] };

  const totals = computeQuotationTotals({
    items: (items ?? []).map((i) => ({ quantity: i.quantity, unit_price: i.unit_price })),
    discount_type: quotation.discount_type,
    discount_value: quotation.discount_value,
    additional_charges: quotation.additional_charges,
    tax_percent: quotation.tax_percent,
  });

  return (
    <div>
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow mb-2 text-terracotta">Proposal</p>
          <h1 className="font-serif text-4xl italic">{quotation.quotation_number}</h1>
          <div className="mt-3 flex items-center gap-3">
            <QuotationStatusSelect quotationId={id} status={quotation.status} />
            {quotation.sent_at && (
              <span className="text-xs text-ink/50">
                Last sent {new Date(quotation.sent_at).toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Link
            href={`/admin/quotations/${id}/pdf`}
            target="_blank"
            className="rounded-full border border-ink/20 px-6 py-3 text-xs uppercase tracking-[0.2em] hover:border-ink"
          >
            Preview PDF
          </Link>
          <SendQuotationButton quotationId={id} disabled={!isResendConfigured} />
        </div>
      </div>

      {!isResendConfigured && (
        <p className="mb-8 border border-terracotta/40 bg-blush/40 px-4 py-3 text-sm text-ink/70">
          Email sending isn&apos;t configured yet. Add <code>RESEND_API_KEY</code> and{" "}
          <code>RESEND_FROM_EMAIL</code> to your environment to enable sending — you can still preview and download
          the PDF above.
        </p>
      )}

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-4 font-serif text-2xl italic">Line Items</h2>
          <QuotationItemsEditor quotationId={id} items={items ?? []} />

          <div className="mt-6 flex max-w-sm flex-col gap-2 border border-ink/10 bg-white/50 p-5 ml-auto">
            <TotalsRow label="Subtotal" value={totals.subtotal} />
            {totals.discount > 0 && <TotalsRow label="Discount" value={-totals.discount} />}
            {quotation.additional_charges > 0 && <TotalsRow label="Additional Charges" value={quotation.additional_charges} />}
            {totals.tax > 0 && <TotalsRow label="Tax" value={totals.tax} />}
            <div className="mt-2 flex items-baseline justify-between border-t border-ink/15 pt-3">
              <span className="font-serif text-lg italic">Total</span>
              <span className="font-serif text-xl italic text-terracotta">
                ₹{Math.round(totals.grandTotal).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <h2 className="mt-12 mb-4 font-serif text-2xl italic">Event & Customer Details</h2>
          <QuotationDetailsForm quotation={quotation} />
        </div>

        <div>
          <div className="border border-ink/10 bg-white/50 p-6">
            <h3 className="mb-4 text-xs uppercase tracking-[0.15em] text-ink/50">Danger Zone</h3>
            <p className="mb-4 text-sm text-ink/60">
              Deleting a quotation permanently removes it and all of its line items.
            </p>
            <DeleteButton
              action={deleteQuotation.bind(null, id)}
              label="Delete Quotation"
              confirmText="Permanently delete this quotation?"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TotalsRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between text-sm">
      <span className="text-ink/60">{label}</span>
      <span>
        {value < 0 ? "- " : ""}₹{Math.round(Math.abs(value)).toLocaleString("en-IN")}
      </span>
    </div>
  );
}
