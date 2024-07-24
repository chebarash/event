/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
