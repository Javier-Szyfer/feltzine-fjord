/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/public/",
          outputPath: "/public/",
          name: "[name].[ext]",
          esModule: false,
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
