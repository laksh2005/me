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
	description:
		"Product-focused engineer building end-to-end systems that turn ideas into real, usable products.",
	openGraph: {
		title: "Laksh Nijhawan · Product-focused engineer",
		description:
			"Product-focused engineer building end-to-end systems that turn ideas into real, usable products.",
		url: "https://www.laksh1.me",
		siteName: "Laksh Nijhawan",
		images: [
			{
				url: "https://pbs.twimg.com/media/HD6GC49boAA0yaZ?format=jpg&name=900x900",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-In",
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
		title: "Laksh Nijhawan",
		card: "summary_large_image",
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
