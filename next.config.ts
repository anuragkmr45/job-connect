import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'shillonglawcollege.in']
  },
  productionBrowserSourceMaps: false,
  typescript: { ignoreBuildErrors: false }
};

export default nextConfig;
