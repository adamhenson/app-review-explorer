/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['postcss-loader'],
      },
    },
  },
  transpilePackages: ['@app-review-explorer/ui'],
  env: {
    REVIEWS_API_URL: process.env.REVIEWS_API_URL,
  },
};

module.exports = nextConfig;
