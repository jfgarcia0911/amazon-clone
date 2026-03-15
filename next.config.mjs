/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["m.media-amazon.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "amber-decisive-alligator-189.mypinata.cloud",
			},
		],
		unoptimized: true,
	},
};

export default nextConfig;
