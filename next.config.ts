import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/feed.xml', destination: '/rss' },
    ]
  },
  async redirects() {
    return [
      { source: '/shed', destination: '/tools', permanent: true },
      { source: '/shed/:slug*', destination: '/tools/:slug*', permanent: true },
    ]
  },
  images: {
    localPatterns: [{ pathname: '/photos/**' }],
  },
}

export default nextConfig
