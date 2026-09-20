"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { SmoothInput } from "../v1/skiper106";
import { AnswerView } from "./answer-view";
import { MusicToggle, ThemeToggle } from "./controls";
import {
	CV_URL,
	DEFAULT_ANSWER,
	QUICK_ACTIONS,
	matchQuery,
	type Answer,
} from "@/util/intents";

/**
 * The whole homepage, in one window.
 *
 * A query never navigates. Submitting swaps the answer in place, which is what
 * keeps this feeling like a conversation rather than a site you are clicking
 * through. Deep links out to the real project and post pages are offered
 * inside answers for anyone who wants the long form version.
 *
 * `matchQuery` is synchronous and local, so an answer is ready in the same
 * tick. The short "thinking" pause below is therefore deliberate, not a
 * loading state: without it the reply lands before the eye registers that
 * anything was asked, and the exchange reads as a jump cut.
 *
 * Transitions are CSS, not JavaScript. A JS driven animation stalls whenever
 * requestAnimationFrame is not running (background or throttled tabs), and
 * anything that fades in from opacity 0 that way can be left invisible. CSS
 * keyframes with `fill-mode: both` always land on their end state.
 */

const THINKING_MS = 260;

export function AskConsole() {
	const [value, setValue] = useState("");
	const [answer, setAnswer] = useState<Answer>(DEFAULT_ANSWER);
	const [asked, setAsked] = useState<string | null>(null);
	const [thinking, setThinking] = useState(false);
	const timer = useRef<number | null>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		return () => {
			if (timer.current) window.clearTimeout(timer.current);
		};
	}, []);

	const ask = useCallback((raw: string) => {
		const q = raw.trim();
		if (!q) return;

		if (timer.current) window.clearTimeout(timer.current);
		setAsked(q);
		setThinking(true);
		setValue("");

		timer.current = window.setTimeout(() => {
			setAnswer(matchQuery(q));
			setThinking(false);
			// Answers can be taller than the panel, so reset to the top of the
			// reply rather than leaving the reader mid way down the previous one.
			scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
		}, THINKING_MS);
	}, []);

	return (
		<div className="ak-console">
			<header className="ak-head">
				<div className="ak-head-left">
					<span className="ak-brand-name">Laksh Nijhawan</span>
					<a
						href={CV_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="ak-cv"
					>
						View CV
						<ArrowUpRight size={12} strokeWidth={2.2} />
					</a>
				</div>

				<span className="ak-ctrl-group">
					<MusicToggle />
					<ThemeToggle />
				</span>
			</header>

			{/* the reply surface */}
			<div className="ak-surface" ref={scrollRef}>
				{/* No `key` here. It was needed when this was wrapped in
				    AnimatePresence; left in place it forces a remount per query
				    instead of letting React update the text in place. */}
				{asked && (
					<div className="ak-asked ak-rise-fast">
						<span className="ak-asked-caret">&gt;</span>
						{asked}
					</div>
				)}

				{thinking ? (
					<div className="ak-thinking" aria-live="polite">
						<span />
						<span />
						<span />
					</div>
				) : (
					<div key={answer.id}>
						<AnswerView answer={answer} />

						{answer.suggestions.length > 0 && (
							<div className="ak-followups ak-rise" style={{ animationDelay: "0.6s" }}>
								<span className="ak-followup-label">try</span>
								{answer.suggestions.map((s) => (
									<button
										key={s}
										type="button"
										onClick={() => ask(s)}
										className="ak-followup"
									>
										{s}
									</button>
								))}
							</div>
						)}
					</div>
				)}
			</div>

			{/* the composer */}
			<div className="ak-composer">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						ask(value);
					}}
					className="ak-inputrow"
				>
					<Search size={15} className="ak-input-icon" strokeWidth={1.8} />
					<SmoothInput
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Ask about a project, a role, or a skill"
						aria-label="Ask about Laksh"
						className="ak-input"
						wrapperClassName="ak-input-wrap"
					/>
					<button
						type="submit"
						className="ak-send"
						aria-label="Send"
						disabled={!value.trim()}
					>
						<CornerDownLeft size={14} strokeWidth={2} />
					</button>
				</form>

				<div className="ak-quick">
					{QUICK_ACTIONS.map((a) => (
						<button
							key={a.query}
							type="button"
							onClick={() => ask(a.query)}
							className={`ak-quick-btn ${
								answer.id === a.query || asked === a.query ? "is-active" : ""
							}`}
						>
							{a.label}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
