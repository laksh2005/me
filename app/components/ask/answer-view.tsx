"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import BlurText from "../v1/blur-text";
import { ProjectVideo } from "../project-video";
import type { Answer, AnswerItem, AnswerStat } from "@/util/intents";

/**
 * Renders one answer.
 *
 * The lead line uses the word by word blur reveal so a reply resolves the way
 * a spoken one does, rather than appearing as a finished block. That is the
 * only place the effect is used: applying it to body copy too would make the
 * answer slow to read, which defeats the point of answering quickly.
 *
 * Every entrance here is CSS rather than JavaScript. A JS driven animation
 * only advances while requestAnimationFrame is running, which it is not in a
 * throttled or background tab, and anything whose visibility depends on such
 * an animation finishing can end up stranded at opacity 0. CSS with
 * `animation-fill-mode: both` cannot fail that way, so the content stays
 * readable even when the main thread is busy.
 */

/**
 * Minimal inline markup for answer copy, so a line can carry a link or an
 * emphasis without the data layer knowing anything about React.
 *
 *   [label](href)  becomes a link, external when the href is absolute
 *   **text**       becomes an emphasised span
 *
 * Deliberately a parser rather than `dangerouslySetInnerHTML`: these strings
 * are authored in this repo, but rendering them as HTML would make any future
 * data source an injection vector for no benefit.
 */
const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;

function RichLine({ text }: { text: string }) {
	const parts = text.split(TOKEN).filter(Boolean);

	return (
		<>
			{parts.map((part, i) => {
				const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
				if (link) {
					const [, label, href] = link;
					const external = /^https?:\/\//.test(href);
					return external ? (
						<a
							key={i}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="ak-inline-link"
						>
							{label}
						</a>
					) : (
						<Link key={i} href={href} className="ak-inline-link">
							{label}
						</Link>
					);
				}

				const strong = /^\*\*([^*]+)\*\*$/.exec(part);
				if (strong) {
					return (
						<span key={i} className="ak-em">
							{strong[1]}
						</span>
					);
				}

				return <React.Fragment key={i}>{part}</React.Fragment>;
			})}
		</>
	);
}

/** Stagger index for the CSS entrance, capped so late items are not slow. */
const step = (i: number) => ({
	animationDelay: `${Math.min(i, 7) * 0.05 + 0.22}s`,
});

function Stat({ stat }: { stat: AnswerStat }) {
	return (
		<div className="ak-stat">
			<div className="ak-stat-value">
				{stat.value}
				{stat.suffix && <span className="ak-accent-text">{stat.suffix}</span>}
			</div>
			<div className="ak-stat-label">{stat.label}</div>
			{stat.note && <div className="ak-stat-note">{stat.note}</div>}
		</div>
	);
}

function ItemBody({ item }: { item: AnswerItem }) {
	return (
		<>
			<div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
				<span className="ak-item-title">{item.title}</span>
				{item.flagship && (
					<span className="ak-flag">
						<Star size={9} fill="currentColor" strokeWidth={0} />
						Flagship
					</span>
				)}
				{item.subtitle && <span className="ak-item-sub">{item.subtitle}</span>}
			</div>

			{item.meta && <div className="ak-item-meta">{item.meta}</div>}

			{item.lines?.map((l, i) => (
				<p key={i} className="ak-item-line">
					<RichLine text={l} />
				</p>
			))}

			{item.chips && item.chips.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-1.5">
					{item.chips.map((c) => (
						<span key={c} className="ak-chip">
							{c}
						</span>
					))}
				</div>
			)}
		</>
	);
}

function Item({ item, index }: { item: AnswerItem; index: number }) {
	if (item.href) {
		return (
			<Link
				href={item.href}
				className="ak-item ak-item-link ak-rise group"
				style={step(index)}
			>
				<ItemBody item={item} />
				<ArrowUpRight
					size={14}
					className="ak-item-arrow transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
				/>
			</Link>
		);
	}

	return (
		<div className="ak-item ak-rise" style={step(index)}>
			<ItemBody item={item} />
		</div>
	);
}

export function AnswerView({ answer }: { answer: Answer }) {
	return (
		<div className="ak-answer">
			<BlurText
				key={answer.id}
				text={answer.lead}
				animateBy="words"
				direction="top"
				delay={40}
				stepDuration={0.42}
				className="ak-lead"
			/>

			{answer.stats && answer.stats.length > 0 && (
				<div className="ak-stats ak-rise" style={step(0)}>
					{answer.stats.map((s) => (
						<Stat key={s.label} stat={s} />
					))}
				</div>
			)}

			{answer.media?.video && (
				<div className="ak-media ak-rise" style={step(1)}>
					<ProjectVideo
						src={answer.media.video}
						poster={answer.media.poster}
						className="block aspect-[9/16] w-full object-cover"
					/>
				</div>
			)}

			{answer.items && answer.items.length > 0 && (
				<div className="ak-items">
					{answer.items.map((it, i) => (
						<Item key={`${it.title}-${i}`} item={it} index={i} />
					))}
				</div>
			)}

			{answer.chips && answer.chips.length > 0 && (
				<div className="ak-rise mt-4 flex flex-wrap gap-1.5" style={step(2)}>
					{answer.chips.map((c) => (
						<span key={c} className="ak-chip">
							{c}
						</span>
					))}
				</div>
			)}

			{answer.links && answer.links.length > 0 && (
				<div className="ak-links ak-rise" style={step(3)}>
					{answer.links.map((l) =>
						l.external || l.href.startsWith("mailto:") ? (
							<a
								key={l.href}
								href={l.href}
								target={l.external ? "_blank" : undefined}
								rel={l.external ? "noopener noreferrer" : undefined}
								className="ak-link"
							>
								{l.label}
								<ArrowUpRight size={12} />
							</a>
						) : (
							<Link key={l.href} href={l.href} className="ak-link">
								{l.label}
								<ArrowUpRight size={12} />
							</Link>
						),
					)}
				</div>
			)}
		</div>
	);
}
