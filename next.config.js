/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.sanity.io' // if you're using Sanity
    ]
  }
}

module.exports = nextConfig 