"use client";

import React, { useEffect, useRef } from "react";

/**
 * One backdrop for the entire site — mounted once in the root layout, not
 * per-page. `position: fixed` means it's always sized to exactly the
 * viewport, so pointer coordinates (also viewport-relative) never drift out
 * of alignment no matter how far the page has scrolled. Earlier attempts
 * that mounted a copy per page/section, or used `absolute` on a container
 * taller than one screen, broke this alignment; a single fixed layer sidesteps
 * the whole bug class and — just as important — gives every page the same
 * visual identity instead of a different treatment per route.
 */
export default function GlobalBackdrop() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (!window.matchMedia("(pointer: fine)").matches) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		let raf = 0;
		let cx = window.innerWidth / 2;
		let cy = window.innerHeight * 0.4;
		let tx = cx;
		let ty = cy;

		const onMove = (e: PointerEvent) => {
			tx = e.clientX;
			ty = e.clientY;
		};
		window.addEventListener("pointermove", onMove, { passive: true });

		const tick = () => {
			cx += (tx - cx) * 0.075;
			cy += (ty - cy) * 0.075;
			el.style.setProperty("--mx", `${cx.toFixed(1)}px`);
			el.style.setProperty("--my", `${cy.toFixed(1)}px`);
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		return () => {
			window.removeEventListener("pointermove", onMove);
			cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className="gb-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden"
		>
			<div className="gb-grid absolute inset-0" />
			<div className="gb-wash absolute inset-0" />
			<div className="gb-spot absolute inset-0" />
			<div className="gb-vignette absolute inset-0" />
		</div>
	);
}
