import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { FloatingCursor } from "@/components/layout/FloatingCursor";
import { getWebsiteSettings } from "@/lib/content/liveSettings";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getWebsiteSettings();

  return (
    <>
      <FloatingCursor />
      <Navbar settings={settings} />
      {children}
      <Footer settings={settings} />
      <WhatsAppButton whatsapp={settings.whatsapp} />
    </>
  );
}
