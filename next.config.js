/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "s4.anilist.co",
            port: '',
            pathname: '/file/anilistcdn/media/anime/**',
          },
          {
            protocol: 'https',
            hostname: "s4.anilist.co",
            port: '',
            pathname: '/file/anilistcdn/media/manga/**',
          },
        ],
      },
}

module.exports = nextConfig
