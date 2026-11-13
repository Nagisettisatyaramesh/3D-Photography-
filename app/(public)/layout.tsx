import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { FloatingCursor } from "@/components/layout/FloatingCursor";
import { SiteImagesProvider } from "@/components/providers/SiteImagesProvider";
import { getWebsiteSettings } from "@/lib/content/liveSettings";
import { getSiteImageOverrides } from "@/lib/content/liveSiteImages";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [settings, imageOverrides] = await Promise.all([getWebsiteSettings(), getSiteImageOverrides()]);

  return (
    <>
      <FloatingCursor />
      <Navbar settings={settings} />
      <SiteImagesProvider overrides={imageOverrides}>{children}</SiteImagesProvider>
      <Footer settings={settings} />
      <WhatsAppButton whatsapp={settings.whatsapp} />
    </>
  );
}
