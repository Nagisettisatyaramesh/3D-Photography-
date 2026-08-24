import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";

export default async function AdminEnquiriesPage() {
  const supabase = getSupabaseAdminClient();
  const { data: leads } = supabase
    ? await supabase.from("leads").select("*").order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Leads</p>
      <h1 className="font-serif text-4xl italic">Enquiries</h1>

      <div className="mt-10 overflow-x-auto border border-ink/10 bg-white/50">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.08em] text-ink/50">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((lead) => (
              <tr key={lead.id} className="border-b border-ink/5 align-top last:border-0">
                <td className="px-4 py-3 font-medium">{lead.full_name}</td>
                <td className="px-4 py-3">
                  <div>{lead.mobile}</div>
                  <div className="text-ink/50">{lead.email}</div>
                </td>
                <td className="px-4 py-3">{lead.event_type}</td>
                <td className="px-4 py-3">
                  {lead.event_date ? new Date(lead.event_date).toLocaleDateString("en-IN") : "—"}
                </td>
                <td className="px-4 py-3">{lead.location || "—"}</td>
                <td className="max-w-[240px] px-4 py-3 text-ink/70">{lead.message || "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-ink/50">
                  {new Date(lead.created_at).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3">
                  <LeadStatusSelect id={lead.id} status={lead.status} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link href={`/admin/quotations/new?lead_id=${lead.id}`} className="text-xs uppercase tracking-[0.1em] text-terracotta hover:text-ink">
                    Quote →
                  </Link>
                </td>
              </tr>
            ))}
            {(!leads || leads.length === 0) && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-ink/40">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
