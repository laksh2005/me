"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	Maximize,
	Minimize,
	Pause,
	Play,
	RotateCcw,
	RotateCw,
	SkipBack,
	SkipForward,
	Volume1,
	Volume2,
	VolumeX,
} from "lucide-react";

/**
 * Intro video with its own controls.
 *
 * Starts unmuted at a low volume: playback only begins on a click, which the
 * browser counts as a user gesture, so sound is allowed and nobody gets
 * blasted. `preload="metadata"` fetches just enough for the duration while
 * the poster carries the first paint.
 *
 * Keys: space/k play, ←/→ or j/l 5s, Home/End jump, m mute, f fullscreen.
 */

const STEP = 5;
const DEFAULT_VOLUME = 0.3;
const HIDE_AFTER_MS = 2500;

function fmt(t: number) {
	if (!Number.isFinite(t) || t < 0) t = 0;
	const m = Math.floor(t / 60);
	const s = Math.floor(t % 60);
	return `${m}:${s.toString().padStart(2, "0")}`;
}

export const IntroPlayer: React.FC<{ src: string; poster: string }> = ({
	src,
	poster,
}) => {
	const wrap = useRef<HTMLDivElement>(null);
	const video = useRef<HTMLVideoElement>(null);
	const hideTimer = useRef<ReturnType<typeof setTimeout>>();

	const [started, setStarted] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [time, setTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [buffered, setBuffered] = useState(0);
	const [muted, setMuted] = useState(false);
	const [volume, setVolume] = useState(DEFAULT_VOLUME);
	const [fullscreen, setFullscreen] = useState(false);
	const [idle, setIdle] = useState(false);

	useEffect(() => {
		if (video.current) video.current.volume = DEFAULT_VOLUME;
	}, []);

	const poke = useCallback(() => {
		setIdle(false);
		clearTimeout(hideTimer.current);
		hideTimer.current = setTimeout(() => setIdle(true), HIDE_AFTER_MS);
	}, []);

	const togglePlay = useCallback(() => {
		const el = video.current;
		if (!el) return;
		if (el.paused || el.ended) {
			const p = el.play();
			if (p && typeof p.catch === "function") p.catch(() => {});
			setStarted(true);
		} else {
			el.pause();
		}
		poke();
	}, [poke]);

	const seekTo = useCallback(
		(t: number) => {
			const el = video.current;
			if (!el) return;
			const d = el.duration || 0;
			el.currentTime = Math.min(Math.max(t, 0), d ? d - 0.05 : 0);
			setTime(el.currentTime);
			setStarted(true);
			poke();
		},
		[poke],
	);

	const skip = useCallback(
		(by: number) => seekTo((video.current?.currentTime ?? 0) + by),
		[seekTo],
	);

	const toggleMute = useCallback(() => {
		const el = video.current;
		if (!el) return;
		el.muted = !el.muted;
		if (!el.muted && el.volume === 0) el.volume = DEFAULT_VOLUME;
		poke();
	}, [poke]);

	const changeVolume = useCallback((v: number) => {
		const el = video.current;
		if (!el) return;
		el.volume = v;
		el.muted = v === 0;
	}, []);

	const toggleFullscreen = useCallback(() => {
		const node = wrap.current;
		if (!node) return;
		if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
		else node.requestFullscreen?.().catch(() => {});
	}, []);

	useEffect(() => {
		const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
		document.addEventListener("fullscreenchange", onFs);
		return () => {
			document.removeEventListener("fullscreenchange", onFs);
			clearTimeout(hideTimer.current);
		};
	}, []);

	const onKey = (e: React.KeyboardEvent) => {
		if ((e.target as HTMLElement).tagName === "INPUT" && e.key !== " ") return;
		const d = video.current?.duration ?? 0;
		const map: Record<string, () => void> = {
			" ": togglePlay,
			k: togglePlay,
			ArrowLeft: () => skip(-STEP),
			j: () => skip(-STEP),
			ArrowRight: () => skip(STEP),
			l: () => skip(STEP),
			Home: () => seekTo(0),
			End: () => seekTo(d),
			m: toggleMute,
			f: toggleFullscreen,
		};
		const fn = map[e.key];
		if (fn) {
			e.preventDefault();
			fn();
		}
	};

	const pct = duration ? (time / duration) * 100 : 0;
	const bufPct = duration ? (buffered / duration) * 100 : 0;
	const showControls = !playing || !idle;
	const VolIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

	const btn =
		"grid h-9 w-9 place-items-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

	return (
		<div
			ref={wrap}
			tabIndex={0}
			onKeyDown={onKey}
			onMouseMove={poke}
			onMouseLeave={() => playing && setIdle(true)}
			className={`group relative overflow-hidden bg-black outline-none focus-visible:ring-2 focus-visible:ring-[var(--ak-accent)] ${
				fullscreen ? "h-screen w-screen" : "aspect-video w-full rounded-xl border border-[var(--ak-line)]"
			} ${showControls ? "" : "cursor-none"}`}
			aria-label="Intro video player"
		>
			<video
				ref={video}
				src={src}
				poster={poster}
				preload="metadata"
				playsInline
				className="h-full w-full object-contain"
				onClick={togglePlay}
				onDoubleClick={toggleFullscreen}
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				onEnded={() => {
					setPlaying(false);
					setIdle(false);
				}}
				onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
				onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
				onDurationChange={(e) => setDuration(e.currentTarget.duration)}
				onProgress={(e) => {
					const b = e.currentTarget.buffered;
					if (b.length) setBuffered(b.end(b.length - 1));
				}}
				onVolumeChange={(e) => {
					setMuted(e.currentTarget.muted);
					setVolume(e.currentTarget.volume);
				}}
			/>

			{!started && (
				<button
					type="button"
					onClick={togglePlay}
					aria-label="Play intro"
					className="absolute inset-0 grid place-items-center bg-black/20 transition hover:bg-black/10"
				>
					<span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-black shadow-xl transition group-hover:scale-105">
						<Play size={26} className="ml-1" fill="currentColor" />
					</span>
				</button>
			)}

			{started && (
				<div
					className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-2 pt-10 transition-opacity duration-300 sm:px-4 ${
						showControls ? "opacity-100" : "pointer-events-none opacity-0"
					}`}
				>
					{/* seek bar */}
					<div className="relative mb-1 h-4">
						<div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/20">
							<div className="absolute inset-y-0 left-0 bg-white/30" style={{ width: `${bufPct}%` }} />
							<div className="absolute inset-y-0 left-0 bg-[var(--ak-accent)]" style={{ width: `${pct}%` }} />
						</div>
						<input
							type="range"
							min={0}
							max={duration || 0}
							step={0.1}
							value={time}
							onChange={(e) => seekTo(Number(e.target.value))}
							aria-label="Seek"
							aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
							className="intro-range absolute inset-0 w-full"
						/>
					</div>

					<div className="flex items-center gap-0.5 sm:gap-1">
						<button type="button" className={`${btn} hidden sm:grid`} onClick={() => seekTo(0)} aria-label="Go to start" title="Start (Home)">
							<SkipBack size={17} />
						</button>
						<button type="button" className={btn} onClick={() => skip(-STEP)} aria-label="Back 5 seconds" title="Back 5s (←)">
							<span className="relative grid place-items-center">
								<RotateCcw size={19} />
								<span className="absolute text-[7px] font-semibold">5</span>
							</span>
						</button>
						<button type="button" className={`${btn} h-10 w-10`} onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} title="Play/Pause (Space)">
							{playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
						</button>
						<button type="button" className={btn} onClick={() => skip(STEP)} aria-label="Forward 5 seconds" title="Forward 5s (→)">
							<span className="relative grid place-items-center">
								<RotateCw size={19} />
								<span className="absolute text-[7px] font-semibold">5</span>
							</span>
						</button>
						<button type="button" className={`${btn} hidden sm:grid`} onClick={() => seekTo(duration)} aria-label="Go to end" title="End (End)">
							<SkipForward size={17} />
						</button>

						<div className="group/vol ml-1 flex items-center">
							<button type="button" className={btn} onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} title="Mute (M)">
								<VolIcon size={18} />
							</button>
							<input
								type="range"
								min={0}
								max={1}
								step={0.05}
								value={muted ? 0 : volume}
								onChange={(e) => changeVolume(Number(e.target.value))}
								aria-label="Volume"
								className="intro-range intro-vol hidden w-0 opacity-0 transition-all duration-200 group-hover/vol:w-20 group-hover/vol:opacity-100 focus:w-20 focus:opacity-100 sm:block"
								style={{ ["--fill" as string]: `${(muted ? 0 : volume) * 100}%` }}
							/>
						</div>

						<span className="ml-2 font-mono text-[11px] tabular-nums text-white/80 sm:text-xs">
							{fmt(time)} <span className="text-white/40">/ {fmt(duration)}</span>
						</span>

						<button type="button" className={`${btn} ml-auto`} onClick={toggleFullscreen} aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"} title="Fullscreen (F)">
							{fullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
