"use client";
import { useParams } from "next/navigation";
import { Navigation } from "@/app/components/nav";
import { projectsData } from "@/util/data";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProjectDetailPage() {
	const params = useParams();
	const slug = (params?.slug as string) || "";

	const project = projectsData.find((p) => p.slug === slug);

	if (!project) {
		return (
			<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
				<Navigation />
				<div className="container px-4 pt-20 mx-auto max-w-4xl">
					<div className="text-center py-16">
						<h1 className="text-2xl font-bold text-zinc-100">
							Project not found
						</h1>
						{/* <Link href="/projects" className="mt-4 text-zinc-400 hover:text-zinc-200">
              Back to projects
            </Link> */}
					</div>
				</div>
			</div>
		);
	}

	const firstLine = project.description?.[0] || "";
	const secondLine = project.description?.[1] || "";
	const additional = project.description?.slice(2) || [];

	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen pb-16">
			<Navigation />
			<div className="container px-4 pt-20 mx-auto max-w-4xl md:pt-24 lg:pt-32">
				<div className="mb-10">
					{/* <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 mb-4 transition">
            <ArrowLeft size={16} />
            Back to projects
          </Link> */}
					<h1 className="text-4xl font-serif-title font-bold text-zinc-100 sm:text-5xl mb-3">
						{project.name}
					</h1>
					<p className="text-md text-zinc-400 mb-6">{firstLine}</p>
				</div>

				<div className="w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/60">
					{project.image ? (
						<div className="relative w-full h-64 md:h-72">
							<Image
								src={project.image}
								alt={project.name}
								fill
								className="object-cover"
							/>
						</div>
					) : (
						<div className="w-full h-64 md:h-72 bg-zinc-800" />
					)}
				</div>

				<p className="mt-4 text-md text-zinc-400">{secondLine}</p>

				<div className="mt-6 text-sm text-zinc-300 space-y-2">
					{additional.map((desc, i) => (
						<p key={i}>• {desc}</p>
					))}
				</div>

				<div className="mt-6">
					<div className="flex flex-wrap gap-2 mb-6">
						{project.tech_stack.map((tech) => (
							<span
								key={tech}
								className="px-2 py-1 text-sm text-zinc-300 border border-zinc-700 rounded"
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				<div className="flex gap-2 flex-wrap">
					{project.live && (
						<a
							href={project.live}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-100 rounded hover:bg-zinc-700 transition"
						>
							<ExternalLink size={16} />
							Live Demo
						</a>
					)}
					{project.github && (
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-100 rounded hover:bg-zinc-700 transition"
						>
							<Github size={16} />
							GitHub
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
