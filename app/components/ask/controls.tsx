"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/util/audioContext";

/**
 * The two navbar toggles.
 *
 * Both are deliberately hand rolled rather than pulled from a component kit:
 * the music one has to drive the existing AudioProvider that already runs
 * sitewide, and the theme one would otherwise mean adding next themes for what
 * is a single attribute on <html>.
 */

const STORAGE_KEY = "ak-theme";

export function ThemeToggle() {
	// Starts null so the first render matches the server exactly. The real
	// value is applied before paint by the inline script in layout.tsx, so
	// reading it here is only about keeping the icon in sync.
	const [theme, setTheme] = useState<"dark" | "light" | null>(null);

	useEffect(() => {
		const current =
			(document.documentElement.getAttribute("data-theme") as
				| "dark"
				| "light"
				| null) ?? "dark";
		setTheme(current);
	}, []);

	const toggle = useCallback(() => {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		document.documentElement.setAttribute("data-theme", next);
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Private mode or blocked storage. The toggle still works for this
			// visit, it just will not be remembered, which is a fine outcome.
		}
	}, [theme]);

	return (
		<button
			type="button"
			onClick={toggle}
			className="ak-ctrl"
			aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
			title="Toggle theme"
		>
			{theme === "light" ? <Moon size={17} strokeWidth={1.9} /> : <Sun size={17} strokeWidth={1.9} />}
		</button>
	);
}

export function MusicToggle() {
	const { isPlaying, togglePlayPause } = useAudio();

	return (
		<button
			type="button"
			onClick={togglePlayPause}
			className={`ak-ctrl ${isPlaying ? "is-on" : ""}`}
			aria-label={isPlaying ? "Mute music" : "Play music"}
			title={isPlaying ? "Mute music" : "Play music"}
		>
			{isPlaying ? <Volume2 size={17} strokeWidth={1.9} /> : <VolumeX size={17} strokeWidth={1.9} />}
		</button>
	);
}
