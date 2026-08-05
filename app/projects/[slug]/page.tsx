import { Navigation } from "@/app/components/nav";
import { projectsData } from "@/util/data";
import { Github, ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ReportView } from "./view";
import { Reveal } from "@/app/components/reveal";

const clean = (n: string) => n.replace("⭐", "").trim();
const isStar = (n: string) => n.includes("⭐");

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const index = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[index];

	if (!project) {
		return (
			<div className="relative min-h-screen">
				<Navigation />
				<div className="container px-4 pt-32 mx-auto max-w-4xl">
					<div className="text-center py-16">
						<h1 className="font-serif-title text-3xl text-white">
							Project not found
						</h1>
					</div>
				</div>
			</div>
		);
	}

	const [tagline, ...rest] = project.description ?? [];
	const prev = projectsData[(index - 1 + projectsData.length) % projectsData.length];
	const next = projectsData[(index + 1) % projectsData.length];

	return (
		<div className="relative min-h-screen pb-24">
			<Navigation />

			<div className="container relative px-6 pt-32 mx-auto max-w-5xl md:pt-40">
				{/* back link + index */}
				<Reveal className="flex items-center justify-between">
					<Link
						href="/projects"
						className="inline-flex items-center gap-2 text-[13px] text-zinc-500 hover:text-white transition-colors"
					>
						<ArrowLeft size={14} />
						All projects
					</Link>
					<span className="text-[11px] uppercase tracking-[0.16em] text-zinc-600">
						{String(index + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}
					</span>
				</Reveal>

				{/* header */}
				<Reveal delay={0.06} className="mt-8">
					<div className="flex flex-wrap items-center gap-3">
						<span className="rounded-full border border-white/[0.1] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
							{project.type === "dev" ? "Development" : "Machine Learning"}
						</span>
						{isStar(project.name) && (
							<span className="rounded-full border border-violet-300/25 bg-violet-300/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300/80">
								Flagship
							</span>
						)}
					</div>
					<h1 className="font-serif-title mt-5 text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.98] text-white">
						{clean(project.name)}
					</h1>
					{tagline && (
						<p className="mt-5 max-w-xl text-[16px] leading-relaxed text-zinc-400">
							{tagline}
						</p>
					)}
				</Reveal>

				{/* CTAs */}
				<Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
					{project.live && (
						<a
							href={project.live}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-[#08080A] text-[13.5px] font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
						>
							<ExternalLink size={15} />
							Live Demo
						</a>
					)}
					{project.github && (
						<a
							href={project.github}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.12] text-zinc-300 text-[13.5px] font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/30 hover:text-white"
						>
							<Github size={15} />
							Source
						</a>
					)}
				</Reveal>

				{/* hero image */}
				<Reveal delay={0.14} className="mt-12">
					<div className="grain relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
						{project.image ? (
							<div className="relative aspect-[16/9] w-full">
								<Image
									src={project.image}
									alt={clean(project.name)}
									fill
									sizes="(max-width: 1024px) 100vw, 960px"
									className="object-cover"
									priority
								/>
								<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080A]/50 via-transparent to-transparent" />
							</div>
						) : (
							<div className="aspect-[16/9] w-full bg-white/[0.03]" />
						)}
					</div>
				</Reveal>

				{/* body + sidebar */}
				<div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_16rem]">
					<Reveal delay={0.06}>
						{rest.length > 0 && (
							<div className="space-y-5">
								<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300/70">
									The build
								</span>
								<div className="space-y-4">
									{rest.map((desc, i) => (
										<p
											key={i}
											className="max-w-2xl text-[15px] leading-relaxed text-zinc-300"
										>
											{desc}
										</p>
									))}
								</div>
							</div>
						)}
					</Reveal>

					<Reveal delay={0.1} className="space-y-8">
						<div>
							<span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
								Stack
							</span>
							<div className="mt-4 flex flex-wrap gap-2">
								{project.tech_stack.map((tech) => (
									<span
										key={tech}
										className="rounded-full border border-white/[0.09] px-3 py-1.5 text-[12px] text-zinc-300"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</Reveal>
				</div>

				{/* prev / next */}
				<Reveal delay={0.08} className="mt-24 grid grid-cols-1 gap-3 border-t border-white/[0.08] pt-10 sm:grid-cols-2">
					<Link
						href={`/projects/${prev.slug}`}
						className="group flex flex-col gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/25"
					>
						<span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-zinc-500">
							<ArrowLeft size={12} />
							Previous
						</span>
						<span className="font-serif-title text-xl text-white">
							{clean(prev.name)}
						</span>
					</Link>
					<Link
						href={`/projects/${next.slug}`}
						className="group flex flex-col items-end gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 text-right transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/25"
					>
						<span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-zinc-500">
							Next
							<ArrowRight size={12} />
						</span>
						<span className="font-serif-title text-xl text-white">
							{clean(next.name)}
						</span>
					</Link>
				</Reveal>
			</div>
      <ReportView slug={slug} />
		</div>
	);
}
