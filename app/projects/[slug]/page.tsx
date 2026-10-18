import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/util/data";
import { flagshipBySlug, HIDDEN_PROJECTS } from "@/util/portfolio";
import { ReportView } from "./view";
import { FlagshipPage } from "./flagship";
import { PageHead, Shell } from "@/app/components/lk/shell";
import { GitHubIcon, GlobeIcon } from "@/app/components/lk/icons";

/**
 * A single project. Parity, CodePersona and Keepr get the full case-study
 * page; everything else gets this simpler one. Statically generated, so a
 * shared link resolves instantly.
 */

const clean = (n: string) => n.replace("⭐", "").trim();
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const visible = projectsData.filter((p) => !HIDDEN_PROJECTS.includes(p.slug));

export async function generateStaticParams() {
	return visible.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
	const flagship = flagshipBySlug(params.slug);
	if (flagship)
		return {
			title: flagship.name,
			description: flagship.oneLiner,
			openGraph: {
				title: `${flagship.name} · Laksh Nijhawan`,
				description: flagship.oneLiner,
				images: [{ url: flagship.image }],
			},
		};
	const project = visible.find((p) => p.slug === params.slug);
	if (!project) return { title: "Project not found" };
	const description = String(project.description?.[0] ?? "")
		.replace(/<[^>]+>/g, "")
		.slice(0, 160);
	return {
		title: clean(project.name),
		description,
		openGraph: {
			title: `${clean(project.name)} · Laksh Nijhawan`,
			description,
			images: project.image ? [{ url: project.image }] : undefined,
		},
	};
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
	const flagship = flagshipBySlug(params.slug);
	if (flagship)
		return (
			<>
				<FlagshipPage project={flagship} />
				<ReportView slug={params.slug} />
			</>
		);

	const index = visible.findIndex((p) => p.slug === params.slug);
	const project = visible[index];
	if (!project) notFound();

	const [tagline, ...rest] = project.description ?? [];
	const prev = visible[(index - 1 + visible.length) % visible.length];
	const next = visible[(index + 1) % visible.length];
	const video = (project as { video?: string }).video;

	return (
		<Shell back={{ href: "/projects", label: "all projects" }}>
			<PageHead
				eyebrow={project.type === "dev" ? "product" : "machine learning"}
				title={clean(project.name)}
				lead={tagline}
			/>

			<div className="lk-links">
				{project.live && (
					<a className="lk-u" href={project.live} {...ext}>
						<GlobeIcon className="lk-i" />
						Live site
					</a>
				)}
				{project.github && (
					<a className="lk-u" href={project.github} {...ext}>
						<GitHubIcon className="lk-i" />
						GitHub
					</a>
				)}
			</div>

			{(video || project.image) && (
				<div className="lk-media">
					{video ? (
						// eslint-disable-next-line jsx-a11y/media-has-caption
						<video src={video} poster={project.image} controls preload="none" className="w-full rounded-xl" />
					) : (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={project.image} alt={`${clean(project.name)} screenshot`} />
					)}
				</div>
			)}

			{rest.length > 0 && (
				<>
					<h2># what i built</h2>
					<div className="lk-dec">
						{rest.map((d, i) => (
							<div key={i} className="r" style={{ gridTemplateColumns: "1fr" }}>
								<span>{d}</span>
							</div>
						))}
					</div>
				</>
			)}

			<h2># stack</h2>
			<div className="lk-stack">
				{project.tech_stack.map((t) => (
					<span key={t}>{t}</span>
				))}
			</div>

			<div className="lk-next">
				<Link href={`/projects/${prev.slug}`}>
					← <b>{clean(prev.name)}</b>
				</Link>
				<Link href={`/projects/${next.slug}`}>
					<b>{clean(next.name)}</b> →
				</Link>
			</div>

			<ReportView slug={params.slug} />
		</Shell>
	);
}
