import type { NextConfig } from "next";

// This local dev sandbox intercepts outbound HTTPS with a certificate Node
// doesn't trust by default (seen already with next/image -> Unsplash; now
// also breaking supabase-js's server-side fetch to the Supabase REST API).
// Scoped to development only — production builds on Vercel run on a normal
// network and don't need this.
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const nextConfig: NextConfig = {
  // Admin image uploads (portfolio, films, services, testimonials, hero)
  // post the files through Server Actions, which reject bodies over 1MB by
  // default — smaller than almost any real photo. 4mb stays under Vercel's
  // 4.5MB request-body cap for serverless functions.
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  // The quotation PDF route reads font files and the studio's portfolio PDF
  // template from lib/pdf/ via fs at render time — Next's file tracer can't
  // statically see those `path.join`-built paths, so on Vercel's serverless
  // build the files would otherwise be missing at runtime.
  outputFileTracingIncludes: {
    "app/admin/(protected)/quotations/[id]/pdf/route": ["./lib/pdf/fonts/**", "./lib/pdf/assets/**"],
    "app/admin/(protected)/quotations/[id]/page": ["./lib/pdf/fonts/**", "./lib/pdf/assets/**"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      // Images uploaded from the admin panel (film thumbnails, portfolio,
      // etc.) live in the project's public Supabase storage bucket. Without
      // this entry the optimizer rejects them with a 400 on Vercel — the
      // dev sandbox runs with `unoptimized`, so it never shows there.
      {
        protocol: "https",
        hostname: "mdrbperjsgdgfwovinhf.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // The LOCAL dev sandbox's network intercepts HTTPS with a cert Node's
    // fetch won't trust, which breaks the built-in image optimizer's
    // server-side fetch to Unsplash. Scoped to development only — on
    // Vercel this resizes every photo down to the size it's actually
    // shown at (the real cause of slow loads, not the JPEG quality), at
    // quality 92 on hero/gallery photos so there's no visible softening.
    unoptimized: process.env.NODE_ENV === "development",
    // Next.js 16 only serves quality values listed here (default: [75]).
    // 92 is used on the hero/gallery photos for high clarity at the
    // resized dimensions; 75 stays available as next/image's own default
    // for every other photo on the site.
    qualities: [75, 92, 100],
  },
};

export default nextConfig;
