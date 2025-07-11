import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000", // Keep this for your local machine
    "http://192.168.56.1:3000", // IMPORTANT: Replace <YOUR_SERVER_IP> with the IP of the machine running Next.js
    "http://192.168.31.1:3000", // OPTIONAL: If the other laptop also serves content that requests back
  ],

  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },

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
