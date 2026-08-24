import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { createTestimonial } from "@/app/admin/actions/testimonials";

export default function NewTestimonialPage() {
  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Testimonials</p>
      <h1 className="mb-10 font-serif text-4xl italic">Add Testimonial</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  );
}
