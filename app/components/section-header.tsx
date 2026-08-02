"use client";

import React from "react";
import { BallDot } from "./football";

/** Broadcast-style page title: kicker strip, huge jersey type, chalk underline. */
export const SectionHeader: React.FC<{
	kicker: string;
	title: string;
	subtitle?: string;
	stat?: string;
}> = ({ kicker, title, subtitle, stat }) => (
	<header className="relative mb-10 md:mb-14">
		<div className="flex items-center gap-3 animate-rise-in">
			<span className="h-[3px] w-8 bg-kit-neon" />
			<BallDot size={11} />
			<span className="font-stadium text-xs font-semibold uppercase tracking-[0.42em] text-kit-neon/85">
				{kicker}
			</span>
		</div>

		<h1
			className="mt-3 font-jersey text-[13vw] uppercase leading-[0.86] text-white sm:text-6xl md:text-7xl lg:text-8xl animate-rise-in"
			style={{
				animationDelay: "0.06s",
				textShadow: "0 10px 40px rgba(0,0,0,.8), 0 0 60px rgba(62,240,140,.12)",
			}}
		>
			{title}
		</h1>

		<div
			className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 animate-rise-in"
			style={{ animationDelay: "0.12s" }}
		>
			{subtitle && (
				<p className="max-w-xl font-stadium text-base tracking-wide text-emerald-100/60 md:text-lg">
					{subtitle}
				</p>
			)}
			{stat && (
				<span className="rounded-sm border border-kit-gold/40 bg-kit-gold/10 px-2.5 py-1 font-stadium text-xs font-bold uppercase tracking-[0.2em] text-kit-gold">
					{stat}
				</span>
			)}
		</div>

		<div className="mt-6 h-px w-full bg-gradient-to-r from-white/30 via-emerald-400/20 to-transparent" />
	</header>
);
