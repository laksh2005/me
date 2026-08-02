"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

import { Navigation } from "../components/nav";
import { PitchBackdrop } from "../components/stadium";
import { SectionHeader } from "../components/section-header";
import { TiltCard } from "../components/tilt-card";
import { projectsData } from "@/util/data";

type Project = (typeof projectsData)[number];

/** Card rating derived from what the project actually has shipped. */
function rating(p: Project) {
	if (p.slug === "codepersona") return 99;
	let r = 78;
	if (p.name.includes("⭐")) r += 9;
	if (p.live) r += 4;
	if (p.github) r += 2;
	r += Math.min(p.tech_stack.length, 5);
	return Math.min(r, 97);
}

function tier(p: Project) {
	if (p.slug === "codepersona")
		return { cls: "card-icon", ink: "#2a1f04", label: "Icon", accent: "#f7e39a" };
	if (p.name.includes("⭐"))
		return { cls: "card-gold", ink: "#2c2205", label: "Gold", accent: "#f4d375" };
	if (p.type === "ml")
		return { cls: "card-special", ink: "#140a26", label: "Special", accent: "#c9b6ff" };
	return { cls: "card-steel", ink: "#04140b", label: "Rare", accent: "#9fefc6" };
}

const cleanName = (n: string) => n.replace("⭐", "").trim();

const FILTERS = [
	{ key: "all", label: "Full squad" },
	{ key: "dev", label: "Development" },
	{ key: "ml", label: "Machine learning" },
] as const;

export default function ProjectsPage() {
	const router = useRouter();
	const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

	const shown = useMemo(
		() => (filter === "all" ? projectsData : projectsData.filter((p) => p.type === filter)),
		[filter],
	);

	return (
		<div className="relative min-h-screen pb-24">
			<PitchBackdrop />
			<Navigation />

			<div className="container mx-auto max-w-7xl px-4 pt-24 md:pt-28 lg:px-8">
				<SectionHeader
					kicker="Silverware"
					title="Trophies"
					subtitle="Things I made to learn, and some straight off the sticky notes on my desk."
					stat={`${projectsData.length} in the cabinet`}
				/>

				{/* filters */}
				<div className="mb-10 flex flex-wrap gap-2">
					{FILTERS.map((f) => {
						const active = filter === f.key;
						const n =
							f.key === "all"
								? projectsData.length
								: projectsData.filter((p) => p.type === f.key).length;
						return (
							<button
								key={f.key}
								onClick={() => setFilter(f.key)}
								className={`rounded-sm border px-4 py-2 font-stadium text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
									active
										? "border-kit-neon bg-kit-neon text-black shadow-[0_0_26px_-6px_rgba(62,240,140,.9)]"
										: "border-emerald-400/25 text-emerald-100/60 hover:border-emerald-400/60 hover:text-emerald-100"
								}`}
							>
								{f.label}
								<span className={active ? "ml-2 text-black/60" : "ml-2 text-emerald-100/35"}>
									{n}
								</span>
							</button>
						);
					})}
				</div>

				{/* cards */}
				<motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<AnimatePresence mode="popLayout">
						{shown.map((project, idx) => {
							const t = tier(project);
							const ovr = rating(project);

							return (
								<motion.div
									key={project.slug}
									layout
									initial={{ opacity: 0, y: 30, scale: 0.94 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, scale: 0.92 }}
									transition={{ delay: idx * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
								>
									<TiltCard
										className="group h-full cursor-pointer"
										onClick={() => router.push(`/projects/${project.slug}`)}
									>
										<div
											className={`relative flex h-full flex-col overflow-hidden rounded-xl p-[2px] ${t.cls}`}
											style={{ boxShadow: "0 28px 60px -24px rgba(0,0,0,.95)" }}
										>
											{/* foil sweep */}
											<span className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl">
												<span className="holo-foil absolute inset-y-0 -left-1/3 w-1/3 opacity-0 group-hover:animate-holo group-hover:opacity-100" />
											</span>

											<div
												className="relative flex h-full flex-col rounded-[10px] px-4 pb-4 pt-3"
												style={{ background: `linear-gradient(175deg, ${t.ink}f2, #01060380)` }}
											>
												{/* header: rating + position */}
												<div className="flex items-start justify-between">
													<div className="leading-none">
														<div
															className="font-jersey text-4xl leading-none"
															style={{ color: t.accent }}
														>
															{ovr}
														</div>
														<div
															className="mt-1 font-stadium text-[11px] font-bold uppercase tracking-[0.18em]"
															style={{ color: t.accent, opacity: 0.75 }}
														>
															{project.type === "dev" ? "DEV" : "AI"}
														</div>
														<div className="mt-1.5 h-px w-7" style={{ background: `${t.accent}66` }} />
														<div
															className="mt-1.5 font-stadium text-[9px] uppercase tracking-[0.22em]"
															style={{ color: t.accent, opacity: 0.6 }}
														>
															{t.label}
														</div>
													</div>

													{/* crest / thumbnail */}
													<div className="relative h-24 w-24 overflow-hidden rounded-lg border border-white/10 md:h-28 md:w-28">
														{project.image ? (
															<Image
																src={project.image}
																alt={cleanName(project.name)}
																fill
																sizes="120px"
																className="object-cover transition-transform duration-700 group-hover:scale-110"
															/>
														) : (
															<div className="h-full w-full bg-black/40" />
														)}
														<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
													</div>
												</div>

												{/* name */}
												<div className="mt-3 border-t border-white/10 pt-2.5">
													<h3
														className="truncate font-jersey text-lg uppercase leading-tight md:text-xl"
														style={{ color: t.accent }}
														title={cleanName(project.name)}
													>
														{cleanName(project.name)}
													</h3>
												</div>

												{/* attributes = the real tech stack */}
												<div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1">
													{project.tech_stack.slice(0, 6).map((tech) => (
														<div
															key={tech}
															className="flex items-center gap-1.5 overflow-hidden"
														>
															<span
																className="h-1 w-1 flex-shrink-0 rounded-full"
																style={{ background: t.accent }}
															/>
															<span
																className="truncate font-stadium text-[11px] uppercase tracking-wide"
																style={{ color: `${t.accent}cc` }}
																title={tech}
															>
																{tech}
															</span>
														</div>
													))}
												</div>

												<p className="mt-3 line-clamp-3 flex-grow text-[13px] leading-relaxed text-white/55">
													{project.description[0]}
												</p>

												{/* links */}
												<div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-2.5">
													{project.live && (
														<a
															href={project.live}
															target="_blank"
															rel="noopener noreferrer"
															onClick={(e) => e.stopPropagation()}
															className="inline-flex items-center gap-1.5 font-stadium text-[11px] font-bold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
														>
															<ExternalLink size={12} />
															Live
														</a>
													)}
													{project.github && (
														<a
															href={project.github}
															target="_blank"
															rel="noopener noreferrer"
															onClick={(e) => e.stopPropagation()}
															className="inline-flex items-center gap-1.5 font-stadium text-[11px] font-bold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
														>
															<Github size={12} />
															Code
														</a>
													)}
													<span
														className="ml-auto font-stadium text-[10px] uppercase tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
														style={{ color: t.accent }}
													>
														Match report →
													</span>
												</div>
											</div>
										</div>
									</TiltCard>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</motion.div>
			</div>
		</div>
	);
}
