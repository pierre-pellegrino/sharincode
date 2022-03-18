/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "staging-xs3.herokuapp.com",
      "snipshare-api-staging.herokuapp.com",
      "snipshare-api.herokuapp.com",
      "localhost"
    ],
  }
}

module.exports = nextConfig
