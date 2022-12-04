/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
};

module.exports = nextConfig;
