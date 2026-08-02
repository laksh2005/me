"use client";

import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import React, { PropsWithChildren, useRef } from "react";

/**
 * Physical-feeling 3D tilt with a glare that tracks the pointer. Used for the
 * player cards, club crests and trophy tiles.
 */
export const TiltCard: React.FC<
	PropsWithChildren<{
		className?: string;
		intensity?: number;
		glare?: boolean;
		onClick?: () => void;
	}>
> = ({ children, className = "", intensity = 14, glare = true, onClick }) => {
	const ref = useRef<HTMLDivElement>(null);

	const px = useMotionValue(0.5);
	const py = useMotionValue(0.5);

	const spring = { stiffness: 260, damping: 26, mass: 0.6 };
	const sx = useSpring(px, spring);
	const sy = useSpring(py, spring);

	const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
	const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);

	const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
	const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);
	const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 32%, transparent 62%)`;

	function onMove(e: React.MouseEvent) {
		const el = ref.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		px.set((e.clientX - r.left) / r.width);
		py.set((e.clientY - r.top) / r.height);
	}

	function onLeave() {
		px.set(0.5);
		py.set(0.5);
	}

	return (
		<div className="perspective-near" style={{ perspective: 900 }}>
			<motion.div
				ref={ref}
				onMouseMove={onMove}
				onMouseLeave={onLeave}
				onClick={onClick}
				style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
				whileHover={{ scale: 1.035, z: 40 }}
				transition={{ type: "spring", stiffness: 300, damping: 24 }}
				className={`relative ${className}`}
			>
				{children}
				{glare && (
					<motion.div
						className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						style={{ background: glareBg, mixBlendMode: "overlay" }}
					/>
				)}
			</motion.div>
		</div>
	);
};
