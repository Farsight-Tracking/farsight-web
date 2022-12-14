module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://farsight-names.de/api/:path*",
      },
    ];
  },
};
