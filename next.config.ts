/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/finish/:playerId",
        destination: "/api/finish/playerId__",
      },
    ];
  },
};

module.exports = nextConfig;
