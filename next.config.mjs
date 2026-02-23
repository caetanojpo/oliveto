import { getCsp } from "./src/lib/config/csp.mjs";
import { getSecurityHeaders } from "./src/lib/config/security-headers.mjs";

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  /*
   * Custom headers in next.config.mjs are ineffective for static exports (output: "export").
   * Security headers are instead managed via:
   * 1. Meta tags in src/app/layout.tsx (for CSP, Referrer-Policy, and DNS-prefetch)
   * 2. .htaccess for Apache environments
   * 3. vercel.json for Vercel deployments
   */
};

export default nextConfig;
