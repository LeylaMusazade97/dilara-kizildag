import type { NextConfig } from "next";

const canonicalOrigin = "https://dilarakizildag.com";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "dilara-kizildag-xr1l.vercel.app" }],
        destination: `${canonicalOrigin}/:path*`,
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "dilara-kizildag-xr1l.vercel.app" }],
        destination: canonicalOrigin,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
