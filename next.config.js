const { withContentCollections } = require("@content-collections/next");
// import createMDX from "@next/mdx";
const createMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withMDX = createMDX({});

// withContentCollections must be the outermost plugin
module.exports = withContentCollections(withMDX(nextConfig))
