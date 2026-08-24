import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { AvailabilityForm } from "@/components/admin/AvailabilityForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { clearAvailability } from "@/app/admin/actions/availability";

export default async function AdminAvailabilityPage() {
  const supabase = getSupabaseAdminClient();
  const { data: rows } = supabase
    ? await supabase
        .from("availability")
        .select("*")
        .gte("date", new Date().toISOString().split("T")[0])
        .order("date")
    : { data: [] };

  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Calendar</p>
      <h1 className="mb-2 font-serif text-4xl italic">Availability</h1>
      <p className="mb-8 max-w-lg text-sm text-ink/50">
        Any date not listed here shows as <strong>Available</strong> on the public site&apos;s availability
        checker. Set a date below to mark it as held or booked.
      </p>

      <AvailabilityForm />

      <div className="mt-10 flex flex-col divide-y divide-ink/10 border border-ink/10 bg-white/50">
        {(rows ?? []).map((row) => (
          <div key={row.id} className="flex items-center gap-4 px-5 py-3 text-sm">
            <span className="w-32 shrink-0">
              {new Date(row.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
            <StatusBadge status={row.status} />
            <span className="flex-1 text-ink/60">
              {row.customer_name && <span className="font-medium text-ink">{row.customer_name}</span>}
              {row.customer_name && row.note && " · "}
              {row.note}
            </span>
            <DeleteButton action={clearAvailability.bind(null, row.date)} label="Clear" confirmText="Reset this date to Available?" />
          </div>
        ))}
        {(!rows || rows.length === 0) && <p className="px-5 py-10 text-ink/40">No dates held or booked yet.</p>}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    available: "bg-green-100 text-green-800",
    enquiry: "bg-amber-100 text-amber-800",
    quotation: "bg-blue-100 text-blue-800",
    booked: "bg-red-100 text-red-800",
  };
  return (
    <span className={`w-24 shrink-0 rounded-full px-3 py-1 text-center text-xs uppercase tracking-[0.08em] ${colors[status] ?? "bg-ink/10"}`}>
      {status}
    </span>
  );
}
