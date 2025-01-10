const { withContentCollections } = require("@content-collections/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true  
}

// withContentCollections must be the outermost plugin
module.exports = withContentCollections(nextConfig)
