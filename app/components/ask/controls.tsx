"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * The navbar theme toggle. Hand rolled rather than adding next-themes for
 * what is a single attribute on <html>.
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
