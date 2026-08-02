"use client";

import { Navigation } from "../components/nav";
import { PitchBackdrop } from "../components/stadium";
import { SectionHeader } from "../components/section-header";
import { skillsData } from "@/util/data";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * Presentation-only mapping from the existing skill categories onto pitch
 * positions. Nothing here changes how the data is stored.
 */
const LINES: Record<
	string,
	{ pos: string; role: string; accent: string; order: number }
> = {
	Frontend: { pos: "FWD", role: "Front line", accent: "#ff8a4c", order: 0 },
	"Data Science & AI": { pos: "AM", role: "Attacking mid", accent: "#9b7dff", order: 1 },
	"Backend & Databases": { pos: "CM", role: "Engine room", accent: "#3ef08c", order: 2 },
	"DevOps & Databases": { pos: "DEF", role: "Back four", accent: "#4fd196", order: 3 },
	Programming: { pos: "GK", role: "Between the sticks", accent: "#f0c04a", order: 4 },
};

const FALLBACK = { pos: "SUB", role: "Bench", accent: "#8fb9a6", order: 9 };

const entries = Object.entries(skillsData)
	.map(([category, skills]) => ({
		category,
		skills: skills as string[],
		...(LINES[category] ?? FALLBACK),
	}))
	.sort((a, b) => a.order - b.order);

const outfield = entries.filter((e) => e.pos !== "GK");
const formation = [...outfield].reverse().map((e) => e.skills.length).join("-");
const squadSize = entries.reduce((n, e) => n + e.skills.length, 0);
const maxLine = Math.max(...entries.map((e) => e.skills.length));

export default function SkillsPage() {
	const [hover, setHover] = useState<string | null>(null);

	return (
		<div className="relative min-h-screen pb-24">
			<PitchBackdrop />
			<Navigation />

			<div className="container mx-auto max-w-6xl px-4 pt-24 md:pt-28">
				<SectionHeader
					kicker="Team sheet"
					title="The Squad"
					subtitle="Every technology I work with, lined up by where it plays."
					stat={`Formation ${formation}`}
				/>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
					{/* ---------------- the pitch ---------------- */}
					<div className="lg:col-span-8">
						<div style={{ perspective: 1600 }}>
							<motion.div
								initial={{ opacity: 0, rotateX: 18, y: 40 }}
								animate={{ opacity: 1, rotateX: 7, y: 0 }}
								transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
								style={{ transformStyle: "preserve-3d" }}
								className="relative overflow-hidden rounded-xl border border-emerald-300/25 shadow-[0_40px_90px_-30px_rgba(0,0,0,.9)]"
							>
								{/* turf */}
								<div className="absolute inset-0 turf-stripes turf-blades" />
								<div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,rgba(233,255,242,.10),transparent_75%)]" />

								{/* markings */}
								<div className="pointer-events-none absolute inset-4 border-2 border-white/20" />
								<div className="pointer-events-none absolute inset-x-4 top-1/2 h-[2px] -translate-y-1/2 bg-white/20" />
								<div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20" />
								<div className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35" />
								{/* penalty areas */}
								<div className="pointer-events-none absolute left-1/2 top-4 h-[13%] w-[56%] -translate-x-1/2 border-2 border-t-0 border-white/20" />
								<div className="pointer-events-none absolute bottom-4 left-1/2 h-[13%] w-[56%] -translate-x-1/2 border-2 border-b-0 border-white/20" />
								<div className="pointer-events-none absolute left-1/2 top-4 h-[6%] w-[28%] -translate-x-1/2 border-2 border-t-0 border-white/20" />
								<div className="pointer-events-none absolute bottom-4 left-1/2 h-[6%] w-[28%] -translate-x-1/2 border-2 border-b-0 border-white/20" />

								{/* lines of players */}
								<div className="relative flex min-h-[680px] flex-col justify-between gap-6 px-4 py-12 md:min-h-[760px] md:px-8">
									{entries.map((line, li) => (
										<div
											key={line.category}
											onMouseEnter={() => setHover(line.category)}
											onMouseLeave={() => setHover(null)}
											className="relative"
										>
											{/* line label */}
											<div className="mb-2 flex items-center justify-center gap-2">
												<span
													className="h-px w-6"
													style={{ background: `${line.accent}66` }}
												/>
												<span
													className="font-stadium text-[10px] font-bold uppercase tracking-[0.3em] transition-opacity duration-300"
													style={{
														color: line.accent,
														opacity: hover && hover !== line.category ? 0.35 : 1,
													}}
												>
													{line.pos} · {line.category}
												</span>
												<span
													className="h-px w-6"
													style={{ background: `${line.accent}66` }}
												/>
											</div>

											<div className="flex flex-wrap items-center justify-center gap-2">
												{line.skills.map((skill, si) => (
													<motion.div
														key={skill}
														initial={{ opacity: 0, scale: 0.7, y: 14 }}
														animate={{ opacity: 1, scale: 1, y: 0 }}
														transition={{
															delay: 0.35 + li * 0.09 + si * 0.03,
															duration: 0.45,
															ease: [0.22, 1.4, 0.36, 1],
														}}
														whileHover={{ scale: 1.12, y: -4 }}
														className="group relative flex items-center gap-1.5 rounded-full border bg-black/65 py-1 pl-1 pr-3 backdrop-blur-sm transition-colors duration-200"
														style={{
															borderColor: `${line.accent}59`,
															opacity: hover && hover !== line.category ? 0.35 : 1,
														}}
													>
														<span
															className="flex h-6 w-6 items-center justify-center rounded-full font-jersey text-[11px] leading-none text-black"
															style={{ background: line.accent }}
														>
															{si + 1}
														</span>
														<span className="whitespace-nowrap font-stadium text-[13px] font-semibold uppercase tracking-wide text-emerald-50/90">
															{skill}
														</span>
														<span
															className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
															style={{ boxShadow: `0 0 22px -2px ${line.accent}` }}
														/>
													</motion.div>
												))}
											</div>
										</div>
									))}
								</div>
							</motion.div>
						</div>
					</div>

					{/* ---------------- team sheet panel ---------------- */}
					<aside className="space-y-4 lg:col-span-4">
						<motion.div
							initial={{ opacity: 0, x: 24 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
							className="overflow-hidden rounded-lg border border-emerald-400/25 bg-black/60 backdrop-blur-md"
						>
							<div className="flex items-center justify-between border-b border-emerald-400/20 bg-emerald-500/10 px-4 py-2.5">
								<span className="font-stadium text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-200/80">
									Squad depth
								</span>
								<span className="font-jersey text-lg leading-none text-kit-gold">
									{squadSize}
								</span>
							</div>
							<div className="space-y-3.5 p-4">
								{entries.map((line, i) => (
									<div key={line.category}>
										<div className="mb-1 flex items-baseline justify-between gap-2">
											<span className="font-stadium text-xs uppercase tracking-[0.16em] text-emerald-50/80">
												<span
													className="mr-2 inline-block rounded-sm px-1 font-jersey text-[10px] text-black"
													style={{ background: line.accent }}
												>
													{line.pos}
												</span>
												{line.category}
											</span>
											<span className="font-jersey text-sm text-white/70">
												{line.skills.length}
											</span>
										</div>
										<div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
											<motion.div
												initial={{ width: 0 }}
												animate={{ width: `${(line.skills.length / maxLine) * 100}%` }}
												transition={{ delay: 0.45 + i * 0.09, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
												className="h-full rounded-full"
												style={{ background: line.accent, boxShadow: `0 0 12px ${line.accent}88` }}
											/>
										</div>
									</div>
								))}
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 24 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
							className="rounded-lg border border-kit-gold/30 bg-kit-gold/[0.06] p-4 backdrop-blur-md"
						>
							<div className="font-stadium text-[10px] uppercase tracking-[0.3em] text-kit-gold/80">
								Manager's note
							</div>
							<p className="mt-2 font-stadium text-[15px] leading-snug text-emerald-50/70">
								Lines up{" "}
								<span className="font-bold text-kit-gold">{formation}</span> —
								deepest through the engine room and the front line, with the
								fundamentals holding the back.
							</p>
						</motion.div>
					</aside>
				</div>
			</div>
		</div>
	);
}
