/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.yad2.co.il",
        // port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "assets.yad2.co.il",
      },
      {
        protocol: "https",
        hostname: "scontent.ftlv18-1.fna.fbcdn.net", // facebook
      },
      {
        protocol: "https",
        hostname: "lookaside.fbsbx.com", // facebook
      },
      {
        protocol: "https",
        hostname: "scontent.fhfa2-2.fna.fbcdn.net", // facebook
      },
    ],
  },
};

module.exports = nextConfig;
