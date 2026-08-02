import { Navigation } from "@/app/components/nav";
import { PitchBackdrop } from "@/app/components/stadium";
import { projectsData } from "@/util/data";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ReportView } from "./view";

export async function generateStaticParams() {
	return projectsData.map((project) => ({
		slug: project.slug,
	}));
}

const cleanName = (n: string) => n.replace("⭐", "").trim();

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const project = projectsData.find((p) => p.slug === slug);

	if (!project) {
		return (
			<div className="relative min-h-screen">
				<PitchBackdrop />
				<Navigation />
				<div className="container mx-auto max-w-4xl px-4 pt-32">
					<div className="py-16 text-center">
						<h1 className="font-jersey text-3xl uppercase text-white">
							No such fixture
						</h1>
						<Link
							href="/projects"
							className="mt-4 inline-block font-stadium text-sm uppercase tracking-[0.2em] text-kit-neon hover:underline"
						>
							Back to the trophy cabinet
						</Link>
					</div>
				</div>
			</div>
		);
	}

	const [firstLine = "", secondLine = "", ...additional] = project.description ?? [];
	const isStar = project.name.includes("⭐");

	return (
		<div className="relative min-h-screen pb-24">
			<PitchBackdrop />
			<Navigation />

			<div className="container mx-auto max-w-4xl px-4 pt-24 md:pt-28">
				<Link
					href="/projects"
					className="inline-flex items-center gap-2 font-stadium text-xs uppercase tracking-[0.24em] text-emerald-100/50 transition-colors hover:text-kit-neon"
				>
					<ArrowLeft size={14} />
					Trophy cabinet
				</Link>

				{/* headline */}
				<header className="mt-6 animate-rise-in">
					<div className="flex flex-wrap items-center gap-2">
						<span className="rounded-sm bg-kit-neon px-2 py-1 font-stadium text-[10px] font-bold uppercase tracking-[0.22em] text-black">
							Full time
						</span>
						<span className="rounded-sm border border-emerald-400/35 px-2 py-1 font-stadium text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-200/80">
							{project.type === "dev" ? "Development" : "Machine learning"}
						</span>
						{isStar && (
							<span className="rounded-sm border border-kit-gold/50 bg-kit-gold/10 px-2 py-1 font-stadium text-[10px] font-bold uppercase tracking-[0.22em] text-kit-gold">
								★ Standout
							</span>
						)}
					</div>

					<h1
						className="mt-4 font-jersey text-5xl uppercase leading-[0.9] text-white md:text-7xl"
						style={{ textShadow: "0 10px 40px rgba(0,0,0,.8)" }}
					>
						{cleanName(project.name)}
					</h1>
					<p className="mt-4 max-w-2xl font-stadium text-lg leading-snug text-emerald-50/70 md:text-xl">
						{firstLine}
					</p>
				</header>

				{/* hero shot */}
				<div className="mt-8 overflow-hidden rounded-xl border border-emerald-400/25 bg-black/50 shadow-[0_40px_90px_-30px_rgba(0,0,0,.95)] animate-rise-in">
					{project.image ? (
						<div className="relative h-64 w-full md:h-80">
							<Image
								src={project.image}
								alt={cleanName(project.name)}
								fill
								sizes="(max-width: 768px) 100vw, 900px"
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
						</div>
					) : (
						<div className="h-64 w-full bg-black/40 md:h-80" />
					)}
				</div>

				{/* report */}
				<div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
					<div className="md:col-span-2">
						<h2 className="font-stadium text-[11px] font-bold uppercase tracking-[0.34em] text-kit-neon">
							Match report
						</h2>
						<div className="mt-4 space-y-4">
							{secondLine && (
								<p className="text-[15px] leading-relaxed text-emerald-50/70 md:text-base">
									{secondLine}
								</p>
							)}
							{additional.map((desc, i) => (
								<p
									key={i}
									className="border-l-2 border-emerald-400/30 pl-4 text-[15px] leading-relaxed text-emerald-50/70"
								>
									{desc}
								</p>
							))}
						</div>

						{/* links */}
						<div className="mt-8 flex flex-wrap gap-3">
							{project.live && (
								<a
									href={project.live}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-sm bg-kit-neon px-5 py-3 font-stadium text-sm font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_30px_-8px_rgba(62,240,140,.9)] transition-transform duration-300 hover:-translate-y-0.5"
								>
									<ExternalLink size={15} />
									Watch it live
								</a>
							)}
							{project.github && (
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-sm border border-emerald-300/40 px-5 py-3 font-stadium text-sm font-bold uppercase tracking-[0.18em] text-emerald-100 transition-colors duration-300 hover:border-kit-gold hover:text-kit-gold"
								>
									<Github size={15} />
									Source
								</a>
							)}
						</div>
					</div>

					{/* lineup */}
					<aside>
						<div className="overflow-hidden rounded-lg border border-emerald-400/25 bg-black/55 backdrop-blur-md">
							<div className="border-b border-emerald-400/20 bg-emerald-500/10 px-4 py-2.5 font-stadium text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-200/80">
								Starting XI
							</div>
							<ul className="divide-y divide-emerald-400/10">
								{project.tech_stack.map((tech, i) => (
									<li
										key={tech}
										className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-emerald-500/5"
									>
										<span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-kit-neon font-jersey text-[11px] leading-none text-black">
											{i + 1}
										</span>
										<span className="font-stadium text-sm uppercase tracking-wide text-emerald-50/85">
											{tech}
										</span>
									</li>
								))}
							</ul>
						</div>
					</aside>
				</div>
			</div>

			<ReportView slug={slug} />
		</div>
	);
}
