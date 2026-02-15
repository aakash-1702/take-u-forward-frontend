/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://basecase-backend.onrender.com/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;