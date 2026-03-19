"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition() {
	const pathname = usePathname();
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (!pathname) return;

		setActive(true);
		const t = setTimeout(() => setActive(false), 1500);
		return () => clearTimeout(t);
	}, [pathname]);

	return (
		<div
			aria-hidden="true"
			className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden ${
				active ? "opacity-100" : "opacity-0"
			} transition-opacity duration-300`}
		>
			{/* BASE FLASH */}
			<div
				className={`absolute inset-0 bg-white ${active ? "animate-flash" : ""}`}
			/>

			{/* DARK VIGNETTE */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(circle at center, rgba(255,255,255,0.2), rgba(0,0,0,0.95))",
				}}
			/>

			{/* STATIC NOISE */}
			<div className="absolute inset-0 noise" />

			{/* SCANLINES */}
			<div className="absolute inset-0 scanlines" />

			{/* GLITCH BARS */}
			<div className="absolute inset-0 glitch-bars" />
		</div>
	);
}
