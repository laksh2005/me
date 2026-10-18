import React from "react";
import Link from "next/link";
import { IntroPlayer } from "../components/intro-player";
import { PageHead, Shell } from "../components/lk/shell";

export const metadata = {
	title: "Intro",
	description: "A 60 second video intro from Laksh Nijhawan.",
	// Reachable by direct link only: not linked from the site or indexed.
	robots: { index: false, follow: false },
	openGraph: {
		images: [{ url: "/laksh-intro-thumbnail.png" }],
		videos: [{ url: "/laksh-intro.mp4" }],
	},
};

export default function IntroPage() {
	return (
		<Shell>
			<PageHead
				eyebrow="60 sec intro"
				title="Hi, I'm Laksh"
				lead="Who I am, what I build and what I'm looking for, in about a minute."
			/>

			<div className="lk-media">
				<IntroPlayer src="/laksh-intro.mp4" poster="/laksh-intro-thumbnail.png" />
			</div>

			<p className="lk-lead" style={{ marginTop: 22 }}>
				Want the long version? See{" "}
				<Link className="lk-u" href="/projects/parity">how I built Parity</Link> or grab my{" "}
				<a className="lk-u" href="/cv" target="_blank" rel="noopener noreferrer">CV</a>.
			</p>
		</Shell>
	);
}
