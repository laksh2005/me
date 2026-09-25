"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@$%&";

function useGlitch(text: string, running: boolean) {
	const [output, setOutput] = useState(text);

	useEffect(() => {
		if (!running) { setOutput(text); return; }
		let frame = 0;
		const letters = text.split("");
		const interval = setInterval(() => {
			setOutput(
				letters
					.map((ch, i) => {
						if (ch === " ") return " ";
						if (i < frame / 3) return letters[i];
						return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
					})
					.join(""),
			);
			if (frame > letters.length * 3) clearInterval(interval);
			frame++;
		}, 28);
		return () => clearInterval(interval);
	}, [text, running]);

	return output;
}

const ROUTES = [
	{ label: "Ask the system", href: "/" },
	{ label: "Projects", href: "/projects" },
	{ label: "Writing", href: "/blog" },
	{ label: "Contact", href: "/contact" },
];

export default function NotFound() {
	const [glitching, setGlitching] = useState(false);
	const [tick, setTick] = useState(0);

	const heading = useGlitch("404", glitching);

	useEffect(() => {
		const t = setTimeout(() => setGlitching(true), 400);
		return () => clearTimeout(t);
	}, []);

	useEffect(() => {
		const id = setInterval(() => {
			setTick((n) => n + 1);
			if (Math.random() < 0.18) setGlitching(true);
			else setGlitching(false);
		}, 2200);
		return () => clearInterval(id);
	}, []);

	return (
		<div className="nf-root">
			<div className="nf-inner">
				<div className="nf-code" aria-label="404">
					{heading}
				</div>

				<p className="nf-label">PAGE_NOT_FOUND</p>

				<p className="nf-msg">
					This route does not exist. The system only knows what it was built to know.
				</p>

				<div className="nf-routes">
					{ROUTES.map((r) => (
						<Link key={r.href} href={r.href} className="nf-route">
							<span className="nf-route-caret">/</span>
							{r.label}
						</Link>
					))}
				</div>

				<Link href="/" className="nf-home">
					Back to start
				</Link>
			</div>

			{/* ambient scanline grid */}
			<div className="nf-grid" aria-hidden />
		</div>
	);
}
