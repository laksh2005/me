"use client";

import React from "react";

/**
 * Full matchday stadium: night sky, stands + crowd, floodlights, and a
 * perspective-projected pitch that rolls toward the viewer.
 */
export const Stadium: React.FC<{ className?: string }> = ({ className = "" }) => {
	return (
		<div
			className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
			aria-hidden="true"
		>
			{/* night sky */}
			<div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0b2d1c_0%,#051a10_38%,#010905_100%)]" />

			{/* far stands */}
			<div className="absolute inset-x-0 top-0 h-[46%]">
				<div className="absolute inset-x-0 bottom-0 h-[62%] bg-[linear-gradient(to_bottom,#02100a_0%,#061a11_55%,#020c07_100%)]" />
				<div className="absolute inset-x-0 bottom-[6%] h-[46%] crowd-dots animate-crowd opacity-70" />
				<div className="absolute inset-x-0 bottom-[4%] h-px bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent" />
			</div>

			{/* floodlight pylons */}
			{[8, 30, 70, 92].map((x, i) => (
				<div
					key={x}
					className="absolute top-0 animate-flood"
					style={{
						left: `${x}%`,
						width: "26%",
						height: "78%",
						marginLeft: "-13%",
						animationDelay: `${i * 1.3}s`,
					}}
				>
					<div className="flood-cone h-full w-full" />
				</div>
			))}

			{/* lamp heads */}
			{[8, 30, 70, 92].map((x, i) => (
				<div
					key={`lamp-${x}`}
					className="absolute top-[4%] h-2 w-10 -translate-x-1/2 rounded-full bg-kit-flood animate-flood"
					style={{
						left: `${x}%`,
						boxShadow:
							"0 0 22px 8px rgba(233,255,242,.55), 0 0 60px 22px rgba(233,255,242,.22)",
						animationDelay: `${i * 1.3}s`,
					}}
				/>
			))}

			{/* the pitch, in perspective */}
			<div
				className="absolute inset-x-[-32%] bottom-[-24%] top-[34%]"
				style={{ perspective: "760px", perspectiveOrigin: "50% 0%" }}
			>
				<div
					className="relative h-full w-full overflow-hidden"
					style={{ transform: "rotateX(64deg)", transformOrigin: "50% 0%" }}
				>
					{/* mown stripes rolling forward */}
					<div className="absolute inset-x-0 top-0 h-[200%] turf-stripes turf-blades animate-turf-roll" />

					{/* chalk markings */}
					<div className="absolute inset-[7%] border-2 border-white/25" />
					<div className="absolute left-[7%] right-[7%] top-1/2 h-[2px] -translate-y-1/2 bg-white/25" />
					<div className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/25" />
					<div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40" />
					{/* penalty areas */}
					<div className="absolute left-1/2 top-[7%] h-[16%] w-[44%] -translate-x-1/2 border-2 border-t-0 border-white/25" />
					<div className="absolute bottom-[7%] left-1/2 h-[16%] w-[44%] -translate-x-1/2 border-2 border-b-0 border-white/25" />
					<div className="absolute left-1/2 top-[7%] h-[7%] w-[20%] -translate-x-1/2 border-2 border-t-0 border-white/25" />
					<div className="absolute bottom-[7%] left-1/2 h-[7%] w-[20%] -translate-x-1/2 border-2 border-b-0 border-white/25" />

					{/* light pools cast by the pylons */}
					<div className="absolute inset-0 bg-[radial-gradient(38%_44%_at_18%_28%,rgba(233,255,242,.16),transparent_70%),radial-gradient(38%_44%_at_82%_28%,rgba(233,255,242,.16),transparent_70%),radial-gradient(46%_50%_at_50%_78%,rgba(233,255,242,.12),transparent_72%)]" />
				</div>
			</div>

			{/* atmosphere */}
			<div className="absolute inset-x-0 top-[30%] h-40 bg-[linear-gradient(to_bottom,rgba(62,240,140,.07),transparent)] blur-2xl" />
			<div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_45%,transparent_20%,rgba(0,0,0,.55)_78%,rgba(0,0,0,.9)_100%)]" />
			<div className="noise absolute inset-0" />
		</div>
	);
};

/**
 * Lighter, fixed backdrop for interior pages — same turf language, dialled way
 * down so content stays readable.
 */
export const PitchBackdrop: React.FC = () => (
	<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
		<div className="absolute inset-0 bg-[radial-gradient(110%_70%_at_50%_0%,#08281a_0%,#04160d_45%,#010805_100%)]" />
		<div className="absolute inset-x-0 top-0 h-32 crowd-dots animate-crowd opacity-30" />

		<div
			className="absolute inset-x-[-20%] bottom-[-30%] top-[18%]"
			style={{ perspective: "900px", perspectiveOrigin: "50% 0%" }}
		>
			<div
				className="relative h-full w-full overflow-hidden opacity-[0.55]"
				style={{ transform: "rotateX(70deg)", transformOrigin: "50% 0%" }}
			>
				<div className="absolute inset-x-0 top-0 h-[200%] turf-stripes turf-blades animate-turf-roll" />
				<div className="absolute inset-[10%] border-2 border-white/12" />
				<div className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/12" />
				<div className="absolute left-[10%] right-[10%] top-1/2 h-[2px] -translate-y-1/2 bg-white/12" />
			</div>
		</div>

		<div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,transparent_10%,rgba(1,8,5,.72)_70%,rgba(1,8,5,.94)_100%)]" />
		<div className="noise absolute inset-0 opacity-[0.08]" />
	</div>
);
