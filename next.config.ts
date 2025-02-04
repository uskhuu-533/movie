import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/webp',
        search: '',
      },
    ],
  },
};

export default nextConfig;
