import { ServiceForm } from "@/components/admin/ServiceForm";
import { createService } from "@/app/admin/actions/services";

export default function NewServicePage() {
  return (
    <div>
      <p className="eyebrow mb-2 text-terracotta">Services</p>
      <h1 className="mb-10 font-serif text-4xl italic">Add Service</h1>
      <ServiceForm action={createService} />
    </div>
  );
}
