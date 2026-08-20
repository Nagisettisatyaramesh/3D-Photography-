import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseServerConfigured } from "@/lib/supabase/server";

const MOBILE_REGEX = /^[+]?[\d\s-]{10,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    fullName,
    mobile,
    email,
    eventType,
    eventDate,
    location,
    numberOfEvents,
    servicesInterested,
    message,
  } = body;

  if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!mobile || !MOBILE_REGEX.test(mobile)) {
    return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!eventType || typeof eventType !== "string") {
    return NextResponse.json({ error: "Please select an event type." }, { status: 400 });
  }
  if (eventDate) {
    const parsed = new Date(eventDate);
    if (Number.isNaN(parsed.getTime())) {
      return NextResponse.json({ error: "Please enter a valid event date." }, { status: 400 });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parsed < today) {
      return NextResponse.json({ error: "Event date can't be in the past." }, { status: 400 });
    }
  }

  if (!isSupabaseServerConfigured) {
    return NextResponse.json(
      {
        error:
          "This studio hasn't connected its database yet, so enquiries can't be saved right now — please reach out via WhatsApp or phone instead.",
      },
      { status: 503 }
    );
  }

  const supabase = getSupabaseServerClient()!;
  const { error } = await supabase.from("leads").insert({
    full_name: fullName.trim(),
    mobile: mobile.trim(),
    email: email.trim(),
    event_type: eventType,
    event_date: eventDate || null,
    location: location?.trim() || null,
    number_of_events: numberOfEvents ? Number(numberOfEvents) : null,
    services_interested: Array.isArray(servicesInterested) ? servicesInterested : [],
    message: message?.trim() || null,
  });

  if (error) {
    return NextResponse.json({ error: "Something went wrong saving your enquiry. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
