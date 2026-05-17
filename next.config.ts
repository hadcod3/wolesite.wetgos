import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['utfs.io'],
  },
  allowedDevOrigins: ['192.168.1.4'],
};

export default nextConfig;