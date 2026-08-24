import { notFound } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/adminClient";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "@/app/admin/actions/testimonials";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdminClient();
  const { data: item } = supabase
    ? await supabase.from("testimonials").select("*").eq("id", id).single()
    : { data: null };

  if (!item) notFound();

  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Testimonials</p>
      <h1 className="mb-10 font-serif text-4xl italic">Edit Testimonial</h1>
      <TestimonialForm action={updateTestimonial.bind(null, id)} item={item} />
    </div>
  );
}
