import React from "react";
import Link from "next/link";
import { FLAGSHIPS, Flagship } from "@/util/portfolio";
import { ThemeToggle } from "@/app/components/lk/theme-toggle";
import { GitHubIcon, GlobeIcon } from "@/app/components/lk/icons";
import { IntroPlayer } from "@/app/components/intro-player";
import { ChatCards } from "@/app/components/lk/chat";

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
				<Node title="WhatsApp" note="webhook" />
				<Ar />
				<Node title="Dedupe" note="claim message ID" />
				<Ar />
				<Node title="Router" note="rules, no model call" tag="router" hl />
			</div>
			<div className="lk-down" aria-hidden>
				<span>↙</span>
				<span>↓</span>
				<span>↘</span>
			</div>
			<div className="lk-split3">
				<div>
					<div className="lk-lanehead">save</div>
					<div className="lk-box">
						<Node title="Transcribe" note="voice notes only" />
						<Ar d="↓" />
						<Node title="Embed + store" note="Atlas, offers reminders" />
					</div>
				</div>
				<div>
					<div className="lk-lanehead">recall</div>
					<div className="lk-box">
						<Node title="Vector search" note="per-user pre-filter" />
						<Ar d="↓" />
						<Node title="Extract answer" note="rules, quotes source" />
					</div>
				</div>
				<div>
					<div className="lk-lanehead">commands</div>
					<div className="lk-box">
						<Node title="remind · recap" note="list · export" />
						<Ar d="↓" />
						<Node title="delete + undo" note="soft delete, 10 min" />
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
				<Node title="Edge Function" note="reads the cache first" tag="edge" hl />
				<Ar />
				<Node title="Supabase cache" note="hit: served as is" />
			</div>
			<div className="lk-down" style={{ marginBottom: 10 }} aria-hidden>
				<span />
				<span>↓ miss</span>
				<span />
			</div>
			<div className="lk-lane">
				<Node title="GitHub API" note="fetch profile data" />
				<Ar />
				<Node title="Hash check" note="repos, last update, languages" tag="2nd cache" />
				<Ar />
				<Node title="Gemini" note="only if it changed, then cached" />
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
				{project.bullets && (
					<ul className="lk-bullets">
						{project.bullets.map((t) => (
							<li key={t}>{t}</li>
						))}
					</ul>
				)}
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

				{project.chats && <ChatCards cards={project.chats} />}

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
