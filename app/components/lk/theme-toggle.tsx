"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Theme toggle with a circle reveal that grows out of the button.
 *
 * The effect follows Skiper UI's theme toggle (skiper-ui.com/v1/skiper26),
 * itself adapted from rudrodip/theme-toggle-effect, rebuilt here on the
 * site's existing `data-theme` attribute instead of next-themes. Browsers
 * without the View Transition API, or visitors who prefer reduced motion,
 * get an instant switch.
 */

const STORAGE_KEY = "lk-theme";
type Theme = "light" | "dark";

export function ThemeToggle() {
	const ref = useRef<HTMLButtonElement>(null);
	const [theme, setTheme] = useState<Theme | null>(null);

	useEffect(() => {
		setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
	}, []);

	const toggle = useCallback(() => {
		const next: Theme = theme === "dark" ? "light" : "dark";
		const apply = () => {
			document.documentElement.setAttribute("data-theme", next);
			setTheme(next);
			try {
				localStorage.setItem(STORAGE_KEY, next);
			} catch {
				// Storage blocked: the switch still works for this visit.
			}
		};

		const doc = document as Document & {
			startViewTransition?: (cb: () => void) => { ready: Promise<void> };
		};
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!doc.startViewTransition || reduce || !ref.current) {
			apply();
			return;
		}

		const { left, top, width, height } = ref.current.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

		doc.startViewTransition(apply).ready.then(() => {
			document.documentElement.animate(
				{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
				{ duration: 550, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
			);
		});
	}, [theme]);

	return (
		<button
			ref={ref}
			type="button"
			onClick={toggle}
			className="lk-toggle"
			aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
			title="Toggle theme"
		>
			{theme === "dark" ? <Sun size={14} strokeWidth={1.9} /> : <Moon size={14} strokeWidth={1.9} />}
		</button>
	);
}
