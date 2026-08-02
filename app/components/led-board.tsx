"use client";

import React from "react";

/** Perimeter LED advertising board — endlessly scrolling stadium ticker. */
export const LedBoard: React.FC<{
	items: string[];
	speed?: number;
	className?: string;
}> = ({ items, speed = 26, className = "" }) => {
	const track = [...items, ...items];

	return (
		<div
			className={`led-panel relative w-full overflow-hidden border-y border-emerald-400/25 ${className}`}
		>
			<div
				className="animate-led flex w-max items-center"
				style={{ animationDuration: `${speed}s` }}
			>
				{track.map((item, i) => (
					<span
						key={i}
						className="flex items-center whitespace-nowrap font-stadium text-[13px] font-semibold uppercase tracking-[0.32em] text-emerald-200/85 md:text-sm"
					>
						<span className="px-6 py-2.5">{item}</span>
						<span className="text-kit-gold/70">◆</span>
					</span>
				))}
			</div>
		</div>
	);
};
