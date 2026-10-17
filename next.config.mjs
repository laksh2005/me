import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	output: "standalone",
	experimental: {
		mdxRs: true,
	},
	webpack: (config) => {
		config.ignoreWarnings = [
			{
				module: /@contentlayer\/core/,
			},
		];
		return config;
	},
	async redirects() {
		// Experience and Skills moved onto the landing page as sections.
		return [
			{ source: "/experience", destination: "/#experience", permanent: false },
			{ source: "/skills", destination: "/#skills", permanent: false },
			{ source: "/projects/duplex-sync-engine", destination: "/projects/parity", permanent: true },
			// Temporary, so swapping the Drive file later isn't cached by browsers.
			{
				source: "/cv",
				destination:
					"https://drive.google.com/file/d/1JW2KcuogppJjaL-eUldAqKWdJMHRXETP/view?usp=sharing",
				permanent: false,
			},
		];
	},
};

export default withContentlayer(nextConfig);
