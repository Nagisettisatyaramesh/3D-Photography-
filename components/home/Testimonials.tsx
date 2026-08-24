import { getTestimonials } from "@/lib/content/liveTestimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/home/TestimonialCard";

export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="py-28 md:py-40">
      <div className="px-6 md:px-12">
        <SectionHeading eyebrow="Testimonials" title="From the couples themselves." className="mb-16" />
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:px-12">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.id} testimonial={t} delay={i * 0.05} />
        ))}
      </div>
    </section>
  );
}
