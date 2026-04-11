/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Temporarily disable PWA to fix build timeout
  // PWA will be re-enabled after UI is confirmed
};

module.exports = nextConfig;
