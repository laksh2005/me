import React from "react";
import Link from "next/link";
import { projectsData } from "@/util/data";
import { ProjectList } from "../components/lk/project-list";
import { FLAGSHIPS, HIDDEN_PROJECTS, LINKS } from "@/util/portfolio";
import { PageHead, Shell } from "../components/lk/shell";
import { GitHubIcon, GlobeIcon } from "../components/lk/icons";

export const metadata = {
	title: "Projects",
	description: "Selected work from 40+ products Laksh Nijhawan has shipped.",
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const clean = (n: string) => n.replace("⭐", "").trim();

export default function ProjectsPage() {
	const flagshipSlugs = FLAGSHIPS.map((f) => f.slug as string);
	const rest = projectsData.filter(
		(p) => !flagshipSlugs.includes(p.slug) && !HIDDEN_PROJECTS.includes(p.slug),
	);

	return (
		<Shell>
			<PageHead
				eyebrow="projects"
				title="Things I've built"
				lead={
					<>
						40+ products shipped since 2023. These are the ones worth writing up; the rest
						live on <a className="lk-u" href={LINKS.github} {...ext}>GitHub</a>.
					</>
				}
			/>

			<h2># flagship</h2>
			<ProjectList
				items={FLAGSHIPS.map((p) => ({
					slug: p.slug,
					name: p.name,
					icon: p.icon,
					image: p.image,
					metric: p.homeMetric,
					oneLiner: p.oneLiner,
					github: p.github,
					live: p.live,
				}))}
			/>

			<h2># everything else</h2>
			{rest.map((p) => (
				<div key={p.slug} className="lk-proj">
					<Link href={`/projects/${p.slug}`} className="lk-tile" aria-hidden tabIndex={-1}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						{p.image && <img src={p.image} alt="" />}
					</Link>
					<Link href={`/projects/${p.slug}`} className="t">
						<b>{clean(p.name)}</b>
						<small>{p.type === "dev" ? "product" : "machine learning"} · {p.tech_stack.slice(0, 3).join(", ")}</small>
					</Link>
					<div className="lk-icons">
						{p.github && (
							<a href={p.github} {...ext} aria-label={`${clean(p.name)} on GitHub`}>
								<GitHubIcon className="lk-ico" />
							</a>
						)}
						{p.live && (
							<a href={p.live} {...ext} aria-label={`${clean(p.name)} website`}>
								<GlobeIcon className="lk-ico" />
							</a>
						)}
					</div>
				</div>
			))}
		</Shell>
	);
}
