/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "isnokncpnahtm398.public.blob.vercel-storage.com",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/sign-in": [
      `./node_modules/argon2/prebuilds/${process.env.ARGON2_PREBUILDS_GLOB || "**"}`,
    ],
  },
}

export default nextConfig
