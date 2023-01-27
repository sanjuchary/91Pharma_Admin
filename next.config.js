const { object } = require("yup");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverComponents: true,
  images: {
    domains: ["pillbox-media.s3.ap-south-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
