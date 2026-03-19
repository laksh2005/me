"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { projectsData } from "@/util/data";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectsPage() {
	const router = useRouter();
	const [hoveredProject, setHoveredProject] = useState<string | null>(null);

	const getBorderColor = (slug: string, type: string) => {
		if (slug === "codepersona") return "border-yellow-500";
		if (type === "dev") return "border-blue-900/50";
		if (type === "ml") return "border-purple-900/50";
		return "border-zinc-800";
	};

	const getHoverBorderColor = (slug: string, type: string) => {
		if (slug === "codepersona") return "hover:border-yellow-400";
		if (type === "dev") return "hover:border-blue-700/80";
		if (type === "ml") return "hover:border-purple-700/80";
		return "hover:border-zinc-600";
	};

	return (
		<div className="relative pb-16 page-enter">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h1 className="text-4xl font-serif-title font-bold tracking-tight text-zinc-100 sm:text-5xl element-enter-1">
						Projects
					</h1>
					<p className="mt-4 text-zinc-400 element-enter-2">
						Stuff I made with a motive of learning, and some straight out of
						random sticky notes at my desk
					</p>
				</div>

			{/* Projects Grid - 2 Columns */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 element-enter-3">
				{projectsData.map((project, idx) => (
					<div
						key={project.slug}
						onMouseEnter={() => setHoveredProject(project.slug)}
						onMouseLeave={() => setHoveredProject(null)}
						style={{ animationDelay: `${idx * 0.05}s` }}
					>
						<Card>
							<article
								className={`relative w-full h-full p-4 cursor-pointer border-2 transition-all duration-300 ${getBorderColor(
									project.slug,
									project.type,
								)} ${getHoverBorderColor(
									project.slug,
									project.type,
								)} rounded-lg overflow-hidden`}
								onClick={() => router.push(`/projects/${project.slug}`)}
							>
								{/* Type Badge */}
								<div className="flex items-start justify-between mb-4">
									<span
										className={`text-xs font-semibold px-3 py-1 rounded-full ${
											project.type === "dev"
												? "bg-blue-900/30 text-blue-300"
												: "bg-purple-900/30 text-purple-300"
										}`}
									>
										{project.type === "dev"
											? "Development"
											: "Machine Learning"}
									</span>
								</div>
									<div className="mb-4">
										<div className="mb-4 flex items-baseline gap-2">
											<h3 className="text-xl font-serif-title font-bold text-zinc-100 group-hover:text-white transition-colors">
												{project.name}
											</h3>

											{/* Hover Text */}
											<div
												className={`mt-3 text-sm text-zinc-500 transition-opacity duration-300 ${
													hoveredProject === project.slug
														? "opacity-100"
														: "opacity-0"
												}`}
											>
												(tap if curious)
											</div>
										</div>
									</div>

									{/* Description */}
									<p className="text-sm leading-6 text-zinc-400 mb-4">
										{project.description[0]}
									</p>

									{/* Tech Stack */}
									<div className="flex flex-wrap gap-2 mb-6">
										{project.tech_stack.slice(0, 3).map((tech) => (
											<span
												key={tech}
												className="px-2 py-1 text-xs text-zinc-400 border border-zinc-700 rounded"
											>
												{tech}
											</span>
										))}
									</div>

									{/* Links */}
									<div className="flex gap-3 flex-wrap">
										{project.live && (
											<a
												href={project.live}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition"
												onClick={(e) => e.stopPropagation()}
											>
												<ExternalLink size={14} />
												Live
											</a>
										)}
										{project.github && (
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition"
												onClick={(e) => e.stopPropagation()}
											>
												<Github size={14} />
												GitHub
											</a>
										)}
									</div>
								</article>
							</Card>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
