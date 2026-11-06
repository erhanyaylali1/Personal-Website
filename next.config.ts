import type { NextConfig } from "next";
import { optimizedImagePatterns } from "./lib/image-hosts";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Blog images uploaded to Supabase Storage (see lib/image-hosts.ts).
    remotePatterns: optimizedImagePatterns(),
  },
  // A strict CSP is intentionally omitted: it needs per-request nonces for the inline
  // theme/consent/JSON-LD scripts, which would turn every static page dynamic.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // No includeSubDomains/preload: those would force HTTPS on every subdomain for two years.
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
