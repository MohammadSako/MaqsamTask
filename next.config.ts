import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logos.skyscnr.com",
        pathname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost",
        "localhost:3000",
        "sky-scrapper.p.rapidapi.com",
        "logos.skyscnr.com",
        "spotterflight.vercel.app/",
      ],
    },
  },
};

export default nextConfig;
