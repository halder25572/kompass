/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "kompas5.thenightowl.team",
      },
      {
        protocol: "https",
        hostname: "kompas5.thenightowl.team",
      },
    ],
  },
};

module.exports = nextConfig;