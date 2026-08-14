"use client";

import React, { useEffect, useRef } from "react";

/**
 * Autoplaying, looping, muted demo video.
 *
 * Two things browsers are strict about, both handled here:
 *  - `muted` must be set as a DOM *property*, not just a JSX attribute. React
 *    can emit the attribute after the element is created, and Chrome/Safari
 *    evaluate autoplay eligibility at creation — so the attribute alone
 *    intermittently fails and the video silently never starts. Setting
 *    `.muted = true` in an effect (before calling play) makes it reliable.
 *  - `playsInline` stops iOS Safari hijacking it into fullscreen playback.
 *
 * Playback is also paused while offscreen, so a 14 MB file isn't decoding
 * behind content the visitor isn't looking at.
 */
export const ProjectVideo: React.FC<{
	src: string;
	poster?: string;
	className?: string;
}> = ({ src, poster, className = "" }) => {
	const ref = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// must be a property, not just the attribute — see note above
		el.muted = true;
		el.defaultMuted = true;

		const tryPlay = () => {
			const p = el.play();
			// Autoplay can still be refused (power saving, strict settings).
			// Swallow it: the controls-less poster stays visible rather than
			// throwing an unhandled rejection.
			if (p && typeof p.catch === "function") p.catch(() => {});
		};

		tryPlay();

		// don't decode while scrolled away
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) tryPlay();
				else el.pause();
			},
			{ threshold: 0.15 },
		);
		io.observe(el);

		return () => io.disconnect();
	}, []);

	return (
		<video
			ref={ref}
			src={src}
			poster={poster}
			autoPlay
			muted
			loop
			playsInline
			preload="metadata"
			aria-label="Project demo"
			className={className}
		/>
	);
};
