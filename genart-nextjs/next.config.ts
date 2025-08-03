import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/generative-art-gallery',
  assetPrefix: '/generative-art-gallery/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
