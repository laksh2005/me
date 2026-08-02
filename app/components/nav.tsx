"use client";

import { useAudio } from "@/util/audioContext";
import { ArrowLeft, Home, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const links = [
	{ name: "Career", href: "/experience" },
	{ name: "Squad", href: "/skills" },
	{ name: "Trophies", href: "/projects" },
	{ name: "Press", href: "/blog" },
];

/** Broadcast HUD: live clock, section tabs, crowd audio toggle. */
export const Navigation: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const { isPlaying, togglePlayPause } = useAudio();
	const [minute, setMinute] = useState(0);

	// A ticking match clock. Purely decorative, but it makes the HUD feel live.
	useEffect(() => {
		const start = Date.now();
		const id = setInterval(() => {
			setMinute(Math.floor((Date.now() - start) / 1000) % 91);
		}, 1000);
		return () => clearInterval(id);
	}, []);

	const goBack = () => {
		if (typeof window !== "undefined" && window.history.length > 1) {
			router.back();
		} else {
			router.push("/");
		}
	};

	return (
		<div className="fixed inset-x-0 top-3 z-50 mx-auto w-max max-w-[calc(100vw-1rem)] px-2">
			<div className="flex items-center gap-1 rounded-full border border-emerald-400/25 bg-black/70 p-1 pr-1.5 shadow-[0_10px_40px_-12px_rgba(62,240,140,.4)] backdrop-blur-xl">
				{/* live clock */}
				<div className="ml-1 mr-1 hidden items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 sm:flex">
					<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,.7)]" />
					<span className="font-stadium text-xs font-bold tabular-nums tracking-widest text-emerald-200">
						{String(minute).padStart(2, "0")}′
					</span>
				</div>

				<button
					onClick={goBack}
					className="rounded-full p-2 text-emerald-200/60 transition-colors duration-200 hover:bg-emerald-500/15 hover:text-emerald-100"
					title="Go back"
				>
					<ArrowLeft size={16} />
				</button>

				<Link
					href="/"
					className="rounded-full p-2 text-emerald-200/60 transition-colors duration-200 hover:bg-emerald-500/15 hover:text-emerald-100"
					title="Back to the stadium"
				>
					<Home size={16} />
				</Link>

				<span className="mx-0.5 h-5 w-px bg-emerald-400/20" />

				<nav className="flex items-center">
					{links.map((l) => {
						const active = pathname?.startsWith(l.href);
						return (
							<Link
								key={l.href}
								href={l.href}
								className={`relative rounded-full px-2.5 py-1.5 font-stadium text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-200 md:px-3.5 md:text-sm ${
									active
										? "text-black"
										: "text-emerald-100/60 hover:text-emerald-100"
								}`}
							>
								{active && (
									<span className="absolute inset-0 rounded-full bg-kit-neon shadow-[0_0_18px_rgba(62,240,140,.55)]" />
								)}
								<span className="relative">{l.name}</span>
							</Link>
						);
					})}
				</nav>

				<span className="mx-0.5 h-5 w-px bg-emerald-400/20" />

				<button
					onClick={togglePlayPause}
					className="rounded-full p-2 text-emerald-200/60 transition-colors duration-200 hover:bg-emerald-500/15 hover:text-emerald-100"
					title={isPlaying ? "Mute the crowd" : "Unmute the crowd"}
				>
					{isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
				</button>
			</div>
		</div>
	);
};
