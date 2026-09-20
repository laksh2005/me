import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Star } from "lucide-react";
import { projectsData } from "@/util/data";

/**
 * The full projects index.
 *
 * A server component now: there is nothing here that needs to run on the
 * client, and the console on `/` is where the interactive work lives. This
 * page exists so a shared link resolves to something real rather than
 * bouncing someone back to a query box.
 */

export const metadata = {
	title: "Projects",
	description: "Everything Laksh Nijhawan has built and shipped.",
};

const STAR = "⭐";
const clean = (n: string) => n.replace(STAR, "").trim();
const isStar = (n: string) => n.includes(STAR);

export default function ProjectsPage() {
	const flagship = projectsData.filter((p) => isStar(p.name));
	const rest = projectsData.filter((p) => !isStar(p.name));

	return (
		<div className="ak-page">
			<Link href="/" className="ak-back">
				<ArrowLeft size={13} />
				Ask the system
			</Link>

			<header className="ak-page-head">
				<span className="ak-eyebrow">Index</span>
				<h1 className="ak-title">Projects</h1>
				<p className="ak-sub">
					{projectsData.length} builds, {flagship.length} of them flagship. Some
					were made to learn something specific, some came straight off the
					sticky notes at my desk.
				</p>
			</header>

			<Section title="Flagship" items={flagship} />
			<Section title="Everything else" items={rest} />
		</div>
	);
}

function Section({
	title,
	items,
}: {
	title: string;
	items: typeof projectsData;
}) {
	if (items.length === 0) return null;

	return (
		<section className="mt-10">
			<div className="flex items-baseline justify-between border-b border-white/[0.05] pb-2.5">
				<span className="ak-eyebrow">{title}</span>
				<span className="ak-eyebrow">{String(items.length).padStart(2, "0")}</span>
			</div>

			<div className="mt-4 flex flex-col gap-2.5">
				{items.map((p) => (
					<Link
						key={p.slug}
						href={`/projects/${p.slug}`}
						className="ak-item ak-item-link group"
					>
						<div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
							<span className="ak-item-title">{clean(p.name)}</span>
							{isStar(p.name) && (
								<span className="ak-flag">
									<Star size={9} fill="currentColor" strokeWidth={0} />
									Flagship
								</span>
							)}
							<span className="ak-item-sub">
								{p.type === "dev" ? "Product" : "Machine learning"}
							</span>
						</div>

						{p.description?.[0] && (
							<p className="ak-item-line">{p.description[0]}</p>
						)}

						<div className="mt-3 flex flex-wrap gap-1.5">
							{p.tech_stack.slice(0, 5).map((t) => (
								<span key={t} className="ak-chip">
									{t}
								</span>
							))}
						</div>

						<ArrowUpRight
							size={14}
							className="ak-item-arrow transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
						/>
					</Link>
				))}
			</div>
		</section>
	);
}
