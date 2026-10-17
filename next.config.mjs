/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	async redirects() {
		// Experience and Skills moved onto the landing page as sections.
		return [
			{ source: "/experience", destination: "/#experience", permanent: false },
			{ source: "/skills", destination: "/#skills", permanent: false },
			{ source: "/projects/duplex-sync-engine", destination: "/projects/parity", permanent: true },
			{ source: "/blog/shipping-35-products-lessons", destination: "/blog/shipping-40-products-lessons", permanent: true },
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

export default nextConfig;
