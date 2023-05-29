/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    unoptimized: true,
    loader: 'akamai',
    path: '',
  },
};

module.exports = nextConfig;
