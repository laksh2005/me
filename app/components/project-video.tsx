"use client";

import React, { useCallback, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

/**
 * Click-to-play demo video.
 *
 * `preload="none"` is the whole point: the browser fetches *nothing* until the
 * visitor actually presses play. The poster image carries the first paint, so
 * a heavy video never competes with the rest of the page for bandwidth on
 * load. (Autoplay was doing the opposite — pulling the entire file down on
 * every visit, whether or not anyone watched it.)
 *
 * Still muted + looping once started, so it behaves like an ambient demo
 * rather than something that ambushes you with sound.
 */
export const ProjectVideo: React.FC<{
	src: string;
	poster?: string;
	className?: string;
	label?: string;
}> = ({ src, poster, className = "", label = "Play demo" }) => {
	const ref = useRef<HTMLVideoElement>(null);
	const [started, setStarted] = useState(false);
	const [playing, setPlaying] = useState(false);

	const toggle = useCallback(() => {
		const el = ref.current;
		if (!el) return;

		if (el.paused) {
			// must be a property, not just the JSX attribute — browsers decide
			// playback eligibility at call time and the attribute can land late
			el.muted = true;
			const p = el.play();
			if (p && typeof p.catch === "function") p.catch(() => {});
			setStarted(true);
			setPlaying(true);
		} else {
			el.pause();
			setPlaying(false);
		}
	}, []);

	return (
		<div className="group relative">
			<video
				ref={ref}
				src={src}
				poster={poster}
				muted
				loop
				playsInline
				preload="none"
				onClick={toggle}
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				className={`cursor-pointer ${className}`}
			/>

			{/* Overlay: full cover before first play, a small corner control after.
			    Kept as a real <button> so it's keyboard reachable. */}
			<button
				type="button"
				onClick={toggle}
				aria-label={playing ? "Pause demo" : label}
				className={
					started
						? "absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
						: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/35 transition-colors duration-300 hover:bg-black/25"
				}
			>
				{started ? (
					playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />
				) : (
					<>
						<span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/50 backdrop-blur transition-transform duration-300 group-hover:scale-105">
							<Play size={22} className="ml-1 text-white" fill="currentColor" />
						</span>
						<span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
							{label}
						</span>
					</>
				)}
			</button>
		</div>
	);
};
