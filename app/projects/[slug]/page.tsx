import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	ArrowLeft,
	ArrowRight,
	ArrowUpRight,
	Github,
	ExternalLink,
	Star,
} from "lucide-react";
import { projectsData } from "@/util/data";
import { ReportView } from "./view";
import { ProjectVideo } from "@/app/components/project-video";

/**
 * A single project.
 *
 * Statically generated for every slug, so a link shared with a recruiter
 * resolves instantly rather than waiting on a render. The console on `/`
 * links here for anyone who wants the long form version of an answer.
 */

const STAR = "⭐";
const clean = (n: string) => n.replace(STAR, "").trim();
const isStar = (n: string) => n.includes(STAR);

export async function generateStaticParams() {
	return projectsData.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailPage({
	params,
}: {
	params: { slug: string };
}) {
	const index = projectsData.findIndex((p) => p.slug === params.slug);
	const project = projectsData[index];

	if (!project) {
		return (
			<div className="ak-page">
				<Link href="/projects" className="ak-back">
					<ArrowLeft size={13} />
					All projects
				</Link>
				<header className="ak-page-head">
					<span className="ak-eyebrow">404</span>
					<h1 className="ak-title">Project not found</h1>
					<p className="ak-sub">
						That one does not exist. The index has everything that does.
					</p>
				</header>
			</div>
		);
	}

	const [tagline, ...rest] = project.description ?? [];
	const prev = projectsData[(index - 1 + projectsData.length) % projectsData.length];
	const next = projectsData[(index + 1) % projectsData.length];
	const video = (project as { video?: string }).video;

	return (
		<div className="ak-page">
			<div className="flex items-center justify-between">
				<Link href="/projects" className="ak-back">
					<ArrowLeft size={13} />
					All projects
				</Link>
				<span className="ak-eyebrow pt-[1.6rem]">
					{String(index + 1).padStart(2, "0")} /{" "}
					{String(projectsData.length).padStart(2, "0")}
				</span>
			</div>

			<header className="ak-page-head">
				<div className="flex flex-wrap items-center gap-2">
					<span className="ak-chip">
						{project.type === "dev" ? "Product" : "Machine learning"}
					</span>
					{isStar(project.name) && (
						<span className="ak-flag">
							<Star size={9} fill="currentColor" strokeWidth={0} />
							Flagship
						</span>
					)}
				</div>

				<h1 className="ak-title">{clean(project.name)}</h1>
				{tagline && <p className="ak-sub">{tagline}</p>}

				<div className="ak-links">
					{project.live && (
						<a
							href={project.live}
							target="_blank"
							rel="noopener noreferrer"
							className="ak-link"
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
							className="ak-link"
						>
							<Github size={12} />
							Source
						</a>
					)}
				</div>
			</header>

			{/* A demo video stands in for the screenshot wherever one exists. */}
			{video ? (
				<div className="mt-9 flex justify-center">
					<div className="w-full max-w-[280px] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
						<ProjectVideo
							src={video}
							poster={project.image}
							className="block aspect-[9/16] w-full object-cover"
						/>
					</div>
				</div>
			) : (
				project.image && (
					<div className="relative mt-9 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/[0.08]">
						<Image
							src={project.image}
							alt={clean(project.name)}
							fill
							sizes="(max-width: 1024px) 100vw, 840px"
							className="object-cover"
							priority
						/>
					</div>
				)
			)}

			<div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_13rem] md:gap-12">
				<div>
					{rest.length > 0 && (
						<>
							<span className="ak-eyebrow">The build</span>
							<div className="ak-prose">
								{rest.map((d, i) => (
									<p key={i}>{d}</p>
								))}
							</div>
						</>
					)}
				</div>

				<div>
					<span className="ak-eyebrow">Stack</span>
					<div className="mt-3.5 flex flex-wrap gap-1.5">
						{project.tech_stack.map((t) => (
							<span key={t} className="ak-chip">
								{t}
							</span>
						))}
					</div>
				</div>
			</div>

			<div className="ak-rule" />

			<div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
				<Link href={`/projects/${prev.slug}`} className="ak-item ak-item-link">
					<span className="ak-item-meta flex items-center gap-1.5">
						<ArrowLeft size={11} />
						Previous
					</span>
					<span className="ak-item-title mt-1.5 block">{clean(prev.name)}</span>
				</Link>
				<Link
					href={`/projects/${next.slug}`}
					className="ak-item ak-item-link text-right"
				>
					<span className="ak-item-meta flex items-center justify-end gap-1.5">
						Next
						<ArrowRight size={11} />
					</span>
					<span className="ak-item-title mt-1.5 block">{clean(next.name)}</span>
				</Link>
			</div>

			<div className="mt-8">
				<Link href="/" className="ak-link">
					Ask about something else
					<ArrowUpRight size={12} />
				</Link>
			</div>

			<ReportView slug={params.slug} />
		</div>
	);
}
