import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IntroPlayer } from "../components/intro-player";

export const metadata = {
	title: "Intro",
	description: "A short video intro from Laksh Nijhawan.",
	openGraph: {
		images: [{ url: "/laksh-intro-thumbnail.png" }],
		videos: [{ url: "/laksh-intro.mp4" }],
	},
};

export default function IntroPage() {
	return (
		<div className="ak-page">
			<Link href="/" className="ak-back">
				<ArrowLeft size={13} />
				Ask the system
			</Link>

			<header className="ak-page-head">
				<span className="ak-eyebrow">Intro</span>
				<h1 className="ak-title">Hi, I'm Laksh</h1>
				<p className="ak-sub">A quick intro, in my own words.</p>
			</header>

			<div className="mt-8">
				<IntroPlayer src="/laksh-intro.mp4" poster="/laksh-intro-thumbnail.png" />
			</div>
		</div>
	);
}
