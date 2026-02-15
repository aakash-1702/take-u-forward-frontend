/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // ← Match /api/v1/...
        destination: "https://basecase-backend.onrender.com/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
