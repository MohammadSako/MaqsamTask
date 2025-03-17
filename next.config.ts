import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maqsam-task-gamma.vercel.app",
        pathname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost",
        "localhost:3000",
        "maqsam-task-gamma.vercel.app/",
      ],
    },
  },
};

export default nextConfig;
