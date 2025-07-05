import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  productionBrowserSourceMaps: false,
  typescript: { ignoreBuildErrors: false }
};

export default nextConfig;
