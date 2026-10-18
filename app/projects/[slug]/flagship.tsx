import React from "react";
import Link from "next/link";
import { FLAGSHIPS, Flagship } from "@/util/portfolio";
import { ThemeToggle } from "@/app/components/lk/theme-toggle";
import { GitHubIcon, GlobeIcon } from "@/app/components/lk/icons";
import { IntroPlayer } from "@/app/components/intro-player";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const Node = ({
	title,
	note,
	tag,
	hl,
	ghost,
}: {
	title: string;
	note: string;
	tag?: string;
	hl?: boolean;
	ghost?: boolean;
}) => (
	<div className={`lk-node${hl ? " hl" : ""}${ghost ? " ghost" : ""}`}>
		{tag && <span className="tag">{tag}</span>}
		{title}
		<small>{note}</small>
	</div>
);
const Ar = ({ d = "→" }: { d?: string }) => (
	<div className={`lk-ar${d === "←" ? " rev" : ""}`} aria-hidden>
		{d}
	</div>
);

function ParityDiagram() {
	return (
		<>
			<div className="lk-split">
				<div>
					<div className="lk-lanehead">sheet → db</div>
					<div className="lk-box">
						<Node title="Google Sheets" note="user edits a cell" />
						<Ar d="↓" />
						<Node title="Apps Script" note="onEdit → webhook" />
					</div>
				</div>
				<div>
					<div className="lk-lanehead">db → sheet</div>
					<div className="lk-box">
						<Node title="MySQL" note="app writes a row" />
						<Ar d="↓" />
						<Node title="Poller" note="row fingerprint diff" />
					</div>
				</div>
			</div>
			<div className="lk-down" aria-hidden>
				<span>↘</span>
				<span>↙</span>
			</div>
			<div className="lk-lane">
				<Node title="Redis + BullMQ" note="dedupe bursts · backoff retries" tag="core" hl />
				<Ar />
				<Node title="Sync worker" note="last-write-wins · new cols → new MySQL cols" />
				<Ar />
				<Node title="Dashboard" note="live via WebSockets" />
			</div>
		</>
	);
}

function KeeprDiagram() {
	return (
		<>
			<div className="lk-lane">
				<Node title="WhatsApp" note="user sends a message" />
				<Ar />
				<Node title="Cloud API" note="webhook" />
				<Ar />
				<Node title="NestJS" note="NLI intent · Hugging Face" tag="router" hl />
			</div>
			<div className="lk-down" aria-hidden>
				<span>↙</span>
				<span>↘</span>
			</div>
			<div className="lk-split">
				<div>
					<div className="lk-lanehead">save</div>
					<div className="lk-box">
						<Node title="Embed + store" note="metadata only, never media" />
						<Ar d="↓" />
						<Node title="MongoDB Atlas" note="unique compound index" />
					</div>
				</div>
				<div>
					<div className="lk-lanehead">recall</div>
					<div className="lk-box">
						<Node title="Vector Search" note="per-user pre-filter" />
						<Ar d="↓" />
						<Node title="Reply on WhatsApp" note="best matches, in 2–3s" />
					</div>
				</div>
			</div>
		</>
	);
}

function CodePersonaDiagram() {
	return (
		<>
			<div className="lk-lane">
				<Node title="React app" note="enter a username" />
				<Ar />
				<Node title="Edge Function" note="cache check first" tag="edge" hl />
				<Ar />
				<Node title="GitHub API" note="only on cache miss" />
			</div>
			<div className="lk-down" aria-hidden>
				<span />
				<span>↓ hit</span>
				<span>↓</span>
			</div>
			<div className="lk-lane">
				<Node title="Shareable page + PDF" note="codepersona.app/username" />
				<Ar d="←" />
				<Node title="Supabase cache" note="processed persona · TTL" />
				<Ar d="←" />
				<Node title="Persona builder" note="GitHub data + Gemini" />
			</div>
		</>
	);
}

const DIAGRAMS: Record<Flagship["slug"], () => React.JSX.Element> = {
	parity: ParityDiagram,
	keepr: KeeprDiagram,
	codepersona: CodePersonaDiagram,
};

export function FlagshipPage({ project }: { project: Flagship }) {
	const i = FLAGSHIPS.findIndex((f) => f.slug === project.slug);
	const prev = FLAGSHIPS[(i - 1 + FLAGSHIPS.length) % FLAGSHIPS.length];
	const next = FLAGSHIPS[(i + 1) % FLAGSHIPS.length];
	const Diagram = DIAGRAMS[project.slug];

	return (
		<main className="lk">
			<div className="lk-col">
				<div className="lk-top">
					<Link href="/" className="lk-back">
						← laksh nijhawan
					</Link>
					<ThemeToggle />
				</div>

				<div className="lk-head">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={project.icon} alt="" />
					<div>
						<h1>{project.name}</h1>
						<small>{project.subtitle}</small>
					</div>
					<span className="lk-pill">
						<i />
						{project.status}
					</span>
				</div>

				<p className="lk-lead">{project.lead}</p>
				<div className="lk-links">
					{project.live && (
						<a className="lk-u" href={project.live} {...ext}>
							<GlobeIcon className="lk-i" />
							{project.liveLabel}
						</a>
					)}
					<a className="lk-u" href={project.github} {...ext}>
						<GitHubIcon className="lk-i" />
						GitHub
					</a>
				</div>

				<div className="lk-media">
					{project.video ? (
						<IntroPlayer src={project.video} poster={project.image} />
					) : (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={project.image} alt={`${project.name} screenshot`} />
					)}
				</div>

				<h2># numbers</h2>
				<div className="lk-grid">
					{project.metrics.map((m) => (
						<div key={m.k}>
							<div className="k">{m.k}</div>
							<div className="v">{m.v}</div>
							<div className="s">{m.s}</div>
						</div>
					))}
				</div>

				<h2># how it works</h2>
				<div className="lk-arch">
					<Diagram />
					<div className="lk-cap">
						<span>{project.diagramNote[0]}</span>
						<span className="mono">{project.diagramNote[1]}</span>
					</div>
				</div>

				<h2># decisions</h2>
				<div className="lk-dec">
					{project.decisions.map((d) => (
						<div key={d.title} className="r">
							<b>{d.title}</b>
							<span>{d.body}</span>
						</div>
					))}
				</div>

				<h2># stack</h2>
				<div className="lk-stack">
					{project.stack.map((s) => (
						<span key={s}>{s}</span>
					))}
				</div>

				<div className="lk-next">
					<Link href={`/projects/${prev.slug}`}>
						← <b>{prev.name}</b>
					</Link>
					<Link href={`/projects/${next.slug}`}>
						<b>{next.name}</b> →
					</Link>
				</div>
			</div>
		</main>
	);
}
