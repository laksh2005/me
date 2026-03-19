"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
} from "react";

interface AudioContextType {
	isPlaying: boolean;
	togglePlayPause: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const MIN_VOLUME = 0.03;
const FADE_DURATION = 1200;

export function AudioProvider({ children }: { children: React.ReactNode }) {
	const [isPlaying, setIsPlaying] = useState(true);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const unlockedRef = useRef(false);
	const rafRef = useRef<number | null>(null);

	// fade helper
	const fadeVolume = (target: number, duration: number) => {
		if (!audioRef.current) return;

		const start = audioRef.current.volume;
		const startTime = Date.now();

		const animate = () => {
			if (!audioRef.current) return;

			const progress = Math.min((Date.now() - startTime) / duration, 1);
			audioRef.current.volume = start + (target - start) * progress;

			if (progress < 1) {
				rafRef.current = requestAnimationFrame(animate);
			}
		};

		animate();
	};

	// init audio
	useEffect(() => {
		const audio = new Audio("/song2.mp3");
		audio.loop = true;
		audio.volume = 0;
		audio.preload = "auto";

		audioRef.current = audio;

		// try autoplay (desktop works mostly)
		audio
			.play()
			.then(() => {
				unlockedRef.current = true;
				fadeVolume(MIN_VOLUME, FADE_DURATION);
			})
			.catch(() => {
				// expected on mobile
			});

		return () => {
			rafRef.current && cancelAnimationFrame(rafRef.current);
			audio.pause();
		};
	}, []);

	// 🔑 unlock on first interaction (mobile + safari fix)
	useEffect(() => {
		const unlock = () => {
			if (!audioRef.current || unlockedRef.current) return;

			audioRef.current
				.play()
				.then(() => {
					unlockedRef.current = true;
					fadeVolume(MIN_VOLUME, FADE_DURATION);
				})
				.catch(() => {});

			window.removeEventListener("click", unlock);
			window.removeEventListener("touchstart", unlock);
		};

		window.addEventListener("click", unlock);
		window.addEventListener("touchstart", unlock);

		return () => {
			window.removeEventListener("click", unlock);
			window.removeEventListener("touchstart", unlock);
		};
	}, []);

	const togglePlayPause = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			fadeVolume(0, 600);
			setTimeout(() => audioRef.current?.pause(), 600);
		} else {
			audioRef.current.play().then(() => {
				fadeVolume(MIN_VOLUME, FADE_DURATION);
			});
		}

		setIsPlaying((prev) => !prev);
	};

	return (
		<AudioContext.Provider value={{ isPlaying, togglePlayPause }}>
			{children}
		</AudioContext.Provider>
	);
}

export function useAudio() {
	const ctx = useContext(AudioContext);
	if (!ctx) throw new Error("useAudio must be used within AudioProvider");
	return ctx;
}
