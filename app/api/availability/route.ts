import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || Number.isNaN(new Date(date).getTime())) {
    return NextResponse.json({ error: "A valid date is required." }, { status: 400 });
  }

  if (!url || !anonKey) {
    return NextResponse.json({ status: "unknown" });
  }

  // Anon-key client reading the `public_availability` view only (date +
  // status) — never the underlying table, which also holds customer names.
  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase.from("public_availability").select("status").eq("date", date).maybeSingle();

  if (error) {
    return NextResponse.json({ status: "unknown" });
  }

  return NextResponse.json({ status: data?.status ?? "available" });
}
