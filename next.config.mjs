/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
			},
			{
				protocol: "https",
				hostname: "pub-cb85655592d24665bc6f3fb45e2c1ef7.r2.dev",
			},
		],
	},
};

export default nextConfig;
