import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { AudioProvider } from "@/util/audioContext";

export const metadata: Metadata = {
	title: {
		default: "Hi, I'm Laksh",
		template: "laksh1.me",
	},
	description: "",
	openGraph: {
		title: "laksh1.me",
		description: "dev, ai, programming",
		url: "laksh1.me",
		siteName: "laksh nijhawan",
		images: [
			{
				url: "https://pbs.twimg.com/profile_images/2004531799670886400/saRZ-rxa_400x400.jpg",
				width: 1080,
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
		title: "laksh_2705",
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
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				<AudioProvider>

					{children}
				</AudioProvider>
				<VercelAnalytics />
			</body>
		</html>
	);
}
