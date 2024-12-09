// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/homepage', // This will serve homepage.tsx as the root
      },
    ];
  },
};

export default nextConfig;
