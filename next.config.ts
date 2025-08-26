import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-834493f602384983b24d24aa1d826186.r2.dev",
        port: "",
        pathname: "/products/**",
      },
    ],
  },
};

export default nextConfig;
