import { getServices, getPricingNote } from "@/lib/content/liveServices";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceFlipCard } from "@/components/home/ServiceFlipCard";

export async function ServicesSection() {
  const [services, pricingNote] = await Promise.all([getServices(), getPricingNote()]);

  return (
    <section className="px-6 py-28 md:px-12 md:py-40">
      <SectionHeading eyebrow="Services" title="What we bring to your celebration." className="mb-6" />
      <p className="max-w-md text-sm text-ink/55 md:text-base">{pricingNote}</p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.slice(0, 4).map((service, i) => (
          <ServiceFlipCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
