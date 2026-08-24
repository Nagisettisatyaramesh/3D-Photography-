import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";

const statusStyles: Record<string, string> = {
  draft: "bg-ink/10 text-ink/60",
  sent: "bg-terracotta-soft/40 text-ink/80",
  accepted: "bg-terracotta/30 text-ink",
  booking_confirmed: "bg-terracotta text-parchment",
};

export default async function AdminQuotationsPage() {
  const supabase = getSupabaseAdminClient();
  const { data: quotations } = supabase
    ? await supabase.from("quotations").select("*").order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-2 text-terracotta">Proposals</p>
          <h1 className="font-serif text-4xl italic">Quotations</h1>
        </div>
        <Link
          href="/admin/quotations/new"
          className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-parchment hover:bg-black"
        >
          New Quotation
        </Link>
      </div>

      <div className="overflow-x-auto border border-ink/10 bg-white/50">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.08em] text-ink/50">
              <th className="px-4 py-3">Number</th>
              <th className="px-4 py-3">Couple</th>
              <th className="px-4 py-3">Event Date</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {(quotations ?? []).map((q) => (
              <tr key={q.id} className="border-b border-ink/5 align-top last:border-0 hover:bg-blush/20">
                <td className="px-4 py-3 font-medium">
                  <Link href={`/admin/quotations/${q.id}`} className="hover:text-terracotta">
                    {q.quotation_number}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {[q.groom_name, q.bride_name].filter(Boolean).join(" & ") || q.customer_name || "—"}
                </td>
                <td className="px-4 py-3">
                  {q.event_date ? new Date(q.event_date).toLocaleDateString("en-IN") : "—"}
                </td>
                <td className="px-4 py-3">
                  <div>{q.mobile || "—"}</div>
                  <div className="text-ink/50">{q.email || "—"}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.05em] ${statusStyles[q.status] ?? statusStyles.draft}`}>
                    {q.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-ink/50">
                  {new Date(q.created_at).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
            {(!quotations || quotations.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink/40">
                  No quotations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
