import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || Number.isNaN(new Date(date).getTime())) {
    return NextResponse.json({ error: "A valid date is required." }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ status: "unknown" });
  }

  // Anon-key client reading the `public_availability` view only (date +
  // status) — never the underlying table, which also holds customer names.
  const { data, error } = await supabase.from("public_availability").select("status").eq("date", date).maybeSingle();

  if (error) {
    return NextResponse.json({ status: "unknown" });
  }

  return NextResponse.json({ status: data?.status ?? "available" });
}
