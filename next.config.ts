import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Enable more verbose build output
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Warn during build if there are TypeScript errors
    ignoreBuildErrors: false,
  },

  // Add output file tracing for better debugging
  output: "standalone",
};

export default nextConfig;
