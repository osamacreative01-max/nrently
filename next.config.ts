import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.nrently.pk",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;