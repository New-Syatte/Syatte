/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  experimental: {
    // serverActions 기능을 활성화합니다.
    serverActions: true,
    concurrentFeatures: true,
  },
};

module.exports = nextConfig;
