import type { NextConfig } from "next"
import { withPayload } from "@payloadcms/next/withPayload"

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@radix-ui/*",
      "react-icons/*",
      "@react-email",
      "@react-email/tailwind",
    ],
  },

  images: {
    dangerouslyAllowSVG: true,
  },

  async redirects() {
    return [
      {
        source: "/:path*/page",
        destination: "/:path*/page/1",
        permanent: true,
      },
    ]
  },

  //   logging: {
  //     fetches: {
  //       fullUrl: true,
  //     },
  //   },
}

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// })

// export default withBundleAnalyzerwithPayload(nextConfig))
export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
