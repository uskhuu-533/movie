import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  images: {
    domains : [`image.tmdb.org`],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
        search: '',
    
      },
    ],
  },

};

export default nextConfig;
