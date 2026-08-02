"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Smartphone } from "lucide-react";

import { PenaltyScene } from "./components/penalty-scene";

const RESUME =
	"https://drive.google.com/file/d/1yh_i07AzMMlhSV9mQ5PH6_n7nvYpVAs3/view?usp=sharing";

export default function Home() {
	return (
		<main className="relative min-h-[100svh] w-full overflow-x-hidden bg-[#02100a]">
			{/* ---------- the stage: always 16:9, letterboxed into the viewport ---------- */}
			<div className="flex min-h-[100svh] w-full items-center justify-center">
				<div
					className="relative shadow-[0_0_120px_-20px_rgba(62,240,140,.25)]"
					style={{
						width: "min(100vw, calc(100svh * 16 / 9))",
						height: "min(100svh, calc(100vw * 9 / 16))",
					}}
				>
					<PenaltyScene />

					{/* broadcast HUD */}
					<motion.div
						initial={false}
						animate={{ opacity: 1, x: 0 }}
						className="pointer-events-none absolute left-[1.6%] top-[3.5%] flex items-center gap-2.5"
					>
						<span className="flex h-2 w-2 items-center justify-center">
							<span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_3px_rgba(239,68,68,.7)]" />
						</span>
						<span className="font-stadium text-[10px] font-bold uppercase tracking-[0.34em] text-emerald-200/80 sm:text-xs">
							Live · Matchday
						</span>
					</motion.div>

					<motion.div
						initial={false}
						animate={{ opacity: 1, x: 0 }}
						className="absolute right-[1.6%] top-[3%] flex items-center gap-2"
					>
						<a
							href={RESUME}
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-1.5 rounded-sm border border-emerald-300/40 bg-black/60 px-2.5 py-1.5 font-stadium text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100 backdrop-blur transition-colors duration-300 hover:border-kit-gold hover:text-kit-gold sm:px-4 sm:py-2 sm:text-xs"
						>
							Dossier
							<ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>
						<Link
							href="/contact"
							className="inline-flex items-center rounded-sm bg-kit-neon px-2.5 py-1.5 font-stadium text-[10px] font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_24px_-6px_rgba(62,240,140,.9)] transition-transform duration-300 hover:-translate-y-0.5 sm:px-4 sm:py-2 sm:text-xs"
						>
							Sign me
						</Link>
					</motion.div>

					{/* instruction */}
					<motion.div
						initial={false}
						animate={{ opacity: 1, y: 0 }}
						className="pointer-events-none absolute inset-x-0 bottom-[3%] flex justify-center"
					>
						<span className="rounded-full border border-emerald-300/25 bg-black/65 px-4 py-1.5 font-stadium text-[10px] uppercase tracking-[0.3em] text-emerald-100/70 backdrop-blur sm:text-xs">
							Pick your corner — the keeper has no chance
						</span>
					</motion.div>
				</div>
			</div>

			{/* ---------- portrait fallback: the same copy, readable ---------- */}
			<div className="px-6 pb-16 landscape:hidden md:hidden">
				<div className="mx-auto max-w-md rounded-lg border border-emerald-400/20 bg-black/50 p-5">
					<div className="mb-4 flex items-center gap-2 font-stadium text-[10px] uppercase tracking-[0.3em] text-kit-neon">
						<Smartphone size={13} />
						Rotate for the full matchday view
					</div>
					<h1 className="font-jersey text-3xl uppercase leading-none text-white">
						Laksh Nijhawan
					</h1>
					<p className="mt-3 font-stadium text-base leading-snug text-emerald-50/70">
						Product-focused engineer building end-to-end systems that turn ideas
						into real, usable products.
					</p>
					<ul className="mt-4 space-y-2 border-l-2 border-emerald-400/25 pl-3 text-sm text-emerald-50/65">
						<li>
							Previously built AI &amp; tools at{" "}
							<span className="font-semibold text-white">The Times of India</span>.
						</li>
						<li>
							Built{" "}
							<a
								href="https://codepersona.app"
								target="_blank"
								rel="noopener noreferrer"
								className="font-semibold text-white underline decoration-kit-neon/60 underline-offset-4"
							>
								CodePersona
							</a>
							, used by <strong className="text-kit-gold">5K+ users</strong> across{" "}
							<strong className="text-kit-gold">95 countries</strong>.
						</li>
						<li>
							Shipped products at{" "}
							<a
								href="https://writecream.org"
								target="_blank"
								rel="noopener noreferrer"
								className="font-semibold text-white underline decoration-kit-neon/60 underline-offset-4"
							>
								Writecream
							</a>{" "}
							to <strong className="text-kit-gold">1M+ users</strong>.
						</li>
						<li>
							<strong className="text-white">35+ products</strong> ·{" "}
							<strong className="text-white">10+ hackathons</strong>.
						</li>
						<li className="text-kit-gold">
							Open to full-time, interning, or freelance.
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
}
