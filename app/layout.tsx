import "../global.css";
import "./lk.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.laksh1.me"),
	title: {
		default: "Laksh Nijhawan · Software Engineer",
		template: "%s · Laksh Nijhawan",
	},
	description: "Software engineer taking products from zero to production. 40+ shipped, with internships at Byro and The Times of India.",
	openGraph: {
		title: "Laksh Nijhawan · Software Engineer",
		description: "Software engineer taking products from zero to production. 40+ shipped, with internships at Byro and The Times of India.",
		url: "https://www.laksh1.me",
		siteName: "Laksh Nijhawan",
		locale: "en_IN",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Laksh Nijhawan · Software Engineer",
		description: "Software engineer taking products from zero to production. 40+ shipped, with internships at Byro and The Times of India.",
		card: "summary_large_image",
		creator: "@laksh_2705",
	},
	icons: {
		shortcut: "/favicon.jpg",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

// Self hosted by next/font, so the mono face costs no extra network request
// and never flashes a fallback.
const mono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" data-theme="light" suppressHydrationWarning className={[inter.variable, mono.variable, calSans.variable].join(" ")}>
			<head>
				{/* Applies the theme before first paint so it never flashes: the
				    stored choice if there is one, otherwise light. Inline and
				    synchronous on purpose. */}
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){var t="light";try{var s=localStorage.getItem("ak-theme");if(s==="light"||s==="dark")t=s}catch(e){}document.documentElement.setAttribute("data-theme",t)})();`,
					}}
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500&display=swap"
				/>
				<Analytics />
			</head>
			<body className="relative">
				<div className="relative z-10">{children}</div>
				<VercelAnalytics />
			</body>
		</html>
	);
}
