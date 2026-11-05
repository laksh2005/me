/**
 * Content for the home page and the three flagship project pages.
 *
 * Numbers match the CV (Oct 2026), except Parity's throughput, which the
 * owner asked to show as 52K rows/sec. Keep the two documents in step: a
 * recruiter will read them side by side.
 */

import type { ChatCard } from "./keepr-chats";
import { KEEPR_CHATS } from "./keepr-chats";

export const LINKS = {
	email: "https://mail.google.com/mail/?view=cm&fs=1&to=lakshnijhawan.work@gmail.com",
	github: "https://github.com/laksh2005",
	codepersona: "https://codepersona.app/laksh2005",
	linkedin: "https://www.linkedin.com/in/laksh-nijhawan-576888280/",
	x: "https://x.com/laksh_2705",
};

export interface Role {
	company: string;
	logo: string;
	/** Transparent logo: shown on a white tile in both themes. */
	adaptiveLogo?: boolean;
	role: string;
	dates: string;
	place: string;
	bullet: string;
}

export const ROLES: Role[] = [
	{
		company: "Byro",
		logo: "/byro-logo.png",
		adaptiveLogo: true,
		role: "Product Engineering Intern",
		dates: "oct 2026 - present",
		place: "Tallinn, Estonia · Remote",
		bullet:
			"Built the Company and Profile memory (6,500+ database tests passing), then hardened its privacy filter: 289 probe sentences checked in TypeScript and SQL, 0 mismatches.",
	},
	{
		company: "The Times of India",
		logo: "/toi.png",
		role: "SDE Intern",
		dates: "mar 2026 - july 2026",
		place: "Noida, India · On-site",
		bullet:
			"Automated 90% of manual HR quality review, and shipped a live system that assigns 25 jobs a week across 43 recruiters by expertise and workload.",
	},
	{
		company: "IAmMaturity",
		logo: "/iam.jpg",
		role: "Frontend Developer Intern",
		dates: "aug 2025 - oct 2025",
		place: "Mumbai, India · Remote",
		bullet:
			"Integrated 22 backend API endpoints into the core React product and cut bounce rate by 10%.",
	},
	{
		company: "WriteCream",
		logo: "/wc-logo.jpg",
		role: "Full Stack Developer Intern",
		dates: "jan 2025 - apr 2025",
		place: "Delhi, India · Remote",
		bullet:
			"Shipped 5 tools, including a PDF annotator and proposal writer, for a platform with 1M+ monthly users.",
	},
];

export interface Metric {
	k: string;
	v: string;
	s: string;
}

export interface Decision {
	title: string;
	body: string;
}

export interface Flagship {
	slug: "parity" | "codepersona" | "keepr";
	name: string;
	icon: string;
	subtitle: string;
	status: string;
	oneLiner: string;
	homeMetric: string;
	/** Shorter stat for the link preview card, when homeMetric is too long for it. */
	cardMetric?: string;
	lead: string;
	/** One-line feature bullets shown under the lead. */
	bullets?: string[];
	github: string;
	live?: string;
	liveLabel?: string;
	video?: string;
	image: string;
	metrics: Metric[];
	diagramNote: [string, string];
	decisions: Decision[];
	stack: string[];
	/** Chat mockups shown under the numbers, if any. */
	chats?: ChatCard[];
}

export const FLAGSHIPS: Flagship[] = [
	{
		slug: "keepr",
		name: "Keepr",
		icon: "/keepr-logo.png",
		subtitle: "WhatsApp-native memory · 2026",
		status: "live",
		oneLiner: "A memory you text on WhatsApp. Save anything, ask for it back.",
		homeMetric: "voice notes · 319 tests · +0.244 recall",
		cardMetric: "voice notes · 319 tests",
		lead: "You save links, notes and screenshots in a dozen places and never find them again. Keepr is one WhatsApp number: send it anything to save, then ask for it back in plain words. Text it, forward it, or just talk: voice notes become searchable text.",
		github: "https://github.com/laksh2005/Keepr",
		live: "https://keepr.website",
		liveLabel: "keepr.website",
		video: "/keepr.mp4",
		image: "/keepr.png",
		metrics: [
			{ k: "HF calls per recall", v: "1", s: "down from 2, rules route" },
			{ k: "shorthand recall", v: "+0.244", s: "avg cosine · wfh, eod, pto" },
			{ k: "tests", v: "319", s: "network blocked in tests" },
			{ k: "media stored", v: "0", s: "voice → text, audio dropped" },
		],
		diagramNote: [
			"One number, three paths. Only the paths that need understanding call a model.",
			"rule-based routing",
		],
		chats: KEEPR_CHATS,
		decisions: [
			{
				title: "Rules, not a model, for routing",
				body: "A classifier cost a model call on every message. Rules are free, and the bot keeps working when credits run out.",
			},
			{
				title: "Extract the answer, don't generate it",
				body: "Recall pulls the exact password, link or date out of the saved message and quotes it. No made-up answers.",
			},
			{
				title: "Claim before processing",
				body: "WhatsApp retries webhooks. Claiming each message ID first means a retry never costs a second reply.",
			},
			{
				title: "Pre-filter by user",
				body: "Vector search only looks inside one user's memories, so results stay private and fast.",
			},
		],
		stack: ["NestJS", "TypeScript", "MongoDB Atlas", "Atlas Vector Search", "WhatsApp Cloud API", "Hugging Face (embeddings, summaries, Whisper)", "chrono-node", "Jest", "GitHub Actions", "Vercel"],
	},
	{
		slug: "codepersona",
		name: "CodePersona",
		icon: "/cplogo.png",
		subtitle: "Developer persona reports · built solo · 2025–26",
		status: "live · 5K+ users",
		oneLiner: "Turns any GitHub profile into a shareable developer story.",
		homeMetric: "5K+ users · 95 countries",
		lead: "A GitHub profile is a wall of green squares. CodePersona turns it into a story people can read: what you build, how you work, and what you're best at. Share a link or export a PDF.",
		bullets: [
			"Each report: persona title, dev timeline, skill radar, career projection.",
			"Compare mode: two developers side by side, no extra API calls.",
			"Per-repo AI analysis: maturity, complexity and suggestions, on demand.",
		],
		github: "https://github.com/laksh2005/codepersona",
		live: "https://codepersona.app",
		liveLabel: "codepersona.app",
		image: "/cp.png",
		metrics: [
			{ k: "users", v: "5,000+", s: "zero paid traffic" },
			{ k: "countries", v: "95", s: "via shared links" },
			{ k: "page load", v: "<1s", s: "served from cache" },
			{ k: "export", v: "3 formats", s: "PDF · image · Markdown" },
		],
		diagramNote: [
			"First visit: 1 API call. Repeat visits and shared links: 0.",
			"14-day TTL · regenerate once per 72h",
		],
		decisions: [
			{
				title: "Cache processed data",
				body: "Storing the finished profile, not raw API responses, removed recomputation and made pages load in under a second.",
			},
			{
				title: "TTL, not invalidation",
				body: "GitHub data changes slowly, so a 14-day time-based expiry keeps it fresh enough without extra calls.",
			},
			{
				title: "Built for sharing",
				body: "Every profile has its own URL and a PDF export. That's how it reached 95 countries without ads.",
			},
			{
				title: "Rate-limited regeneration",
				body: "Users can force a refresh only once every 72 hours, which protects the GitHub and Gemini quotas.",
			},
			{
				title: "Closed a public write hole",
				body: "The original Supabase RLS insert and update policies applied to the public role, so anyone with the anon key could rewrite any persona page. I dropped them. service_role bypasses RLS anyway, so nothing broke.",
			},
		],
		stack: ["TypeScript", "React", "Supabase", "Edge Functions", "Gemini API", "GitHub API", "Vercel", "Tailwind CSS", "shadcn/ui (Radix)", "Framer Motion", "TanStack Query", "Deno (Edge Functions)", "GitHub GraphQL API"],
	},
	{
		slug: "parity",
		name: "Parity",
		icon: "/parity.png",
		subtitle: "Sheets ↔ MySQL sync engine · 2026",
		status: "operational",
		oneLiner: "Real-time two-way sync between Google Sheets and MySQL.",
		homeMetric: "52K rows/sec · 99 tests",
		lead: "Teams live in Google Sheets, but their apps need a real database. Parity keeps the two in sync both ways, in real time, without anyone exporting a CSV again. When both sides change the same row, the last write wins.",
		github: "https://github.com/laksh2005/parity",
		video: "/parity.mp4",
		image: "/parity.png",
		metrics: [
			{ k: "throughput", v: "52K", s: "rows/sec written" },
			{ k: "tests", v: "99", s: "unit · int · e2e" },
			{ k: "load test", v: "10K rows", s: "run in CI" },
			{ k: "setup", v: "1 command", s: "docker compose up" },
		],
		diagramNote: [
			"Both directions land on one queue, so every conflict resolves in one place.",
			"Google API mocked in benchmarks",
		],
		decisions: [
			{
				title: "A queue, not direct writes",
				body: "Sheets fires bursts of edits. BullMQ dedupes them and retries with backoff, so a flaky API never loses a row.",
			},
			{
				title: "Last write wins",
				body: "Simple and predictable for spreadsheet users, who expect their latest edit to stick.",
			},
			{
				title: "Dynamic schema",
				body: "A new column in the sheet becomes a new MySQL column, so nobody writes a migration for a spreadsheet change.",
			},
		],
		stack: ["Node.js", "Express", "MySQL", "Redis", "BullMQ", "WebSockets", "React", "Docker Compose", "GitHub Actions", "Jest", "Apps Script"],
	},
];

export const flagshipBySlug = (slug: string) => FLAGSHIPS.find((f) => f.slug === slug);

/** Projects kept in data.ts for the console but left out of the portfolio. */
export const HIDDEN_PROJECTS = ["one-stack"];
