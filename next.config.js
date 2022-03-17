/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["snipshare-api-staging.herokuapp.com", "snipshare-api.herokuapp.com", "staging-xs3.herokuapp.com"],
  }
}

module.exports = nextConfig
