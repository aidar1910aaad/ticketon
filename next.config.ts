import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🔥 Отключает ESLint при билде (next build)
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

