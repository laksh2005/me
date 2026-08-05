"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { experienceData, skillsData } from "@/util/data";

const Reveal: React.FC<{
	children: React.ReactNode;
	delay?: number;
	className?: string;
	y?: number;
}> = ({ children, delay = 0, className = "", y = 20 }) => (
	<motion.div
		initial={{ opacity: 0, y }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, margin: "-100px" }}
		transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
		className={className}
	>
		{children}
	</motion.div>
);

/** Centered kicker + serif headline — mirrors the hero's own rhythm. */
const SectionIntro: React.FC<{
	kicker: string;
	title: string;
	sub?: string;
}> = ({ kicker, title, sub }) => (
	<Reveal className="flex flex-col items-center text-center">
		<span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300/70">
			{kicker}
		</span>
		<h2 className="font-serif-title mt-4 text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.05] text-white">
			{title}
		</h2>
		{sub && (
			<p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-zinc-500">
				{sub}
			</p>
		)}
	</Reveal>
);

/* ---------------------------------------------------------------- */

export const ExperienceSection: React.FC = () => (
	<section id="experience" className="relative scroll-mt-16 px-6 py-28 md:py-36">
		<SectionIntro
			kicker="Career"
			title="Where I've worked"
			sub="Four teams, each one changing how I build."
		/>

		<div className="relative mx-auto mt-20 max-w-2xl">
			{/* the spine */}
			<div className="absolute bottom-2 left-[23px] top-2 w-px bg-gradient-to-b from-violet-300/40 via-white/10 to-transparent" />

			<div className="space-y-14">
				{experienceData.map((exp, i) => (
					<Reveal key={exp.company} delay={i * 0.07} className="relative pl-[4.5rem]">
						{/* node */}
						<div className="absolute left-0 top-0.5 flex h-12 w-12 items-center justify-center">
							<div className="absolute h-3 w-3 rounded-full border-2 border-[#08080A] bg-violet-300 shadow-[0_0_0_3px_rgba(167,139,250,0.15)]" />
						</div>

						<div className="flex items-start gap-4">
							{exp.image && (
								<div className="relative -ml-[4.5rem] h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.03]">
									<Image
										src={exp.image}
										alt={exp.company}
										fill
										sizes="48px"
										className="object-cover"
									/>
								</div>
							)}

							<div className="min-w-0 flex-1 pt-1">
								<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
									<h3 className="font-serif-title text-2xl leading-tight text-white">
										{exp.company}
									</h3>
									<span className="text-[11.5px] text-zinc-600">
										{exp.duration}
									</span>
								</div>

								<div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
									<span className="text-[13px] font-medium text-violet-300/80">
										{exp.role}
									</span>
									<span className="flex items-center gap-1 text-[11.5px] text-zinc-500">
										<MapPin size={11} />
										{exp.location} · {exp.mode}
									</span>
								</div>

								<div className="mt-3.5 space-y-2">
									{exp.description.map((d, j) => (
										<p
											key={j}
											className="max-w-lg text-[14px] leading-relaxed text-zinc-400"
										>
											{d}
										</p>
									))}
								</div>
							</div>
						</div>
					</Reveal>
				))}
			</div>
		</div>
	</section>
);

/* ---------------------------------------------------------------- */

export const SkillsSection: React.FC = () => (
	<section id="skills" className="relative scroll-mt-16 px-6 py-28 md:py-36">
		<SectionIntro
			kicker="Toolkit"
			title="What I work with"
			sub="Everything below has shipped in something real."
		/>

		<div className="mx-auto mt-20 max-w-3xl space-y-12">
			{Object.entries(skillsData).map(([domain, list], i) => (
				<Reveal key={domain} delay={i * 0.06}>
					<h3 className="font-serif-title text-xl text-white/90 md:text-2xl">
						{domain}
					</h3>
					<div className="mt-4 flex flex-wrap gap-2.5">
						{(list as string[]).map((s) => (
							<span
								key={s}
								className="group relative rounded-full border border-white/[0.09] bg-white/[0.02] px-4 py-2 text-[13.5px] text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/30 hover:bg-violet-300/[0.05] hover:text-white"
							>
								{s}
							</span>
						))}
					</div>
				</Reveal>
			))}
		</div>
	</section>
);
