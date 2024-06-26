/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.sanity.io",
      "k.kakaocdn.net",
      "lh3.googleusercontent.com",
      "phinf.pstatic.net",
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 512],
  },
  experimental: {
    // serverActions 기능을 활성화합니다.
    serverActions: true,
    concurrentFeatures: true,
  },
};

module.exports = nextConfig;
