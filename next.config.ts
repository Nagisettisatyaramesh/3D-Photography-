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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // The dev sandbox's network intercepts HTTPS with a cert Node's fetch
    // won't trust, which breaks the built-in image optimizer's server-side
    // fetch to Unsplash. Serving these remote placeholder images unoptimized
    // (browser loads them directly) sidesteps that; swap for real
    // studio-hosted media in Phase 3 and this can be removed.
    unoptimized: true,
  },
};

export default nextConfig;
