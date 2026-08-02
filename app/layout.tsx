import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { AudioProvider } from "@/util/audioContext";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.laksh1.me"),
	title: {
		default: "Hi, I'm Laksh",
		template: "laksh1.me",
	},
	description: "",
	openGraph: {
		title: "laksh1.me",
		description: "working is the moat",
		url: "laksh1.me",
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
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<head>
				<Analytics />
			</head>
			<body className="bg-[#02100a] text-emerald-50">
				<AudioProvider>

					{children}
				</AudioProvider>
				<VercelAnalytics />
			</body>
		</html>
	);
}
