/**
 * Content for the home page and the three flagship project pages.
 *
 * Numbers match the CV (Oct 2026), except Parity's throughput, which the
 * owner asked to show as 52K rows/sec. Keep the two documents in step: a
 * recruiter will read them side by side.
 */

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
	role: string;
	dates: string;
	place: string;
	bullet: string;
}

export const ROLES: Role[] = [
	{
		company: "Byro",
		logo: "/byro-logo.jpg",
		role: "Product Engineering Intern",
		dates: "oct 2026 - present",
		place: "Tallinn, Estonia · Remote",
		bullet:
			"Building the trust layer of an agent-first AI product: traceable memory, publishing history and secure media, so humans stay in control.",
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
	lead: string;
	github: string;
	live?: string;
	liveLabel?: string;
	video?: string;
	image: string;
	metrics: Metric[];
	diagramNote: [string, string];
	decisions: Decision[];
	stack: string[];
}

export const FLAGSHIPS: Flagship[] = [
	{
		slug: "keepr",
		name: "Keepr",
		icon: "/keepr-logo.png",
		subtitle: "WhatsApp-native memory · 2026",
		status: "live",
		oneLiner: "A memory you text on WhatsApp. Save anything, ask for it back.",
		homeMetric: "95% intent accuracy · 2–3s replies",
		lead: "You save links, notes and screenshots in a dozen places and never find them again. Keepr is one WhatsApp number: send it anything to save, then ask for it back in plain words.",
		github: "https://github.com/laksh2005/Keepr",
		live: "https://keepr.website",
		liveLabel: "keepr.website",
		video: "/keepr.mp4",
		image: "/keepr.png",
		metrics: [
			{ k: "intent routing", v: "95%", s: "38 of 40 labelled" },
			{ k: "shorthand recall", v: "+0.244", s: "avg cosine · wfh, eod, pto" },
			{ k: "reply time", v: "2–3s", s: "live, in chat" },
			{ k: "media stored", v: "0", s: "metadata only" },
		],
		diagramNote: [
			"One number, two flows. The router decides whether a message is a save or a question.",
			"per-user isolation",
		],
		decisions: [
			{
				title: "NLI intent routing",
				body: "No training data needed to tell \"save this\" from \"what was that link?\". It routes 38 of 40 hand-labelled messages correctly.",
			},
			{
				title: "Pre-filter by user",
				body: "Vector search only ever looks inside one user's memories, so results stay private and fast.",
			},
			{
				title: "Store metadata, not media",
				body: "Less to secure and less to pay for. A unique index makes WhatsApp's webhook retries safe.",
			},
		],
		stack: ["NestJS", "TypeScript", "MongoDB Atlas", "Atlas Vector Search", "WhatsApp Cloud API", "Hugging Face"],
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
		github: "https://github.com/laksh2005/codepersona",
		live: "https://codepersona.app",
		liveLabel: "codepersona.app",
		image: "/cp.png",
		metrics: [
			{ k: "users", v: "5,000+", s: "zero paid traffic" },
			{ k: "countries", v: "95", s: "via shared links" },
			{ k: "page load", v: "<1s", s: "edge cached" },
			{ k: "export", v: "1-click", s: "profile → PDF" },
		],
		diagramNote: [
			"Most visits never touch GitHub: they read a processed profile straight from cache.",
			"rate-limit safe",
		],
		decisions: [
			{
				title: "Cache processed data",
				body: "Storing the finished profile, not raw API responses, removed recomputation and made pages load in under a second.",
			},
			{
				title: "TTL, not invalidation",
				body: "GitHub data changes slowly, so a time-based expiry keeps it fresh enough without extra calls.",
			},
			{
				title: "Built for sharing",
				body: "Every profile has its own URL and a PDF export. That's how it reached 95 countries without ads.",
			},
		],
		stack: ["TypeScript", "React", "Supabase", "Edge Functions", "Gemini API", "GitHub API"],
	},
	{
		slug: "parity",
		name: "Parity",
		icon: "/parity.png",
		subtitle: "Sheets ↔ MySQL sync engine · 2026",
		status: "operational",
		oneLiner: "Real-time two-way sync between Google Sheets and MySQL.",
		homeMetric: "52K rows/sec · 99 tests",
		lead: "Teams live in Google Sheets, but their apps need a real database. Parity keeps the two in sync both ways, in real time, without anyone exporting a CSV again.",
		github: "https://github.com/laksh2005/parity",
		video: "/parity.mp4",
		image: "/parity.png",
		metrics: [
			{ k: "throughput", v: "52K", s: "rows/sec written" },
			{ k: "conflicts", v: "LWW", s: "last write wins" },
			{ k: "tests", v: "99", s: "unit · int · e2e" },
			{ k: "ci", v: "GH Actions", s: "Docker Compose" },
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
