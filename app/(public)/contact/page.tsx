import { getWebsiteSettings } from "@/lib/content/liveSettings";
import { ContactContent } from "@/components/contact/ContactContent";

export default async function ContactPage() {
  const settings = await getWebsiteSettings();
  return <ContactContent settings={settings} />;
}
