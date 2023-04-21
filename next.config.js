/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dd1uwz8eu/image/upload/v1666604839/**'
      }
    ]
  },
}

module.exports = nextConfig
