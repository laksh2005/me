"use client";

import { Navigation } from "../components/nav";
import { PitchBackdrop } from "../components/stadium";
import { SectionHeader } from "../components/section-header";
import { BallDot } from "../components/football";
import { experienceData } from "@/util/data";
import { MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/** Purely presentational role framing — the data itself is untouched. */
const SHIRT = ["01", "02", "03", "04", "05", "06", "07", "08"];

export default function ExperiencePage() {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

	return (
		<div className="relative min-h-screen pb-24">
			<PitchBackdrop />
			<Navigation />

			<div className="container mx-auto max-w-4xl px-4 pt-24 md:pt-28">
				<SectionHeader
					kicker="Club history"
					title="Career"
					subtitle="Every side I've turned out for, and what I actually did there."
					stat={`${experienceData.length} clubs`}
				/>

				{/* the career ladder */}
				<div className="relative">
					<div className="absolute bottom-4 left-[27px] top-4 w-px bg-gradient-to-b from-kit-neon/60 via-emerald-500/25 to-transparent md:left-[35px]" />

					<div className="space-y-4">
						{experienceData.map((exp, index) => {
							const open = expandedIndex === index;
							const current = index === 0;

							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -24 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{
										delay: 0.1 + index * 0.08,
										duration: 0.6,
										ease: [0.22, 1, 0.36, 1],
									}}
									className="relative pl-14 md:pl-20"
								>
									{/* crest on the timeline */}
									<div className="absolute left-0 top-4 z-10">
										<div
											className={`crest-shape relative h-14 w-12 overflow-hidden border md:h-16 md:w-14 ${
												current
													? "border-kit-gold/70 shadow-[0_0_24px_-4px_rgba(240,192,74,.7)]"
													: "border-emerald-400/35"
											}`}
											style={{ background: "#04170d" }}
										>
											{exp.image ? (
												<Image
													src={exp.image}
													alt={exp.company}
													width={64}
													height={72}
													className="h-full w-full object-cover opacity-90"
												/>
											) : (
												<div className="flex h-full w-full items-center justify-center font-jersey text-lg text-emerald-200">
													{exp.company.slice(0, 2).toUpperCase()}
												</div>
											)}
										</div>
									</div>

									<div
										className={`overflow-hidden rounded-lg border backdrop-blur-md transition-colors duration-300 ${
											open
												? "border-kit-neon/50 bg-black/60"
												: "border-emerald-400/15 bg-black/40 hover:border-emerald-400/40"
										}`}
									>
										<button
											onClick={() => setExpandedIndex(open ? null : index)}
											className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left md:px-6 md:py-5"
										>
											<div className="min-w-0 flex-1">
												<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
													<span className="font-jersey text-2xl leading-none text-white/15">
														{SHIRT[index] ?? "00"}
													</span>
													<h3 className="font-jersey text-xl uppercase leading-none text-white md:text-2xl">
														{exp.company}
													</h3>
													{current && (
														<span className="rounded-sm bg-kit-gold px-1.5 py-0.5 font-stadium text-[10px] font-bold uppercase tracking-[0.14em] text-black">
															Most recent
														</span>
													)}
												</div>
												<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-stadium text-sm uppercase tracking-[0.14em]">
													<span className="text-kit-neon">{exp.role}</span>
													<span className="text-emerald-100/40">{exp.duration}</span>
												</div>
											</div>

											<ChevronDown
												size={20}
												className={`mt-1 flex-shrink-0 text-emerald-200/50 transition-transform duration-300 ${
													open ? "rotate-180 text-kit-neon" : ""
												}`}
											/>
										</button>

										<AnimatePresence initial={false}>
											{open && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: "auto", opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
													className="overflow-hidden"
												>
													<div className="space-y-4 border-t border-emerald-400/15 bg-emerald-500/[0.04] px-4 py-5 md:px-6">
														<div className="flex items-center gap-2 font-stadium text-xs uppercase tracking-[0.2em] text-emerald-100/50">
															<MapPin size={14} className="text-kit-neon" />
															{exp.location} · {exp.mode}
														</div>

														<div className="space-y-3">
															<div className="font-stadium text-[10px] uppercase tracking-[0.34em] text-emerald-200/40">
																Highlights
															</div>
															{exp.description.map((desc, i) => (
																<div key={i} className="flex items-start gap-3">
																	<BallDot size={11} className="mt-1.5" />
																	<p className="text-sm leading-relaxed text-emerald-50/70 md:text-[15px]">
																		{desc}
																	</p>
																</div>
															))}
														</div>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
