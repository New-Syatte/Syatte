/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "phinf.pstatic.net",
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 512],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "syatte.vercel.app"],
    },
  },
  webpack: (config, { dev, isServer }) => {
    // react-toastify에 대한 소스맵 생성 비활성화
    config.module.rules.push({
      test: /react-toastify\.esm\.mjs$/,
      use: [
        {
          loader: "source-map-loader",
          options: {
            filterSourceMappingUrl: () => false,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
