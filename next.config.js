/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    loader: 'akamai',
    path: '',
  },
};

module.exports = nextConfig;
