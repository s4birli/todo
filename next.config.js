/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      child_process: false,
    };
    return config;
  },
};
