/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "event-api.chebarash.uz",
      },
    ],
  },
};

export default nextConfig;
