import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/serverClient";
import { signOutAction } from "@/app/admin/actions";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Enquiries", href: "/admin/enquiries" },
  { label: "Quotations", href: "/admin/quotations" },
  { label: "Portfolio", href: "/admin/portfolio" },
  { label: "Films", href: "/admin/films" },
  { label: "Services & Pricing", href: "/admin/services" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Availability", href: "/admin/availability" },
  { label: "Website Settings", href: "/admin/settings" },
];

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getSupabaseServerClient();
  const { data } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

  return (
    <div className="flex min-h-screen bg-parchment text-ink">
      <aside className="flex w-64 shrink-0 flex-col justify-between border-r border-ink/10 bg-ink px-6 py-8 text-parchment">
        <div>
          <p className="font-serif text-xl italic">Unique Creations</p>
          <p className="eyebrow mt-1 text-terracotta-soft">Studio Admin</p>

          <nav className="mt-10 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm text-parchment/75 transition-colors hover:bg-parchment/10 hover:text-parchment"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="truncate text-xs text-parchment/40">{data.user?.email}</p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="mt-3 text-xs uppercase tracking-[0.15em] text-parchment/60 hover:text-terracotta-soft"
            >
              Sign Out
            </button>
          </form>
          <Link
            href="/"
            target="_blank"
            className="mt-3 block text-xs uppercase tracking-[0.15em] text-parchment/60 hover:text-terracotta-soft"
          >
            View Site →
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-10 py-10">{children}</main>
    </div>
  );
}
