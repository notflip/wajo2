import type { NextConfig } from "next"
import { withPayload } from "@payloadcms/next/withPayload"

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@radix-ui/*",
      "@react-email",
      "@react-email/tailwind",
    ],
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default withPayload(nextConfig)
