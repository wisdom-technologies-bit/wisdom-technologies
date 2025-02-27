/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EDGEDB_DSN: process.env.EDGEDB_DSN,
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  },
  transpilePackages: ["framer-motion"],
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

