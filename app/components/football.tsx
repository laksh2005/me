"use client";

import React from "react";

const PENTAGON =
	"polygon(50% 0%, 100% 36%, 82% 100%, 18% 100%, 0% 36%)";

/**
 * Rows of pentagons laid out across a 300%-wide strip. The strip translates by
 * exactly one third of its width, so the pattern loops seamlessly and the ball
 * reads as spinning on a vertical axis while the lighting stays put.
 */
const ROWS = [
	{ top: "-14%", size: 22, offset: 0 },
	{ top: "20%", size: 26, offset: 4.1666 },
	{ top: "56%", size: 24, offset: 0 },
	{ top: "88%", size: 20, offset: 4.1666 },
];

const PERIOD = 8.3333; // 12 pentagons per row across the strip

export const Football: React.FC<{
	size?: number;
	className?: string;
	shadow?: boolean;
	bob?: boolean;
	spinSeconds?: number;
}> = ({ size = 180, className = "", shadow = true, bob = true, spinSeconds = 7 }) => {
	return (
		<div
			className={`relative ${className}`}
			style={{ width: size, height: shadow ? size * 1.22 : size }}
			aria-hidden="true"
		>
			<div
				className={bob ? "animate-ball-bob" : ""}
				style={{ width: size, height: size }}
			>
				<div
					className="relative overflow-hidden rounded-full"
					style={{
						width: size,
						height: size,
						boxShadow:
							"inset -16px -20px 42px rgba(0,0,0,.8), inset 12px 12px 30px rgba(255,255,255,.28), 0 24px 60px -18px rgba(0,0,0,.9)",
					}}
				>
					{/* rolling panel strip */}
					<div
						className="absolute inset-y-0 left-0 w-[300%] ball-seams animate-ball-roll"
						style={{
							backgroundColor: "#f2f5f1",
							animationDuration: `${spinSeconds}s`,
						}}
					>
						{ROWS.map((row, r) =>
							Array.from({ length: 13 }).map((_, i) => (
								<span
									key={`${r}-${i}`}
									className="absolute block"
									style={{
										left: `${row.offset + i * PERIOD - 3}%`,
										top: row.top,
										width: `${row.size / 3}%`,
										aspectRatio: "1 / 0.96",
										clipPath: PENTAGON,
										background:
											r % 2 === 0
												? "linear-gradient(160deg,#20262a,#080b0d)"
												: "linear-gradient(160deg,#171d21,#050708)",
										transform: r % 2 === 0 ? "rotate(0deg)" : "rotate(180deg)",
									}}
								/>
							)),
						)}
					</div>

					{/* curvature shading */}
					<div
						className="absolute inset-0 rounded-full"
						style={{
							background:
								"radial-gradient(circle at 70% 76%, rgba(0,0,0,.88) 0%, rgba(0,0,0,.5) 32%, rgba(0,0,0,0) 66%)",
						}}
					/>
					{/* specular highlight */}
					<div
						className="absolute inset-0 rounded-full"
						style={{
							background:
								"radial-gradient(circle at 31% 25%, rgba(255,255,255,.95) 0%, rgba(255,255,255,.4) 14%, rgba(255,255,255,0) 40%)",
						}}
					/>
					{/* rim light */}
					<div
						className="absolute inset-0 rounded-full"
						style={{
							background:
								"radial-gradient(circle at 50% 50%, transparent 62%, rgba(62,240,140,.22) 92%, rgba(62,240,140,.5) 100%)",
						}}
					/>
				</div>
			</div>

			{shadow && (
				<div
					className="absolute left-1/2 -translate-x-1/2 rounded-[50%] animate-ball-shadow"
					style={{
						bottom: 0,
						width: size * 0.82,
						height: size * 0.13,
						background:
							"radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.85), rgba(0,0,0,0) 72%)",
						filter: "blur(4px)",
					}}
				/>
			)}
		</div>
	);
};

/** Tiny inline ball — used as a bullet / marker throughout the site. */
export const BallDot: React.FC<{ size?: number; className?: string }> = ({
	size = 12,
	className = "",
}) => (
	<span
		className={`inline-block flex-shrink-0 rounded-full ${className}`}
		style={{
			width: size,
			height: size,
			background:
				"radial-gradient(circle at 32% 28%, #ffffff 0%, #e7ece6 38%, #7d8a80 100%)",
			boxShadow:
				"inset -2px -2px 4px rgba(0,0,0,.55), 0 0 8px rgba(62,240,140,.35)",
			position: "relative",
		}}
		aria-hidden="true"
	>
		<span
			className="absolute rounded-[2px]"
			style={{
				inset: "28%",
				background: "#12181a",
				clipPath: PENTAGON,
			}}
		/>
	</span>
);
