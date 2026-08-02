"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

/* ============================================================
   Scene geometry — everything lives in this 1600x900 viewBox so
   the whole thing scales perfectly at any stage size.
   ============================================================ */

const W = 1600;
const H = 900;

const PITCH_TOP = 332; // horizon / front edge of the LED boards
const LED_TOP = 294;

const GOAL = {
	fl: 340, // front-left post
	fr: 1260, // front-right post
	topY: 252, // crossbar
	baseY: 562, // goal line
	bl: 415, // back-left stanchion
	br: 1185,
	backTopY: 292,
	backBaseY: 522,
};

const BALL_HOME = { x: 800, y: 672 };
const BALL_R = 26;

type Corner = {
	key: string;
	name: string;
	href: string;
	label: string;
	/** where the ball ends up, and where the button sits */
	x: number;
	y: number;
	/** keeper dive */
	dive: { x: number; y: number; rotate: number };
};

const CORNERS: Corner[] = [
	{
		key: "experience",
		name: "Experience",
		href: "/experience",
		label: "Top left",
		x: 470,
		y: 332,
		dive: { x: -180, y: -78, rotate: -66 },
	},
	{
		key: "skills",
		name: "Skills",
		href: "/skills",
		label: "Top right",
		x: 1130,
		y: 332,
		dive: { x: 180, y: -78, rotate: 66 },
	},
	{
		key: "projects",
		name: "Projects",
		href: "/projects",
		label: "Bottom left",
		x: 484,
		y: 474,
		dive: { x: -200, y: 26, rotate: -82 },
	},
	{
		key: "blog",
		name: "Blogs",
		href: "/blog",
		label: "Bottom right",
		x: 1116,
		y: 474,
		dive: { x: 200, y: 26, rotate: 82 },
	},
];

/* ---------- net mesh helpers ---------- */

type Pt = [number, number];
const lerp = (p: Pt, q: Pt, t: number): Pt => [
	p[0] + (q[0] - p[0]) * t,
	p[1] + (q[1] - p[1]) * t,
];

/** Bilinear grid across a quad — gives every net panel correct convergence. */
function mesh(A: Pt, B: Pt, C: Pt, D: Pt, n: number, m: number) {
	const out: [Pt, Pt][] = [];
	for (let i = 0; i <= n; i++) {
		const t = i / n;
		out.push([lerp(A, B, t), lerp(D, C, t)]);
	}
	for (let j = 0; j <= m; j++) {
		const t = j / m;
		out.push([lerp(A, D, t), lerp(B, C, t)]);
	}
	return out;
}

const P = {
	fTL: [GOAL.fl, GOAL.topY] as Pt,
	fTR: [GOAL.fr, GOAL.topY] as Pt,
	fBL: [GOAL.fl, GOAL.baseY] as Pt,
	fBR: [GOAL.fr, GOAL.baseY] as Pt,
	bTL: [GOAL.bl, GOAL.backTopY] as Pt,
	bTR: [GOAL.br, GOAL.backTopY] as Pt,
	bBL: [GOAL.bl, GOAL.backBaseY] as Pt,
	bBR: [GOAL.br, GOAL.backBaseY] as Pt,
};

const NET_PANELS = [
	mesh(P.bTL, P.bTR, P.bBR, P.bBL, 26, 12), // back
	mesh(P.fTL, P.bTL, P.bBL, P.fBL, 7, 12), // left side
	mesh(P.bTR, P.fTR, P.fBR, P.bBR, 7, 12), // right side
	mesh(P.fTL, P.fTR, P.bTR, P.bTL, 26, 6), // roof
];

/* ---------- mown stripes ---------- */

const STRIPES = (() => {
	const rows: { y: number; h: number; i: number }[] = [];
	let y = PITCH_TOP;
	let h = 7;
	let i = 0;
	while (y < H) {
		rows.push({ y, h, i });
		y += h;
		h *= 1.3;
		i++;
	}
	return rows;
})();

/* ---------- crowd banners (all the real copy lives here) ---------- */

const SOCIALS = [
	{ href: "mailto:lakshnijhawan.work@gmail.com", label: "Email", img: null, glyph: "@" },
	{ href: "https://github.com/laksh2005", label: "GitHub", img: null, glyph: "GH" },
	{
		href: "https://www.linkedin.com/in/laksh-nijhawan-576888280/",
		label: "LinkedIn",
		img: null,
		glyph: "in",
	},
	{ href: "https://x.com/laksh_2705", label: "X", img: "/x.png", glyph: "X" },
	{ href: "https://codepersona.app/laksh2005", label: "CodePersona", img: "/cplogo.png", glyph: "CP" },
];

const TICKER = [
	"Open to full-time · interning · freelance",
	"35+ products shipped",
	"10+ hackathons",
	"CodePersona — 5K+ users across 95 countries",
	"Writecream — 1M+ users",
	"Ex — The Times of India",
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ============================================================
   Scene
   ============================================================ */

export const PenaltyScene: React.FC = () => {
	const router = useRouter();
	const reduce = useReducedMotion();

	const [busy, setBusy] = useState(false);
	const [aim, setAim] = useState<string | null>(null);
	const [impact, setImpact] = useState<Corner | null>(null);
	const [zoom, setZoom] = useState<{ x: number; y: number; name: string } | null>(null);

	const btnRefs = useRef<Record<string, SVGGElement | null>>({});

	const ball = useAnimationControls();
	const spin = useAnimationControls();
	const keeper = useAnimationControls();
	const player = useAnimationControls();
	const legR = useAnimationControls();
	const legL = useAnimationControls();
	const armL = useAnimationControls();
	const armR = useAnimationControls();
	const shake = useAnimationControls();

	useEffect(() => {
		for (const c of CORNERS) router.prefetch(c.href);
	}, [router]);

	// Navigation must never depend on an animation frame landing — if the tab is
	// backgrounded mid-shot, rAF pauses and the clip-path tween never completes.
	useEffect(() => {
		if (!zoom) return;
		const c = CORNERS.find((x) => x.name === zoom.name);
		if (!c) return;
		const id = setTimeout(() => router.push(c.href), 820);
		return () => clearTimeout(id);
	}, [zoom, router]);

	async function takePenalty(c: Corner) {
		if (busy) return;
		setBusy(true);
		setAim(c.key);

		if (reduce) {
			router.push(c.href);
			return;
		}

		/* --- 1. run-up: two strides toward the ball --- */
		player.start({
			x: [0, 34, 74, 96],
			y: [0, -6, -2, 4],
			transition: { duration: 0.5, ease: "easeIn", times: [0, 0.34, 0.72, 1] },
		});
		legL.start({ rotate: [0, -22, 14, -6], transition: { duration: 0.5 } });
		armL.start({ rotate: [0, 18, -14, -26], transition: { duration: 0.5 } });
		armR.start({ rotate: [0, -16, 12, 30], transition: { duration: 0.5 } });

		/* --- 2. backswing --- */
		legR.start({
			rotate: [0, 34],
			transition: { duration: 0.34, ease: "easeOut" },
		});
		await delay(340);

		/* --- 3. keeper commits a hair before contact --- */
		keeper.start({
			x: c.dive.x * 0.28,
			y: -14,
			rotate: c.dive.rotate * 0.14,
			transition: { duration: 0.1, ease: "easeOut" },
		});

		/* --- 4. strike --- */
		legR.start({
			rotate: [34, -62],
			transition: { duration: 0.13, ease: [0.4, 0, 0.6, 1] },
		});
		await delay(105);

		/* --- 5. the shot --- */
		keeper.start({
			x: c.dive.x,
			y: c.dive.y,
			rotate: c.dive.rotate,
			transition: { duration: 0.52, ease: [0.16, 0.7, 0.3, 1] },
		});
		spin.start({
			rotate: 1080,
			transition: { duration: 0.58, ease: "linear" },
		});
		legR.start({ rotate: -40, transition: { duration: 0.35, ease: "easeOut" } });
		player.start({ y: 4, x: 108, transition: { duration: 0.35 } });

		const midX = BALL_HOME.x + (c.x - BALL_HOME.x) * 0.52;
		const midY = BALL_HOME.y + (c.y - BALL_HOME.y) * 0.44 - 34;

		ball.start({
			x: [BALL_HOME.x, midX, c.x],
			y: [BALL_HOME.y, midY, c.y],
			scale: [1, 0.78, 0.52],
			transition: { duration: 0.56, ease: [0.24, 0.58, 0.42, 1], times: [0, 0.52, 1] },
		});
		await delay(560);

		/* --- 6. the net --- */
		setImpact(c);
		shake.start({
			x: [0, -9, 7, -4, 0],
			y: [0, 5, -4, 2, 0],
			transition: { duration: 0.36, ease: "easeOut" },
		});
		spin.start({ rotate: 1320, transition: { duration: 0.4, ease: "easeOut" } });
		ball.start({
			x: c.x + (c.x < 800 ? 26 : -26),
			y: c.y + 66,
			scale: 0.47,
			transition: { duration: 0.42, ease: [0.5, 0, 0.9, 0.6] },
		});

		await delay(430);

		/* --- 7. circular zoom out of the button that was struck --- */
		const el = btnRefs.current[c.key];
		const r = el?.getBoundingClientRect();
		setZoom({
			x: r ? r.left + r.width / 2 : window.innerWidth / 2,
			y: r ? r.top + r.height / 2 : window.innerHeight / 2,
			name: c.name,
		});
	}

	const zoomRadius =
		zoom && typeof window !== "undefined"
			? Math.hypot(
					Math.max(zoom.x, window.innerWidth - zoom.x),
					Math.max(zoom.y, window.innerHeight - zoom.y),
				) + 40
			: 0;

	return (
		<>
			<motion.svg
				viewBox={`0 0 ${W} ${H}`}
				className="h-full w-full select-none"
				animate={shake}
				aria-label="Penalty kick — pick a corner of the goal to navigate"
			>
				<defs>
					<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#02100a" />
						<stop offset="55%" stopColor="#062018" />
						<stop offset="100%" stopColor="#0a3222" />
					</linearGradient>

					<linearGradient id="standFar" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#020c07" />
						<stop offset="100%" stopColor="#08201a" />
					</linearGradient>

					<pattern id="crowdA" width="15" height="13" patternUnits="userSpaceOnUse">
						<circle cx="3.5" cy="3.5" r="2.4" fill="#cfe9dc" opacity="0.5" />
						<circle cx="11" cy="9.5" r="2.4" fill="#8fb9a6" opacity="0.42" />
					</pattern>
					<pattern id="crowdB" width="23" height="19" patternUnits="userSpaceOnUse">
						<circle cx="6" cy="6" r="2.6" fill="#3ef08c" opacity="0.4" />
						<circle cx="17" cy="14" r="2.6" fill="#f0c04a" opacity="0.36" />
					</pattern>

					<linearGradient id="banner" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#0d3c26" />
						<stop offset="50%" stopColor="#062416" />
						<stop offset="100%" stopColor="#03150d" />
					</linearGradient>
					<linearGradient id="bannerGold" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#2c2208" />
						<stop offset="50%" stopColor="#4a3a10" />
						<stop offset="100%" stopColor="#1a1405" />
					</linearGradient>

					<linearGradient id="led" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#04170d" />
						<stop offset="45%" stopColor="#0a3a20" />
						<stop offset="100%" stopColor="#020e08" />
					</linearGradient>

					<radialGradient id="ballSphere" cx="34%" cy="28%" r="76%">
						<stop offset="0%" stopColor="#ffffff" />
						<stop offset="42%" stopColor="#eef2ec" />
						<stop offset="78%" stopColor="#9aa79e" />
						<stop offset="100%" stopColor="#3d463f" />
					</radialGradient>

					<linearGradient id="postGrad" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#7f8c85" />
						<stop offset="35%" stopColor="#ffffff" />
						<stop offset="100%" stopColor="#8d9a93" />
					</linearGradient>

					<linearGradient id="kitBody" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#12211a" />
						<stop offset="100%" stopColor="#050c09" />
					</linearGradient>
					<linearGradient id="gkKit" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#f2e05a" />
						<stop offset="100%" stopColor="#b8860d" />
					</linearGradient>

					<radialGradient id="floodPool" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#e9fff2" stopOpacity="0.2" />
						<stop offset="100%" stopColor="#e9fff2" stopOpacity="0" />
					</radialGradient>

					<radialGradient id="rippleGrad" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
						<stop offset="45%" stopColor="#3ef08c" stopOpacity="0.45" />
						<stop offset="100%" stopColor="#3ef08c" stopOpacity="0" />
					</radialGradient>

					<filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
						<feGaussianBlur stdDeviation="10" />
					</filter>
					<filter id="softer" x="-80%" y="-80%" width="260%" height="260%">
						<feGaussianBlur stdDeviation="26" />
					</filter>

					<radialGradient id="vig" cx="50%" cy="46%" r="72%">
						<stop offset="55%" stopColor="#000" stopOpacity="0" />
						<stop offset="100%" stopColor="#000" stopOpacity="0.72" />
					</radialGradient>

					<clipPath id="ledClip">
						<rect x="0" y={LED_TOP} width={W} height={PITCH_TOP - LED_TOP} />
					</clipPath>

					{SOCIALS.map((s, i) => (
						<clipPath id={`sc-${i}`} key={s.label}>
							<circle cx={0} cy={0} r={20} />
						</clipPath>
					))}
				</defs>

				{/* ---------------- sky + stands ---------------- */}
				<rect x="0" y="0" width={W} height={PITCH_TOP} fill="url(#sky)" />
				<rect x="0" y="0" width={W} height="300" fill="url(#standFar)" opacity="0.85" />

				{/* crowd tiers */}
				<g className="animate-crowd">
					<rect x="0" y="0" width={W} height="286" fill="url(#crowdA)" opacity="0.55" />
					<rect x="0" y="0" width={W} height="286" fill="url(#crowdB)" opacity="0.5" />
				</g>
				<rect
					x="0"
					y="0"
					width={W}
					height="286"
					fill="#010805"
					opacity="0.32"
				/>

				{/* floodlight wash */}
				<ellipse cx="300" cy="120" rx="440" ry="240" fill="url(#floodPool)" />
				<ellipse cx="1300" cy="120" rx="440" ry="240" fill="url(#floodPool)" />
				{[120, 480, 1120, 1480].map((x, i) => (
					<g key={x}>
						<rect
							x={x - 34}
							y={6}
							width={68}
							height={11}
							rx={5}
							fill="#e9fff2"
							className="animate-flood"
							style={{ animationDelay: `${i * 1.2}s` }}
						/>
						<circle
							cx={x}
							cy={12}
							r={44}
							fill="#e9fff2"
							opacity="0.28"
							filter="url(#softer)"
							className="animate-flood"
							style={{ animationDelay: `${i * 1.2}s` }}
						/>
					</g>
				))}

				{/* ---------------- crowd banners ---------------- */}
				<Banner x={286} y={22} w={1028} h={78} tone="gold" rot={-0.35}>
					<text
						x={800}
						y={78}
						textAnchor="middle"
						className="font-jersey"
						fontSize="62"
						letterSpacing="10"
						fill="#f7e6b0"
					>
						LAKSH NIJHAWAN
					</text>
				</Banner>

				<Banner x={366} y={106} w={868} h={40} rot={0.25}>
					<text
						x={800}
						y={134}
						textAnchor="middle"
						className="font-stadium"
						fontSize="23"
						letterSpacing="3.4"
						fill="#bfe9d2"
					>
						PRODUCT-FOCUSED ENGINEER · END-TO-END SYSTEMS THAT BECOME REAL PRODUCTS
					</text>
				</Banner>

				<Banner x={54} y={152} w={520} h={52} rot={-1.1}>
					<text
						x={314}
						y={186}
						textAnchor="middle"
						className="font-jersey"
						fontSize="27"
						letterSpacing="2.4"
						fill="#eafff3"
					>
						35+ PRODUCTS · 10+ HACKATHONS
					</text>
				</Banner>

				<Banner x={1026} y={152} w={520} h={52} tone="gold" rot={1.1}>
					<text
						x={1286}
						y={186}
						textAnchor="middle"
						className="font-jersey"
						fontSize="27"
						letterSpacing="2.4"
						fill="#f7e6b0"
					>
						EX — THE TIMES OF INDIA
					</text>
				</Banner>

				<Banner x={16} y={216} w={330} h={58} rot={0.8}>
					<text x={181} y={240} textAnchor="middle" className="font-jersey" fontSize="21" fill="#eafff3">
						CODEPERSONA
					</text>
					<text
						x={181}
						y={262}
						textAnchor="middle"
						className="font-stadium"
						fontSize="17"
						letterSpacing="1.6"
						fill="#7fd6a8"
					>
						5K+ USERS · 95 COUNTRIES
					</text>
				</Banner>

				<Banner x={1254} y={216} w={330} h={58} rot={-0.8}>
					<text x={1419} y={240} textAnchor="middle" className="font-jersey" fontSize="21" fill="#eafff3">
						WRITECREAM
					</text>
					<text
						x={1419}
						y={262}
						textAnchor="middle"
						className="font-stadium"
						fontSize="17"
						letterSpacing="1.6"
						fill="#7fd6a8"
					>
						SHIPPED TO 1M+ USERS
					</text>
				</Banner>

				{/* socials banner */}
				<Banner x={604} y={152} w={392} h={62}>
					<text
						x={800}
						y={170}
						textAnchor="middle"
						className="font-stadium"
						fontSize="14"
						letterSpacing="4"
						fill="#6fc79b"
					>
						FOLLOW THE CLUB
					</text>
					{SOCIALS.map((s, i) => {
						const cx = 800 + (i - (SOCIALS.length - 1) / 2) * 62;
						return (
							<a
								key={s.label}
								href={s.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={s.label}
								className="cursor-pointer"
							>
								<g transform={`translate(${cx} 192)`} className="transition-opacity hover:opacity-80">
									<circle r="20" fill="#04160d" stroke="#3ef08c" strokeWidth="1.6" opacity="0.95" />
									{s.img ? (
										<image
											href={s.img}
											x={-20}
											y={-20}
											width={40}
											height={40}
											clipPath={`url(#sc-${i})`}
											preserveAspectRatio="xMidYMid slice"
										/>
									) : (
										<text
											textAnchor="middle"
											y="6"
											className="font-jersey"
											fontSize="17"
											fill="#bff5d8"
										>
											{s.glyph}
										</text>
									)}
								</g>
							</a>
						);
					})}
				</Banner>

				{/* ---------------- LED perimeter board ---------------- */}
				<g clipPath="url(#ledClip)">
					<rect x="0" y={LED_TOP} width={W} height={PITCH_TOP - LED_TOP} fill="url(#led)" />
					<motion.g
						animate={{ x: [0, -1900] }}
						transition={{ duration: 26, ease: "linear", repeat: Infinity }}
					>
						{[0, 1].map((rep) =>
							TICKER.map((t, i) => (
								<text
									key={`${rep}-${i}`}
									x={rep * 1900 + i * 317 + 20}
									y={LED_TOP + 26}
									className="font-stadium"
									fontSize="21"
									letterSpacing="3"
									fill="#7cf3b4"
								>
									{t.toUpperCase()} ◆
								</text>
							)),
						)}
					</motion.g>
					<rect
						x="0"
						y={LED_TOP}
						width={W}
						height={PITCH_TOP - LED_TOP}
						fill="none"
						stroke="#3ef08c"
						strokeOpacity="0.35"
						strokeWidth="2"
					/>
				</g>

				{/* ---------------- pitch ---------------- */}
				<rect x="0" y={PITCH_TOP} width={W} height={H - PITCH_TOP} fill="#0a3a22" />
				{STRIPES.map((s) => (
					<rect
						key={s.y}
						x="0"
						y={s.y}
						width={W}
						height={s.h + 0.6}
						fill={s.i % 2 === 0 ? "#0d492b" : "#093a22"}
						opacity={s.i % 2 === 0 ? 0.85 : 0.65}
					/>
				))}
				{/* light pools on the turf */}
				<ellipse cx="800" cy="640" rx="760" ry="300" fill="url(#floodPool)" />
				<ellipse cx="360" cy="820" rx="520" ry="220" fill="url(#floodPool)" opacity="0.7" />

				{/* markings */}
				<g stroke="#eafff3" strokeOpacity="0.62" fill="none" strokeWidth="4">
					<line x1="120" y1={GOAL.baseY} x2="1480" y2={GOAL.baseY} />
					{/* six yard box */}
					<path d={`M 596 ${GOAL.baseY} L 548 612 L 1052 612 L 1004 ${GOAL.baseY}`} />
					{/* penalty area */}
					<path d={`M 322 ${GOAL.baseY} L 128 812 L 1472 812 L 1278 ${GOAL.baseY}`} />
					{/* the D */}
					<path d="M 632 812 Q 800 906 968 812" />
				</g>
				<ellipse cx="800" cy={700} rx="11" ry="4.5" fill="#eafff3" fillOpacity="0.85" />

				{/* ---------------- goal ---------------- */}
				<g>
					{/* net */}
					<g stroke="#dfffee" strokeOpacity="0.2" strokeWidth="1.15" fill="none">
						{NET_PANELS.map((panel, pi) =>
							panel.map((seg, si) => (
								<line
									key={`${pi}-${si}`}
									x1={seg[0][0]}
									y1={seg[0][1]}
									x2={seg[1][0]}
									y2={seg[1][1]}
								/>
							)),
						)}
					</g>
					{/* net shading so the mouth reads as depth */}
					<polygon
						points={`${P.bTL} ${P.bTR} ${P.bBR} ${P.bBL}`.replace(/,/g, " ")}
						fill="#020d07"
						opacity="0.42"
					/>

					{/* stanchions */}
					<g stroke="#9fb3a9" strokeOpacity="0.5" strokeWidth="3">
						<line x1={GOAL.bl} y1={GOAL.backTopY} x2={GOAL.bl} y2={GOAL.backBaseY} />
						<line x1={GOAL.br} y1={GOAL.backTopY} x2={GOAL.br} y2={GOAL.backBaseY} />
						<line x1={GOAL.bl} y1={GOAL.backTopY} x2={GOAL.br} y2={GOAL.backTopY} />
					</g>

					{/* frame */}
					<g stroke="url(#postGrad)" strokeWidth="11" strokeLinecap="round">
						<line x1={GOAL.fl} y1={GOAL.topY} x2={GOAL.fl} y2={GOAL.baseY} />
						<line x1={GOAL.fr} y1={GOAL.topY} x2={GOAL.fr} y2={GOAL.baseY} />
						<line x1={GOAL.fl} y1={GOAL.topY} x2={GOAL.fr} y2={GOAL.topY} />
					</g>
					<g stroke="#3ef08c" strokeOpacity="0.35" strokeWidth="16" filter="url(#soft)">
						<line x1={GOAL.fl} y1={GOAL.topY} x2={GOAL.fr} y2={GOAL.topY} />
					</g>
				</g>

				{/* ---------------- goalkeeper ---------------- */}
				<motion.g
					animate={keeper}
					initial={{ x: 0, y: 0, rotate: 0 }}
					style={{ transformBox: "view-box", transformOrigin: "800px 448px" }}
				>
					<ellipse cx="800" cy="564" rx="52" ry="10" fill="#000" opacity="0.45" />
					<svg x={741} y={327} width={118} height={235} viewBox="0 0 100 200" overflow="visible">
						{/* legs */}
						<path d="M 42 124 L 36 196" stroke="#0f1a14" strokeWidth="13" strokeLinecap="round" fill="none" />
						<path d="M 58 124 L 64 196" stroke="#0f1a14" strokeWidth="13" strokeLinecap="round" fill="none" />
						<ellipse cx="33" cy="197" rx="10" ry="5" fill="#3ef08c" />
						<ellipse cx="67" cy="197" rx="10" ry="5" fill="#3ef08c" />
						{/* shorts */}
						<path d="M 31 96 L 69 96 L 66 130 L 34 130 Z" fill="#0d1712" />
						{/* body */}
						<path d="M 33 38 L 67 38 L 71 100 L 29 100 Z" fill="url(#gkKit)" />
						<path d="M 33 38 L 67 38 L 68 52 L 32 52 Z" fill="#fff" opacity="0.18" />
						{/* arms out */}
						<path d="M 34 46 Q 14 40 3 24" stroke="url(#gkKit)" strokeWidth="11" strokeLinecap="round" fill="none" />
						<path d="M 66 46 Q 86 40 97 24" stroke="url(#gkKit)" strokeWidth="11" strokeLinecap="round" fill="none" />
						<circle cx="2" cy="22" r="9" fill="#3ef08c" />
						<circle cx="98" cy="22" r="9" fill="#3ef08c" />
						{/* head */}
						<circle cx="50" cy="24" r="12.5" fill="#c98b5e" />
						<path d="M 38 20 A 12.5 12.5 0 0 1 62 20 Z" fill="#16110b" />
					</svg>
				</motion.g>

				{/* ---------------- corner targets ---------------- */}
				{CORNERS.map((c, i) => (
					<CornerTarget
						key={c.key}
						corner={c}
						index={i}
						active={aim === c.key}
						dimmed={!!aim && aim !== c.key}
						disabled={busy}
						onPick={() => takePenalty(c)}
						innerRef={(el) => {
							btnRefs.current[c.key] = el;
						}}
					/>
				))}

				{/* ---------------- net ripple ---------------- */}
				{impact && (
					<g>
						<motion.circle
							cx={impact.x}
							cy={impact.y}
							initial={{ r: 4, opacity: 0.95 }}
							animate={{ r: 150, opacity: 0 }}
							transition={{ duration: 0.62, ease: "easeOut" }}
							fill="url(#rippleGrad)"
						/>
						<motion.circle
							cx={impact.x}
							cy={impact.y}
							initial={{ r: 2, opacity: 1 }}
							animate={{ r: 96, opacity: 0 }}
							transition={{ duration: 0.45, ease: "easeOut" }}
							fill="none"
							stroke="#ffffff"
							strokeWidth="3"
						/>
						{Array.from({ length: 12 }).map((_, i) => {
							const a = (i / 12) * Math.PI * 2;
							return (
								<motion.circle
									key={i}
									cx={impact.x}
									cy={impact.y}
									r={2.6}
									fill="#eafff3"
									initial={{ x: 0, y: 0, opacity: 1 }}
									animate={{
										x: Math.cos(a) * 78,
										y: Math.sin(a) * 58 + 26,
										opacity: 0,
									}}
									transition={{ duration: 0.6, ease: "easeOut" }}
								/>
							);
						})}
					</g>
				)}

				{/* ---------------- the ball ---------------- */}
				{/* grounded shadow — stays on the spot once the ball is gone */}
				<motion.ellipse
					cx={BALL_HOME.x}
					cy={BALL_HOME.y + BALL_R + 4}
					rx={BALL_R * 0.95}
					ry={7}
					fill="#000"
					animate={{ opacity: busy ? 0 : 0.5 }}
					transition={{ duration: 0.3 }}
				/>
				<motion.g
					animate={ball}
					initial={{ x: BALL_HOME.x, y: BALL_HOME.y, scale: 1 }}
					style={{ transformBox: "view-box", transformOrigin: "0px 0px" }}
				>
					<circle r={BALL_R} fill="url(#ballSphere)" />
					<motion.g animate={spin} style={{ transformBox: "view-box", transformOrigin: "0px 0px" }}>
						<polygon points="0,-11 10,-3 6,9 -6,9 -10,-3" fill="#151b18" />
						{[0, 72, 144, 216, 288].map((a) => {
							const rad = (a * Math.PI) / 180;
							// rounded so SSR and client stringify identically
							const cx = Math.round(Math.cos(rad) * 19 * 100) / 100;
							const cy = Math.round(Math.sin(rad) * 19 * 100) / 100;
							return (
								<polygon
									key={a}
									points="0,-6.5 6,-1.8 3.6,5.4 -3.6,5.4 -6,-1.8"
									fill="#1b2320"
									opacity="0.9"
									transform={`translate(${cx} ${cy}) rotate(${a + 36})`}
								/>
							);
						})}
					</motion.g>
					<circle r={BALL_R} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.5" />
					<ellipse cx={-8} cy={-9} rx={8} ry={6} fill="#fff" opacity="0.6" />
				</motion.g>

				{/* ---------------- the taker ---------------- */}
				<motion.g animate={player} initial={{ x: 0, y: 0 }}>
					<ellipse cx="548" cy="770" rx="62" ry="12" fill="#000" opacity="0.5" />
					<svg x={447} y={382} width={195} height={390} viewBox="0 0 100 200" overflow="visible">
						{/* standing leg */}
						<motion.g
							animate={legL}
							initial={{ rotate: 0 }}
							style={{ transformBox: "view-box", transformOrigin: "44px 118px" }}
						>
							<path d="M 44 118 L 40 158 L 38 190" stroke="#e7d9c6" strokeWidth="12" strokeLinecap="round" fill="none" />
							<path d="M 40 158 L 38 190" stroke="#0d1712" strokeWidth="12.5" strokeLinecap="round" fill="none" />
							<path d="M 38 190 L 30 196 L 42 197 Z" fill="#3ef08c" />
						</motion.g>

						{/* kicking leg */}
						<motion.g
							animate={legR}
							initial={{ rotate: 0 }}
							style={{ transformBox: "view-box", transformOrigin: "58px 118px" }}
						>
							<path d="M 58 118 L 62 158 L 65 190" stroke="#e7d9c6" strokeWidth="12" strokeLinecap="round" fill="none" />
							<path d="M 62 158 L 65 190" stroke="#0d1712" strokeWidth="12.5" strokeLinecap="round" fill="none" />
							<path d="M 65 190 L 76 195 L 63 197 Z" fill="#3ef08c" />
						</motion.g>

						{/* shorts */}
						<path d="M 33 92 L 67 92 L 69 124 L 54 124 L 50 108 L 46 124 L 31 124 Z" fill="#eef4ef" />

						{/* arms */}
						<motion.g
							animate={armL}
							initial={{ rotate: 0 }}
							style={{ transformBox: "view-box", transformOrigin: "35px 44px" }}
						>
							<path d="M 35 44 Q 20 62 14 84" stroke="#e7d9c6" strokeWidth="10" strokeLinecap="round" fill="none" />
							<path d="M 35 44 Q 24 56 20 68" stroke="url(#kitBody)" strokeWidth="11" strokeLinecap="round" fill="none" />
						</motion.g>
						<motion.g
							animate={armR}
							initial={{ rotate: 0 }}
							style={{ transformBox: "view-box", transformOrigin: "65px 44px" }}
						>
							<path d="M 65 44 Q 82 58 88 78" stroke="#e7d9c6" strokeWidth="10" strokeLinecap="round" fill="none" />
							<path d="M 65 44 Q 76 54 80 66" stroke="url(#kitBody)" strokeWidth="11" strokeLinecap="round" fill="none" />
						</motion.g>

						{/* torso — back of the shirt */}
						<path d="M 34 36 L 66 36 L 70 68 L 68 96 L 32 96 L 30 68 Z" fill="url(#kitBody)" />
						<path d="M 34 36 L 66 36 L 67 44 L 33 44 Z" fill="#3ef08c" opacity="0.55" />
						<text
							x="50"
							y="54"
							textAnchor="middle"
							className="font-jersey"
							fontSize="8"
							letterSpacing="0.6"
							fill="#eafff3"
						>
							NIJHAWAN
						</text>
						<text
							x="50"
							y="84"
							textAnchor="middle"
							className="font-jersey"
							fontSize="30"
							fill="#eafff3"
						>
							10
						</text>

						{/* head */}
						<circle cx="50" cy="24" r="12.5" fill="#c98b5e" />
						<path d="M 37.5 24 A 12.5 12.5 0 0 1 62.5 24 L 62.5 20 A 12.5 12.5 0 0 0 37.5 20 Z" fill="#140f09" />
						<path d="M 38 25 Q 50 16 62 25 Q 50 12 38 25 Z" fill="#140f09" />
					</svg>
				</motion.g>

				{/* foreground vignette */}
				<rect x="0" y="0" width={W} height={H} fill="url(#vig)" pointerEvents="none" />
			</motion.svg>

			{/* ---------------- circular zoom hand-off ---------------- */}
			{zoom && (
				<motion.div
					className="fixed inset-0 z-[120] flex items-center justify-center"
					style={{ backgroundColor: "#04170d" }}
					initial={{ clipPath: `circle(0px at ${zoom.x}px ${zoom.y}px)` }}
					animate={{ clipPath: `circle(${zoomRadius}px at ${zoom.x}px ${zoom.y}px)` }}
					transition={{ duration: 0.72, ease: [0.83, 0, 0.17, 1] }}
				>
					<motion.span
						initial={{ opacity: 0, scale: 0.7 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.22, duration: 0.4 }}
						className="font-jersey text-5xl uppercase tracking-[0.3em] text-kit-neon text-glow-neon md:text-7xl"
					>
						{zoom.name}
					</motion.span>
				</motion.div>
			)}
		</>
	);
};

/* ============================================================
   Pieces
   ============================================================ */

const Banner: React.FC<
	React.PropsWithChildren<{
		x: number;
		y: number;
		w: number;
		h: number;
		tone?: "green" | "gold";
		rot?: number;
	}>
> = ({ x, y, w, h, tone = "green", rot = 0, children }) => (
	<g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
		<rect
			x={x}
			y={y}
			width={w}
			height={h}
			rx={4}
			fill={tone === "gold" ? "url(#bannerGold)" : "url(#banner)"}
			stroke={tone === "gold" ? "#f0c04a" : "#3ef08c"}
			strokeOpacity="0.4"
			strokeWidth="1.6"
		/>
		<rect x={x} y={y} width={w} height={h * 0.34} rx={4} fill="#fff" opacity="0.05" />
		{children}
	</g>
);

const CornerTarget: React.FC<{
	corner: Corner;
	index: number;
	active: boolean;
	dimmed: boolean;
	disabled: boolean;
	onPick: () => void;
	innerRef: (el: SVGGElement | null) => void;
}> = ({ corner, index, active, dimmed, disabled, onPick, innerRef }) => {
	const left = corner.x < 800;

	return (
		<motion.g
			ref={innerRef}
			role="link"
			tabIndex={0}
			aria-label={`${corner.name} — shoot into the ${corner.label.toLowerCase()} corner`}
			onClick={onPick}
			onKeyDown={(e: React.KeyboardEvent) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onPick();
				}
			}}
			className={disabled ? "cursor-default" : "cursor-pointer"}
			style={{ transformBox: "fill-box", transformOrigin: "center", outline: "none" }}
			initial={{ opacity: 0, scale: 0.6 }}
			animate={{
				opacity: dimmed ? 0.2 : 1,
				scale: active ? 1.14 : 1,
			}}
			transition={{ delay: dimmed || active ? 0 : 0.5 + index * 0.11, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			whileHover={disabled ? {} : { scale: 1.12 }}
		>
			{/* reticle */}
			<circle
				cx={corner.x}
				cy={corner.y}
				r={40}
				fill="#04170d"
				fillOpacity="0.55"
				stroke={active ? "#f0c04a" : "#3ef08c"}
				strokeWidth="2.4"
			/>
			<motion.circle
				cx={corner.x}
				cy={corner.y}
				r={40}
				fill="none"
				stroke="#3ef08c"
				strokeWidth="1.4"
				animate={{ r: [40, 58], opacity: [0.75, 0] }}
				transition={{ duration: 2.1, repeat: Infinity, delay: index * 0.4, ease: "easeOut" }}
			/>
			<g stroke={active ? "#f0c04a" : "#eafff3"} strokeWidth="2.4" strokeLinecap="round">
				<line x1={corner.x - 13} y1={corner.y} x2={corner.x - 5} y2={corner.y} />
				<line x1={corner.x + 5} y1={corner.y} x2={corner.x + 13} y2={corner.y} />
				<line x1={corner.x} y1={corner.y - 13} x2={corner.x} y2={corner.y - 5} />
				<line x1={corner.x} y1={corner.y + 5} x2={corner.x} y2={corner.y + 13} />
			</g>

			{/* label plate */}
			<g transform={`translate(${corner.x + (left ? -46 : 46)} ${corner.y})`}>
				<rect
					x={left ? -196 : 0}
					y={-21}
					width={196}
					height={42}
					rx={3}
					fill="#04170d"
					fillOpacity="0.86"
					stroke={active ? "#f0c04a" : "#3ef08c"}
					strokeOpacity="0.6"
					strokeWidth="1.6"
				/>
				<text
					x={left ? -14 : 14}
					y={-2}
					textAnchor={left ? "end" : "start"}
					className="font-jersey"
					fontSize="24"
					letterSpacing="1.6"
					fill={active ? "#f0c04a" : "#eafff3"}
				>
					{corner.name.toUpperCase()}
				</text>
				<text
					x={left ? -14 : 14}
					y={13}
					textAnchor={left ? "end" : "start"}
					className="font-stadium"
					fontSize="12"
					letterSpacing="2.6"
					fill="#6fc79b"
				>
					{corner.label.toUpperCase()} CORNER
				</text>
			</g>
		</motion.g>
	);
};
