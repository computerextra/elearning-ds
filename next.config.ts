import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: true,
    inlineCss: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
