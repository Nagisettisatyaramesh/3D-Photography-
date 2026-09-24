export const siteConfig = {
  studioName: "Unique Creations",
  tagline: "Tells your story with heart",
  eyebrow: "PHOTOGRAPHY · FILMS · STORIES",
  headline: ["Your story", "deserves to be remembered."],
  description:
    "At Unique Creations, we believe every moment is a story worth cherishing — captured with creativity, passion and precision.",
  brandStatement:
    "Specializing in professional photography and videography, we capture the true essence of weddings and a wide range of events. From candid smiles to grand celebrations, our team ensures every detail is preserved in stunning visuals and cinematic frames — turning your precious memories into timeless treasures you and your loved ones can relive forever.",
  // Placeholder contact details — editable via Website Settings once the admin
  // portal ships (Phase B); swap for the studio's real details any time.
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@uniquecreations.in",
  address: "Andhra Pradesh",
  instagram: "https://www.instagram.com/uniquecreations.av",
  youtube: "https://www.youtube.com/@uniquecreations2047",
  mapsUrl: "https://maps.google.com/?q=Andhra+Pradesh",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Photography", href: "/photography" },
    { label: "Films", href: "/films" },
    { label: "Stories", href: "/stories" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: {
    services: [
      { label: "Wedding Photography", href: "/services#wedding-photography" },
      { label: "Cinematic Films", href: "/services#cinematic-films" },
      { label: "Pre-Wedding", href: "/services#pre-wedding" },
      { label: "Half Saree Function", href: "/services#half-saree" },
    ],
    studio: [
      { label: "About", href: "/about" },
      { label: "Stories", href: "/stories" },
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ],
  },
} as const;
