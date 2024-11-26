/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['hapariciop.uk'],
  },
  assetPrefix: 'https://hapariciop.uk',
}

module.exports = nextConfig
