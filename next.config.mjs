/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['res.cloudinary.com'],
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
};

export default nextConfig;
