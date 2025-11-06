import type { NextConfig } from "next";

// Using type assertion for experimental.turbo
const nextConfig: NextConfig = {
  // Enable Turbopack with type assertion
  experimental: {
    turbo: {}
  } as any,
  reactStrictMode: true,
  // Image optimization settings
  images: {
    domains: ['vercel.com', 'localhost'],
  },
  // Environment variables
  env: {
    // Add any environment variables that should be available at build time
  },
  // Disable the default Next.js header
  poweredByHeader: false,
  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Webpack configuration (if needed)
  webpack: (config, { isServer }) => {
    // Add custom webpack configuration here if needed
    return config;
  },
  // Webpack 5 is the default in modern Next.js versions
};

export default nextConfig;
