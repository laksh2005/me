"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GitHubIcon, GlobeIcon } from "./icons";

export interface ProjectRow {
	slug: string;
	name: string;
	icon: string;
	image: string;
	metric?: string;
	oneLiner: string;
	github?: string;
	live?: string;
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Project rows with a small screenshot that trails the cursor while a row is
 * hovered. Pointer devices only: on touch screens nothing follows a finger,
 * so the preview simply never shows.
 */
export function ProjectList({ items }: { items: ProjectRow[] }) {
	const [active, setActive] = useState<string | null>(null);
	const preview = useRef<HTMLDivElement>(null);
	const target = useRef({ x: 0, y: 0 });
	const pos = useRef({ x: 0, y: 0 });
	const canHover = useRef(false);

	useEffect(() => {
		canHover.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
		let raf = 0;
		const tick = () => {
			// Ease towards the cursor so the card trails it slightly.
			pos.current.x += (target.current.x - pos.current.x) * 0.18;
			pos.current.y += (target.current.y - pos.current.y) * 0.18;
			if (preview.current) {
				preview.current.style.transform = `translate3d(${pos.current.x + 18}px, ${pos.current.y + 18}px, 0)`;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	const onEnter = (slug: string) => (e: React.MouseEvent) => {
		if (!canHover.current) return;
		if (!active) pos.current = { x: e.clientX, y: e.clientY };
		target.current = { x: e.clientX, y: e.clientY };
		setActive(slug);
	};
	const onMove = (slug: string) => (e: React.MouseEvent) => {
		target.current = { x: e.clientX, y: e.clientY };
		if (active !== slug) onEnter(slug)(e);
	};

	const current = items.find((p) => p.slug === active);

	return (
		<>
			{items.map((p) => (
				<div
					key={p.slug}
					className="lk-proj"
					onMouseEnter={onEnter(p.slug)}
					onMouseMove={onMove(p.slug)}
					onMouseLeave={() => setActive(null)}
				>
					<Link href={`/projects/${p.slug}`} className="lk-tile" aria-hidden tabIndex={-1}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={p.icon} alt="" />
					</Link>
					<Link href={`/projects/${p.slug}`} className="t">
						<b>{p.name}</b>
						{p.metric && <span className="lk-m">{p.metric}</span>}
						<small>{p.oneLiner}</small>
					</Link>
					<div className="lk-icons">
						{p.github && (
							<a href={p.github} {...ext} aria-label={`${p.name} on GitHub`}>
								<GitHubIcon className="lk-ico" />
							</a>
						)}
						{p.live && (
							<a href={p.live} {...ext} aria-label={`${p.name} website`}>
								<GlobeIcon className="lk-ico" />
							</a>
						)}
					</div>
				</div>
			))}

			<div ref={preview} className={`lk-peek${current ? " on" : ""}`} aria-hidden>
				{items.map((p) => (
					// eslint-disable-next-line @next/next/no-img-element
					<img key={p.slug} src={p.image} alt="" className={p.slug === active ? "on" : ""} />
				))}
			</div>
		</>
	);
}
