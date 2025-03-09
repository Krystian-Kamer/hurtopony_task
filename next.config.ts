import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
        pathname: '/t/p/**',
      },
    ],
  },
};

export default nextConfig;
