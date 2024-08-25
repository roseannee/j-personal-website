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
}

export default nextConfig
