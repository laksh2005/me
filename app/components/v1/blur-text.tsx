"use client";

import React, { useMemo } from "react";

/**
 * Word by word blur reveal.
 *
 * Adapted from the React Bits component of the same name, with the animation
 * moved from JavaScript to CSS. Two reasons, and the second is the important
 * one:
 *
 *  1. The original targets `motion/react` (Framer Motion v11) and drives each
 *     word with a keyframe array plus `times` and a custom easing function.
 *     This project is on Framer Motion 10, which does not accept that
 *     combination.
 *
 *  2. A JS driven animation only progresses while requestAnimationFrame is
 *     running. In a background or throttled tab it does not, so text whose
 *     visibility depends on the animation completing can stay stranded at
 *     opacity 0. Driving it from CSS means the reveal is handled by the
 *     compositor, and `animation-fill-mode: both` guarantees the words end up
 *     readable no matter what the main thread is doing.
 *
 * Each segment gets its own delay, which is what produces the staggered,
 * spoken feel rather than one block fading in.
 */

export interface BlurTextProps {
	text?: string;
	className?: string;
	/** Split into words or individual letters. */
	animateBy?: "words" | "letters";
	/** Which side each segment drifts in from. */
	direction?: "top" | "bottom";
	/** Milliseconds between consecutive segments. */
	delay?: number;
	/** Seconds each segment takes. */
	stepDuration?: number;
}

const BlurText: React.FC<BlurTextProps> = ({
	text = "",
	className = "",
	animateBy = "words",
	direction = "top",
	delay = 45,
	stepDuration = 0.42,
}) => {
	const segments = useMemo(
		() => (animateBy === "words" ? text.split(" ") : text.split("")),
		[text, animateBy],
	);

	return (
		// Keyed on the text, so a new answer remounts the line and the reveal
		// replays instead of only running once per session.
		<p key={text} className={`bt ${className}`}>
			{segments.map((segment, i) => (
				<span
					key={i}
					className={direction === "top" ? "bt-seg bt-top" : "bt-seg bt-bottom"}
					style={{
						animationDelay: `${(i * delay) / 1000}s`,
						animationDuration: `${stepDuration}s`,
					}}
				>
					{segment === " " ? " " : segment}
					{animateBy === "words" && i < segments.length - 1 && " "}
				</span>
			))}
		</p>
	);
};

export default BlurText;
