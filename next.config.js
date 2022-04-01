/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const { i18n } = require("./next-i18next.config");

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "staging-xs3.herokuapp.com",
      "snipshare-api-staging.herokuapp.com",
      "snipshare-api.herokuapp.com",
      "localhost",
    ],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  i18n,
});

module.exports = nextConfig;
