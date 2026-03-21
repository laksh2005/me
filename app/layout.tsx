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
		description: "more than an engineer",
		url: "laksh1.me",
		siteName: "laksh nijhawan",
		images: [
			{
				url: "/https://media.discordapp.net/attachments/1114085620516659281/1484767081030226010/banner-portfolio.png?ex=69bf6c99&is=69be1b19&hm=37dcbb5c8d2f5e5e483a7c89f743100f6a237739442646b93da0b4a6b256d65b&=&format=webp&quality=lossless&width=1488&height=837",
				width: 1920,
				height: 1091,
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
