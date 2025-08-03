import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/generative-art-gallery' : '',
  assetPrefix: isProd ? '/generative-art-gallery/' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
