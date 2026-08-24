import Link from "next/link";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";

async function getCounts() {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return null;

  const [leads, newLeads, portfolio, services, testimonials, upcoming] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("portfolio_items").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase
      .from("availability")
      .select("date, status")
      .gte("date", new Date().toISOString().split("T")[0])
      .neq("status", "available")
      .order("date")
      .limit(5),
  ]);

  return {
    totalLeads: leads.count ?? 0,
    newLeads: newLeads.count ?? 0,
    portfolioCount: portfolio.count ?? 0,
    servicesCount: services.count ?? 0,
    testimonialsCount: testimonials.count ?? 0,
    upcoming: upcoming.data ?? [],
  };
}

export default async function AdminDashboardPage() {
  const stats = await getCounts();

  const cards = [
    { label: "Total Enquiries", value: stats?.totalLeads ?? "—", href: "/admin/enquiries" },
    { label: "New Enquiries", value: stats?.newLeads ?? "—", href: "/admin/enquiries" },
    { label: "Portfolio Items", value: stats?.portfolioCount ?? "—", href: "/admin/portfolio" },
    { label: "Active Services", value: stats?.servicesCount ?? "—", href: "/admin/services" },
    { label: "Testimonials", value: stats?.testimonialsCount ?? "—", href: "/admin/testimonials" },
  ];

  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Overview</p>
      <h1 className="font-serif text-4xl italic">Dashboard</h1>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="border border-ink/10 bg-white/50 p-5 transition-colors hover:border-terracotta"
          >
            <p className="font-serif text-3xl">{card.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ink/50">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.1em] text-ink/50">Upcoming Booked / Held Dates</p>
        {stats && stats.upcoming.length > 0 ? (
          <div className="flex flex-col divide-y divide-ink/10 border border-ink/10 bg-white/50">
            {stats.upcoming.map((row) => (
              <div key={row.date} className="flex items-center justify-between px-5 py-3 text-sm">
                <span>{new Date(row.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
                <StatusBadge status={row.status} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink/50">Nothing booked or held yet.</p>
        )}
        <Link href="/admin/availability" className="mt-4 inline-block text-xs uppercase tracking-[0.15em] text-terracotta hover:text-ink">
          Manage Availability →
        </Link>
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
    <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.1em] ${colors[status] ?? "bg-ink/10"}`}>
      {status}
    </span>
  );
}
