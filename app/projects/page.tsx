"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Navigation } from "../components/nav";
import { projectsData } from "@/util/data";

const Reveal: React.FC<{
	children: React.ReactNode;
	delay?: number;
	className?: string;
	y?: number;
}> = ({ children, delay = 0, className = "", y = 20 }) => (
	<motion.div
		initial={{ opacity: 0, y }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, margin: "-90px" }}
		transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
		className={className}
	>
		{children}
	</motion.div>
);

export default function ProjectsPage() {
	const router = useRouter();

	return (
		<div className="relative min-h-screen pb-28 pt-32 md:pt-40">
			<Navigation />

			<div className="px-6">
				<Reveal className="flex flex-col items-center text-center">
					<span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300/70">
						Projects
					</span>
					<h1 className="font-serif-title mt-4 text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] text-white">
						Things I've built
					</h1>
					<p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-zinc-500">
						Some made to learn, some straight off the sticky notes at my desk.{" "}
						{projectsData.length} shipped so far.
					</p>
				</Reveal>

				<div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
					{projectsData.map((project, idx) => (
						<Reveal key={project.slug} delay={Math.min(idx, 6) * 0.05}>
							<article
								onClick={() => router.push(`/projects/${project.slug}`)}
								className="group relative flex h-full cursor-pointer flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/25 hover:bg-white/[0.035]"
							>
								<div className="flex items-start justify-between gap-3">
									<h3 className="font-serif-title text-2xl leading-tight text-white">
										{project.name}
									</h3>
									<span className="shrink-0 rounded-full border border-white/[0.1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
										{project.type === "dev" ? "Dev" : "ML"}
									</span>
								</div>

								<p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-zinc-400">
									{project.description[0]}
								</p>

								<div className="mt-5 flex flex-wrap gap-1.5">
									{project.tech_stack.slice(0, 4).map((tech) => (
										<span
											key={tech}
											className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[11px] text-zinc-500"
										>
											{tech}
										</span>
									))}
								</div>

								<div className="mt-5 flex gap-5 border-t border-white/[0.07] pt-4">
									{project.live && (
										<a
											href={project.live}
											target="_blank"
											rel="noopener noreferrer"
											onClick={(e) => e.stopPropagation()}
											className="inline-flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 transition-colors hover:text-violet-300"
										>
											<ExternalLink size={13} />
											Live
										</a>
									)}
									{project.github && (
										<a
											href={project.github}
											target="_blank"
											rel="noopener noreferrer"
											onClick={(e) => e.stopPropagation()}
											className="inline-flex items-center gap-1.5 text-[12px] font-medium text-zinc-400 transition-colors hover:text-violet-300"
										>
											<Github size={13} />
											Source
										</a>
									)}
								</div>
							</article>
						</Reveal>
					))}
				</div>
			</div>
		</div>
	);
}
