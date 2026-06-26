import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@napi-rs/canvas", "sharp"],
  experimental: {
    serverActions: {
      // Resume uploads up to 10 MB (see lib/services/resume/validation.ts).
      bodySizeLimit: "12mb",
    },
  },
};

export default nextConfig;
