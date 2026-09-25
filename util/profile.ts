/**
 * Facts that live on the CV but not in `data.ts`.
 *
 * `data.ts` stays the source of truth for projects, experience, skills and
 * posts, and is never edited. This file only adds the categories it has no
 * shape for: education, achievements, contact details, the headline, and the
 * handful of hard metrics the CV quotes that the project descriptions do not.
 *
 * Everything here is transcribed from the CV as written. Nothing is rounded up
 * or inferred, because the console quotes these directly and a visitor should
 * be able to hold the two side by side and find them identical.
 */

export const profile = {
	name: "Laksh Nijhawan",
	headline: "Full-Stack SDE, scalable products, real-time distributed systems",
	base: "New Delhi, India",
	phone: "+91 70423-06233",
	email: "lakshnijhawan.work@gmail.com",
	seeking: "SDE roles",
	replyTime: "within a day",
};

export const education = {
	institution: "Guru Gobind Singh Indraprastha University",
	degree: "B.Tech, Artificial Intelligence and Data Science",
	start: "July 2023",
	end: "July 2027",
	cgpa: "8.83",
	note: "Currently in the final stretch, graduating July 2027.",
};

export interface Achievement {
	title: string;
	detail: string;
	year?: string;
}

export const achievements: Achievement[] = [
	{
		title: "McKinsey Forward Program",
		year: "2025",
		detail:
			"Selected for a globally competitive leadership and digital skills initiative.",
	},
	{
		title: "Technical Fellow, Google Developer Groups on Campus",
		detail:
			"Organised technical events and ran sessions for the developer community.",
	},
	{
		title: "Social Winter of Code 2025",
		year: "2025",
		detail:
			"Ranked 41 out of 347 participants with 15+ merged pull requests across 3 open source projects.",
	},
];

/**
 * Hard numbers the CV quotes for specific projects. Kept keyed by slug so an
 * answer about that project can cite the measured result rather than only the
 * prose description in `data.ts`.
 */
export const projectMetrics: Record<string, string[]> = {
	keepr: [
		"Intent detection improved from 5/12 to 12/12 on a hand labelled set.",
		"Shorthand recall improved from 0.66 to 0.83.",
		"Per user data isolation and duplicate safe webhook handling.",
	],
	codepersona: [
		"Built 0 to 1 with edge caching and serverless API ingestion for sub 1s loads.",
		"Reached 5,000+ users across 95 countries organically, via shareable profiles and one click PDF export.",
	],
	"parity": [
		"52,000 rows/sec write throughput. 830ms median edit-to-sync latency.",
		"Redis/BullMQ job queue: burst deduplication, exponential backoff retries, last-write-wins conflict resolution.",
		"99 automated tests (unit, integration, end-to-end) plus a 10K-row load test in CI.",
		"One-command Docker Compose stack: MySQL, Redis, API, worker, live WebSocket dashboard.",
		"Dynamic schema: new sheet columns automatically become MySQL columns.",
	],
};

/**
 * Experience bullets present on the CV but missing from `data.ts`. Merged into
 * the experience answer so the console never tells a smaller story than the
 * document a recruiter is reading alongside it.
 */
export const extraExperienceBullets: Record<string, string[]> = {
	"The Times of India": [
		"Shipped a live recruiter assignment system using NestJS and Google Apps Script, automating job to recruiter mapping based on domain expertise and real time workload, eliminating manual assignment overhead.",
	],
};
