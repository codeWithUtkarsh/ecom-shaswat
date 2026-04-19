/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'images.pexels.com'],
  },
  async rewrites() {
    const apiUrl = process.env.BACKEND_URL || 'http://localhost:4000';
    return [
      {
        source: '/proxy-api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
