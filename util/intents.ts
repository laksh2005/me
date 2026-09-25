/**
 * The query engine behind "Ask the system".
 *
 * Everything here derives from `data.ts` at build time. Nothing is generated
 * by a model and nothing talks to the network, so an answer is either a real
 * fact assembled from the portfolio data or an honest "I do not have that".
 * There is no third case where it invents something.
 *
 * Matching strategy, in order:
 *   1. Normalise the raw string (lowercase, strip punctuation, expand a few
 *      contractions) so phrasing differences stop mattering early.
 *   2. Look for a named entity (a project, a company, a skill, a post). These
 *      carry alias lists, so "whatsapp bot" and "memory app" both reach Keepr.
 *   3. Look for an intent verb ("how long", "do you know", "where did you
 *      work") to decide which shape of answer that entity deserves.
 *   4. Fall back to a topic level intent when no entity matched.
 *   5. If nothing clears the confidence floor, return a guided fallback that
 *      tells the visitor what DOES work rather than dead ending them.
 *
 * The floor matters more than the ceiling. A wrong but confident answer on a
 * portfolio is worse than "ask me directly", so ambiguous input always falls
 * through instead of guessing.
 */

import { projectsData, experienceData, blogsData, skillsData } from "./data";
import {
	profile,
	education,
	achievements,
	projectMetrics,
	extraExperienceBullets,
} from "./profile";

/* ------------------------------------------------------------------ types */

export type AnswerKind =
	| "identity"
	| "experience"
	| "experience-detail"
	| "projects"
	| "project-detail"
	| "skills"
	| "skill-detail"
	| "logs"
	| "socials"
	| "stat"
	| "offscope"
	| "fallback";

export interface AnswerLink {
	label: string;
	href: string;
	external?: boolean;
}

export interface AnswerItem {
	title: string;
	subtitle?: string;
	meta?: string;
	lines?: string[];
	chips?: string[];
	links?: AnswerLink[];
	href?: string;
	flagship?: boolean;
}

export interface AnswerStat {
	value: string;
	numeric?: number;
	suffix?: string;
	label: string;
	note?: string;
}

export interface Answer {
	id: string;
	kind: AnswerKind;
	/** The one line spoken answer, rendered with the word by word reveal. */
	lead: string;
	items?: AnswerItem[];
	chips?: string[];
	links?: AnswerLink[];
	stats?: AnswerStat[];
	media?: { video?: string; poster?: string };
	/** Follow up queries offered as tappable chips under the answer. */
	suggestions: string[];
}

/* ------------------------------------------------------------- constants */

export const EMAIL = "lakshnijhawan.work@gmail.com";

/**
 * Gmail's own compose URL, not a `mailto:` link.
 *
 * `mailto:` depends on the visitor having a desktop mail client configured,
 * which on a browser with no default set does nothing at all when clicked.
 * This opens a pre-addressed draft in Gmail's web compose directly, in a new
 * tab so the portfolio itself is never navigated away from.
 */
export const EMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;
export const CV_URL =
	"https://drive.google.com/file/d/1xP6SzxNy9WOBb-zdDxYx_iIpnqEzn5nT/view?usp=sharing";

export const SOCIAL_LINKS: AnswerLink[] = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/laksh-nijhawan-576888280/",
		external: true,
	},
	{ label: "GitHub", href: "https://github.com/laksh2005", external: true },
	{ label: "X", href: "https://x.com/laksh_2705", external: true },
	{
		label: "CodePersona",
		href: "https://codepersona.app/laksh2005",
		external: true,
	},
];

/**
 * Repo creation dates read from the GitHub API rather than estimated, so
 * "how long have you been building X" resolves to something true.
 */
const REPO_CREATED: Record<string, string> = {
	keepr: "2026-07-26",
	codepersona: "2025-11-26",
	"parity": "2026-02-12",
	"one-stack": "2025-05-03",
	"clinical-notes-classifier": "2025-07-24",
	"ecg-arrhythmia-detection": "2025-07-24",
	"geek-mate": "2024-09-19",
	"spacex-falcon-landing": "2025-07-07",
	inquira: "2024-10-09",
	tasklin: "2024-12-03",
	"travel-horizon": "2025-04-19",
};

const MONTHS = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december",
];

const STAR = "⭐";
const cleanName = (n: string) => n.replace(STAR, "").trim();
const isStarred = (n: string) => n.includes(STAR);

/* ------------------------------------------------------------ normalising */

const CONTRACTIONS: [RegExp, string][] = [
	[/\bwhat s\b/g, "what is"],
	[/\bwho s\b/g, "who is"],
	[/\bhe s\b/g, "he is"],
	[/\byou re\b/g, "you are"],
	[/\bdon t\b/g, "do not"],
	[/\bdoesn t\b/g, "does not"],
	[/\bhaven t\b/g, "have not"],
	[/\bu\b/g, "you"],
	[/\bur\b/g, "your"],
	[/\bpls\b/g, "please"],
	[/\bexp\b/g, "experience"],
	[/\byoe\b/g, "years of experience"],
];

export function normalise(raw: string): string {
	let s = " " + raw.toLowerCase().trim() + " ";
	// Punctuation becomes whitespace, which also turns apostrophes into word
	// breaks. That is why the contraction table below matches "don t" and not
	// "don't": by this point the apostrophe is already gone.
	s = s.replace(/[^a-z0-9+#.\s-]/g, " ");
	s = s.replace(/\s+/g, " ");
	for (const [re, to] of CONTRACTIONS) s = s.replace(re, to);
	return s.replace(/\s+/g, " ").trim();
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Word boundary aware containment, so "js" never matches inside "jsx". */
const hasPhrase = (q: string, phrase: string) => {
	if (phrase.includes(" ")) return q.includes(phrase);
	return new RegExp(`(^|\\s)${escapeRe(phrase)}(\\s|$)`).test(q);
};

const hasAny = (q: string, list: string[]) => list.some((p) => hasPhrase(q, p));

/* ------------------------------------------------------- computed figures */

/** Parse "Mar 2026 - July 2026" into an inclusive month count. */
function monthsInDuration(duration: string): number {
	const parts = duration.split(/\s*-\s*/);
	if (parts.length !== 2) return 0;
	const parse = (p: string) => {
		const m = p.trim().toLowerCase().match(/^([a-z]+)\s+(\d{4})$/);
		if (!m) return null;
		const mi = MONTHS.findIndex((x) => x.startsWith(m[1].slice(0, 3)));
		if (mi === -1) return null;
		return { y: Number(m[2]), m: mi };
	};
	const a = parse(parts[0]);
	const b = parse(parts[1]);
	if (!a || !b) return 0;
	return (b.y - a.y) * 12 + (b.m - a.m) + 1;
}

/**
 * Internship months only. Open source contribution periods are excluded on
 * purpose: counting them would inflate the figure, and the whole point of
 * this page is that a visitor can trust the numbers on it.
 */
export const internships = experienceData.filter((e) =>
	e.role.toLowerCase().includes("intern"),
);

export const totalInternshipMonths = internships.reduce(
	(n, e) => n + monthsInDuration(e.duration),
	0,
);

/** Whole months between an ISO date and now, floored at zero. */
function monthsSince(iso: string): number {
	const then = new Date(iso + "T00:00:00Z");
	const now = new Date();
	let n =
		(now.getUTCFullYear() - then.getUTCFullYear()) * 12 +
		(now.getUTCMonth() - then.getUTCMonth());
	if (now.getUTCDate() < then.getUTCDate()) n -= 1;
	return Math.max(0, n);
}

function humanSince(iso: string): string {
	const m = monthsSince(iso);
	if (m < 1) return "under a month";
	if (m === 1) return "about a month";
	if (m < 12) return `about ${m} months`;
	const y = Math.floor(m / 12);
	const r = m % 12;
	if (r === 0) return y === 1 ? "about a year" : `about ${y} years`;
	return `about ${y} years and ${r} months`;
}

const prettyDate = (iso: string) => {
	const [y, m] = iso.split("-");
	const name = MONTHS[Number(m) - 1];
	return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${y}`;
};

/* ---------------------------------------------------------- entity tables */

interface ProjectEntity {
	slug: string;
	name: string;
	aliases: string[];
}

/** Hand written aliases, for the way people actually describe these. */
const PROJECT_ALIASES: Record<string, string[]> = {
	keepr: [
		"keepr",
		"keeper",
		"whatsapp",
		"memory app",
		"memory service",
		"latest project",
		"newest project",
		"current project",
		"latest thing",
		"newest thing",
		"recent project",
		"most recent",
		"vector search",
	],
	codepersona: [
		"codepersona",
		"code persona",
		"developer profile",
		"dev profile",
		"profiling",
	],
	"parity": [
		"parity",
		"duplex",
		"sync engine",
		"duplex sync",
		"data sync",
		"synchronisation",
		"synchronization",
		"bullmq",
		"sheets sync",
		"google sheets mysql",
		"bidirectional sync",
		"job queue",
	],
	"one-stack": ["one stack", "onestack", "learning platform", "roadmaps"],
	"clinical-notes-classifier": [
		"clinical",
		"bert",
		"clinical notes",
		"medical classification",
	],
	"ecg-arrhythmia-detection": ["ecg", "arrhythmia", "heart"],
	"geek-mate": ["geek mate", "geekmate", "networking app", "swipe"],
	"spacex-falcon-landing": ["spacex", "falcon", "rocket", "space x"],
	inquira: ["inquira", "chatbot", "nlp chatbot"],
	tasklin: ["tasklin", "task manager", "todo app", "to do app"],
	"travel-horizon": ["travel horizon", "trip planner", "travel"],
};

export const projectEntities: ProjectEntity[] = projectsData.map((p) => ({
	slug: p.slug,
	name: cleanName(p.name),
	aliases: [
		cleanName(p.name).toLowerCase(),
		p.slug.replace(/-/g, " "),
		...(PROJECT_ALIASES[p.slug] ?? []),
	],
}));

const COMPANY_ALIASES: Record<string, string[]> = {
	"The Times of India": ["times of india", "times", "toi", "times internet"],
	IAmMaturity: ["iammaturity", "i am maturity", "maturity"],
	WriteCream: ["writecream", "write cream"],
	"Social Winter of Code 5.0": [
		"social winter of code",
		"swoc",
		"winter of code",
		"open source",
	],
};

/** Every skill, flattened, with the synonyms people actually type. */
const SKILL_ALIASES: Record<string, string[]> = {
	"Next.js": ["next js", "nextjs", "next.js"],
	"React.js": ["react js", "reactjs", "react", "react.js"],
	TypeScript: ["typescript", "ts"],
	JavaScript: ["javascript", "js"],
	"Tailwind CSS": ["tailwind", "tailwindcss"],
	Redux: ["redux"],
	HTML: ["html"],
	CSS: ["css"],
	"Nest.js": ["nest js", "nestjs", "nest.js", "nest"],
	"Node.js": ["node js", "nodejs", "node.js", "node"],
	WebSockets: ["websockets", "websocket", "sockets", "realtime", "real time"],
	MongoDB: ["mongodb", "mongo"],
	MySQL: ["mysql"],
	Supabase: ["supabase"],
	Flask: ["flask"],
	Docker: ["docker", "containers"],
	Git: ["git"],
	GitHub: ["github"],
	"AWS (EC2)": ["aws", "ec2", "amazon web services"],
	Vercel: ["vercel"],
	"CI/CD": ["ci cd", "cicd", "continuous integration", "pipelines"],
	Python: ["python"],
	"C++": ["c++", "cpp", "c plus plus"],
};

/**
 * Topic keywords per post. The slug and title alone are not enough: someone
 * types "code splitting", not the full headline, and a substring of a slug
 * never matches a shorter query. Deliberately avoids words that collide with
 * skill aliases (no bare "react", no bare "stack").
 */
const BLOG_ALIASES: Record<string, string[]> = {
	"reduce-api-latency-caching": ["caching", "cache", "api latency", "latency", "slow api", "response time"],
	"shipping-35-products-lessons": ["shipping products", "lessons", "failed projects", "weak projects", "what did you learn"],
	"stack-2024-vs-2026": ["stack you would pick", "stack today", "stack in 2024", "changed your stack", "stack choices"],
	"code-quality-2025-vs-2026": ["code quality", "commits", "github commits", "improved", "got better"],
	"code-splitting-production-react": ["code splitting", "bundle size", "lazy loading", "chunking", "bundle"],
};

export interface SkillEntity {
	name: string;
	group: string;
	aliases: string[];
}

export const allSkills: SkillEntity[] = Object.entries(skillsData).flatMap(
	([group, list]) =>
		(list as string[]).map((name) => ({
			name,
			group,
			aliases: SKILL_ALIASES[name] ?? [name.toLowerCase()],
		})),
);

/* -------------------------------------------------------------- builders */

/**
 * Canonical figures.
 *
 * Every answer that quotes a number reads it from here, so two answers can
 * never drift apart and contradict each other. Where a number is larger than
 * what this site documents, the note says why, rather than leaving a reader to
 * spot the gap and assume the bigger number is invented.
 */
export const FACTS = {
	internships: internships.length,
	months: totalInternshipMonths,
	documentedProjects: projectsData.length,
	/** Verified against the GitHub API. */
	publicRepos: 54,
	/** Repos plus production work shipped inside employers' platforms. */
	shippedClaim: "40+",
	hackathons: "10+",
	base: "New Delhi, India",
	roles: "SDE roles",
	replyTime: "within a day",
	firstRepo: "November 2023",
} as const;

const identityStats = (): AnswerStat[] => [
	{
		value: String(internships.length),
		numeric: internships.length,
		label: "internships",
		note: "TOI, IAmMaturity, WriteCream",
	},
	{
		value: "40",
		numeric: 40,
		suffix: "+",
		label: "products shipped",
	},
	{
		value: String(totalInternshipMonths),
		numeric: totalInternshipMonths,
		label: "months of work experience",
	},
	{
		value: "95",
		numeric: 95,
		suffix: "+",
		label: "countries reached",
		note: "CodePersona's user base",
	},
];

/** Reused wherever an answer should end with a way to get in touch. */
const reachLinks = (): AnswerLink[] => [
	{ label: "Email", href: EMAIL_COMPOSE_URL, external: true },
	{ label: "View CV", href: CV_URL, external: true },
];

const contactLinks = (): AnswerLink[] => [
	{ label: "Email", href: EMAIL_COMPOSE_URL, external: true },
	{ label: "View CV", href: CV_URL, external: true },
	...SOCIAL_LINKS,
];

function identityAnswer(lead?: string): Answer {
	return {
		id: "identity",
		kind: "identity",
		lead:
			lead ??
			`Final year undergrad, ${internships.length} internships, ${totalInternshipMonths} months of work experience.`,
		items: [
			{
				title: "What that means in practice",
				// Inline markup: [label](href) links, **text** emphasises.
				// Parsed by RichLine in answer-view.tsx.
				lines: [
					`Previously an SDE intern at [The Times of India](https://timesofindia.indiatimes.com/), and full stack at [WriteCream](https://writecream.org), shipping into a platform serving **1M+ monthly users**.`,
					"Most recent build is [Keepr](https://keepr.website), a WhatsApp native memory service using MongoDB Vector Search and zero shot intent routing. Before it, [CodePersona](https://codepersona.app) reached **5,000+ users across 95 countries**.",
					`What ties it together: **${FACTS.shippedClaim} products shipped** since ${FACTS.firstRepo}. Production code with real users on it, not practice builds.`,
				],
			},
		],
		links: contactLinks(),
		stats: identityStats(),
		suggestions: [
			"projects",
			"experience",
			"how long have you been building keepr",
			"why should we hire you",
		],
	};
}

function experienceAnswer(): Answer {
	return {
		id: "experience",
		kind: "experience",
		lead: `${totalInternshipMonths} months of work experience across ${internships.length} internships, plus open source contribution work.`,
		items: experienceData.map((e) => ({
			title: e.company,
			subtitle: e.role,
			meta: `${e.duration} · ${e.mode} · ${e.location}`,
			lines: [...e.description, ...(extraExperienceBullets[e.company] ?? [])],
		})),
		suggestions: [
			"what did you do at the times of india",
			"writecream",
			"projects",
			"skills",
		],
	};
}

function experienceDetail(company: string): Answer {
	const e = experienceData.find((x) => x.company === company)!;
	const months = monthsInDuration(e.duration);
	return {
		id: `experience-${company}`,
		kind: "experience-detail",
		lead: `${e.role} at ${e.company}, ${e.duration}. That is ${months} months, ${e.mode.toLowerCase()} from ${e.location}.`,
		items: [
			{
				title: e.company,
				subtitle: e.role,
				meta: `${e.duration} · ${e.mode} · ${e.location}`,
				lines: [...e.description, ...(extraExperienceBullets[e.company] ?? [])],
			},
		],
		suggestions: ["experience", "projects", "skills", "whoami"],
	};
}

function projectsAnswer(): Answer {
	const flagship = projectsData.filter((p) => isStarred(p.name)).length;
	return {
		id: "projects",
		kind: "projects",
		lead: `${projectsData.length} projects are documented here, ${flagship} of them flagship. Open any one for the full case study.`,
		items: projectsData.map((p) => ({
			title: cleanName(p.name),
			subtitle: p.type === "dev" ? "Product" : "Machine learning",
			lines: p.description ? [p.description[0]] : [],
			chips: p.tech_stack.slice(0, 4),
			href: `/projects/${p.slug}`,
			flagship: isStarred(p.name),
		})),
		suggestions: ["keepr", "codepersona", "machine learning projects", "skills"],
	};
}

function projectDetail(slug: string, leadOverride?: string): Answer {
	const p = projectsData.find((x) => x.slug === slug)!;
	const created = REPO_CREATED[slug];
	const links: AnswerLink[] = [
		{ label: "Full case study", href: `/projects/${slug}` },
	];
	if (p.live) links.push({ label: "Live", href: p.live, external: true });
	if (p.github) links.push({ label: "Source", href: p.github, external: true });
	const video = (p as { video?: string }).video;

	return {
		id: `project-${slug}`,
		kind: "project-detail",
		lead: leadOverride ?? p.description?.[0] ?? cleanName(p.name),
		items: [
			{
				title: cleanName(p.name),
				subtitle: p.type === "dev" ? "Product" : "Machine learning",
				meta: created ? `Started ${prettyDate(created)}` : undefined,
				lines: [
					...(p.description ?? []).slice(1),
					...(projectMetrics[slug] ?? []),
				],
				flagship: isStarred(p.name),
			},
		],
		chips: p.tech_stack,
		links,
		media: video ? { video, poster: p.image } : undefined,
		suggestions: ["projects", "skills", "experience", "whoami"],
	};
}

function skillsAnswer(): Answer {
	return {
		id: "skills",
		kind: "skills",
		lead: "Grouped by layer. Ask about any one of them and it will show what was actually built with it.",
		items: Object.entries(skillsData).map(([group, list]) => ({
			title: group,
			chips: list as string[],
		})),
		suggestions: [
			"do you know nestjs",
			"do you know react",
			"projects",
			"experience",
		],
	};
}

/**
 * Strip everything but letters and digits, so "Nest.js", "NestJS" and
 * "nest js" all collapse to the same token.
 */
const flatten = (v: string) => v.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Which projects actually used a skill.
 *
 * Exact string comparison was not enough: `skillsData` says "Nest.js" while a
 * project's `tech_stack` says "NestJS", and "MongoDB" has to match "MongoDB
 * Atlas". Both are real entries in `data.ts`, so a strict match answered "do
 * you know nestjs" with no proof at all, which is the one thing this page is
 * supposed to never do.
 *
 * The containment rule is length gated at 5 characters on purpose. Without it
 * "Git" would match "GitHub" and the answer would start citing projects that
 * never used the thing being asked about.
 */
function projectsUsing(skill: SkillEntity) {
	const names = [flatten(skill.name), ...skill.aliases.map(flatten)];

	return projectsData.filter((p) =>
		p.tech_stack.some((tech) => {
			const t = flatten(tech);
			return names.some(
				(n) => n.length > 0 && (t === n || (n.length >= 5 && t.includes(n))),
			);
		}),
	);
}

function skillDetail(skill: SkillEntity): Answer {
	const used = projectsUsing(skill);
	const lead = used.length
		? `Yes. ${skill.name} was used in ${used.length} ${used.length === 1 ? "project" : "projects"} documented here.`
		: `Yes, ${skill.name} is part of the stack, under ${skill.group}.`;

	return {
		id: `skill-${skill.name}`,
		kind: "skill-detail",
		lead,
		items: used.map((p) => ({
			title: cleanName(p.name),
			subtitle: p.type === "dev" ? "Product" : "Machine learning",
			lines: p.description ? [p.description[0]] : [],
			chips: p.tech_stack,
			href: `/projects/${p.slug}`,
			flagship: isStarred(p.name),
		})),
		suggestions: used.length
			? [cleanName(used[0].name).toLowerCase(), "skills", "projects", "experience"]
			: ["skills", "projects", "experience", "whoami"],
	};
}

function logsAnswer(): Answer {
	return {
		id: "logs",
		kind: "logs",
		lead: `${blogsData.length} written pieces, mostly post mortems on things that actually shipped.`,
		items: blogsData.map((b) => ({
			title: b.title,
			meta: `${b.month} ${b.year}`,
			href: `/blog/${b.slug}`,
		})),
		suggestions: ["code splitting", "projects", "skills", "whoami"],
	};
}

function socialsAnswer(): Answer {
	return {
		id: "socials",
		kind: "socials",
		lead: "Every way to get in touch, in one place. Email gets the fastest reply, usually within a day.",
		links: contactLinks(),
		suggestions: ["whoami", "projects", "experience", "logs"],
	};
}

/* ---- answers for the questions different visitors actually arrive with ---- */

function greetingAnswer(): Answer {
	return {
		id: "greeting",
		kind: "identity",
		lead: `Hey. Ask me anything about Laksh: his work, his projects, or how to reach him.`,
		items: [
			{
				title: "Good places to start",
				lines: [
					"**Recruiter?** Try *experience*, *education*, or *what roles are you looking for*.",
					"**Engineer?** Try *keepr*, *hardest problem*, or *do you know nestjs*.",
					"**Just curious?** Try *what do you actually do* for the plain English version.",
				],
			},
		],
		links: reachLinks(),
		suggestions: ["whoami", "projects", "experience", "what roles are you looking for"],
	};
}

function educationAnswer(): Answer {
	return {
		id: "education",
		kind: "stat",
		lead: `${education.degree}, at ${education.institution}. Current CGPA ${education.cgpa}.`,
		items: [
			{
				title: education.institution,
				subtitle: education.degree,
				meta: `${education.start} – ${education.end}`,
				lines: [education.note],
			},
		],
		stats: [
			{ value: education.cgpa, label: "current cgpa", note: "out of 10" },
			{ value: "2027", label: "graduating", note: education.end },
		],
		suggestions: ["achievements", "experience", "projects", "whoami"],
	};
}

function achievementsAnswer(): Answer {
	return {
		id: "achievements",
		kind: "stat",
		lead: `${achievements.length} things worth mentioning outside the work itself.`,
		items: achievements.map((a) => ({
			title: a.title,
			meta: a.year,
			lines: [a.detail],
		})),
		suggestions: ["education", "experience", "projects", "whoami"],
	};
}

function basicsAnswer(): Answer {
	return {
		id: "basics",
		kind: "stat",
		lead: `Based in ${profile.base}. Open to ${profile.seeking}, and has worked remote, hybrid and on site.`,
		items: [
			{
				title: "The practical details",
				lines: [
					`Location: ${profile.base}.`,
					"Worked hybrid at The Times of India in Noida, and fully remote for IAmMaturity and WriteCream, so both models are proven rather than theoretical.",
					`Replies ${profile.replyTime}.`,
				],
			},
		],
		links: reachLinks(),
		suggestions: ["what roles are you looking for", "experience", "socials", "whoami"],
	};
}

function rolesAnswer(): Answer {
	return {
		id: "roles",
		kind: "stat",
		lead: `Looking for ${profile.seeking}. Full stack by preference, but happy to go deeper on either side.`,
		items: [
			{
				title: "Where the strength is",
				lines: [
					"**Backend:** NestJS and Node, MongoDB and MySQL, WebSockets, vector search, webhook handling that survives retries.",
					"**Frontend:** Next.js and React with TypeScript, plus the performance work to go with it, including code splitting that cut bundle weight on a production app.",
					"The projects here are mostly end to end, which is the actual preference: owning a thing from schema to screen.",
				],
			},
		],
		links: reachLinks(),
		suggestions: ["skills", "projects", "experience", "socials"],
	};
}

function plainEnglishAnswer(): Answer {
	return {
		id: "plain",
		kind: "identity",
		lead: "In plain terms: he builds the software behind apps and websites, and he finishes them.",
		items: [
			{
				title: "Without the jargon",
				lines: [
					"Most of what he builds is the invisible part: the bit that stores your data, works out what you asked for, and sends the right thing back. He also builds the screens you actually see.",
					"[Keepr](https://keepr.website) is the easiest one to picture. You message it on WhatsApp to remember something, then later ask for it in your own words and it finds it, even if you phrase it completely differently.",
					"He has done this at real companies, including [The Times of India](https://timesofindia.indiatimes.com/), and for products that thousands of people use on their own.",
				],
			},
		],
		links: reachLinks(),
		suggestions: ["keepr", "projects", "experience", "whoami"],
	};
}

function hardestAnswer(): Answer {
	return {
		id: "hardest",
		kind: "project-detail",
		lead: "The hardest one was making Keepr understand what people actually meant, not just what they typed.",
		items: [
			{
				title: "Keepr, semantic recall",
				subtitle: "The interesting problem",
				lines: [
					"Saving a message is easy. Finding it again months later, when someone asks for it in completely different words, is not.",
					"It runs semantic search over MongoDB Atlas Vector Search with per user pre filtering, plus zero shot intent classification to decide whether a message is something to save or something to look up.",
					"**Intent detection went from 5/12 to 12/12** on a hand labelled set, and **shorthand recall from 0.66 to 0.83**. Those are measured, not estimated.",
					"The unglamorous half: webhooks retry, so a unique compound index makes repeat deliveries harmless rather than duplicating someone's data.",
				],
				flagship: true,
			},
		],
		links: [
			{ label: "Full case study", href: "/projects/keepr" },
			{ label: "Live", href: "https://keepr.website", external: true },
			{ label: "Source", href: "https://github.com/laksh2005/Keepr", external: true },
		],
		suggestions: ["keepr", "projects", "how do you work", "skills"],
	};
}

function scaleAnswer(): Answer {
	return {
		id: "scale",
		kind: "experience-detail",
		lead: "Yes. The WriteCream work shipped into a platform serving 1M+ monthly users.",
		items: [
			{
				title: "What that actually involved",
				lines: [
					"Five production full stack products shipped into the core platform, not side features.",
					"Cut API response times through payload trimming and caching, and held zero downtime across the whole tenure.",
					"[CodePersona](https://codepersona.app) is the other side of it: built 0 to 1, with edge caching and serverless ingestion for sub 1s loads, and it grew to **5,000+ users across 95 countries** organically.",
					"To be precise about it: the 1M+ figure is WriteCream's platform scale, not traffic he generated. The shipping into it is his.",
				],
			},
		],
		suggestions: ["writecream", "codepersona", "caching", "experience"],
	};
}

function workingStyleAnswer(): Answer {
	return {
		id: "working-style",
		kind: "identity",
		lead: "Ships small, ships often, and writes down what broke afterwards.",
		items: [
			{
				title: "How the work tends to go",
				lines: [
					"Everything here is end to end. The instinct is to own a problem from schema to screen rather than hand half of it off.",
					"Remote and hybrid are both proven: IAmMaturity and WriteCream were fully remote, The Times of India was hybrid out of Noida.",
					"The writing is part of it. There are [post mortems](/blog) on caching, code splitting and on what a year of commits actually changed, which is the same habit applied to his own work.",
				],
			},
		],
		suggestions: ["logs", "hardest problem", "experience", "projects"],
	};
}

function fallbackAnswer(): Answer {
	return {
		id: "fallback",
		kind: "fallback",
		lead: "I do not have anything on that. This only answers questions about Laksh, his work, and the things he has shipped.",
		items: [
			{
				title: "Things that do work",
				lines: [
					"Ask about a project by name, for example keepr or codepersona.",
					"Ask about a company, for example what did you do at writecream.",
					"Ask whether he knows a technology, for example do you know nestjs.",
					"Or tap any of the buttons above to skip typing entirely.",
				],
			},
		],
		suggestions: ["whoami", "projects", "experience", "skills"],
	};
}

function offscopeAnswer(): Answer {
	return {
		id: "offscope",
		kind: "offscope",
		lead: "That one deserves a real answer from a real person rather than a canned one from a webpage.",
		items: [
			{
				title: "Worth asking directly",
				lines: [
					"Compensation, notice period, visa status and start dates all depend on the role and the team, so there is no honest fixed answer to put here.",
					"Email is the fastest route and usually gets a reply within a day.",
				],
			},
		],
		links: [
			{ label: "Email", href: EMAIL_COMPOSE_URL, external: true },
			{ label: "View CV", href: CV_URL, external: true },
			...SOCIAL_LINKS.slice(0, 2),
		],
		suggestions: ["whoami", "experience", "projects", "socials"],
	};
}

/* --------------------------------------------------------------- matching */

const Q_IDENTITY = ["who is laksh", "who are you", "who is he", "whoami", "who am i", "about you", "about laksh", "about him", "tell me about yourself", "tell me about you", "tell me about laksh", "introduce", "introduction", "what do you do", "what does he do", "what does laksh do", "bio", "summary", "yourself", "laksh"];
const Q_DIFFERENT = ["different", "why you", "why should we hire", "why hire", "stand out", "unique", "special", "better than", "what makes you", "strength", "strengths", "pitch", "good fit"];
const Q_EXPERIENCE = ["experience", "worked", "work history", "employment", "internship", "internships", "intern", "career", "jobs", "companies", "professional", "background"];
const Q_PROJECTS = ["projects", "project", "built", "build", "portfolio", "what have you made", "shipped", "products", "your work", "case studies"];
const Q_SKILLS = ["skills", "skill", "tech stack", "technologies", "stack", "tools", "languages", "expertise"];
const Q_LOGS = ["logs", "log", "blog", "blogs", "writing", "written", "articles", "article", "posts", "essays"];
const Q_SOCIALS = ["socials", "social", "links", "contact", "reach you", "reach him", "email", "get in touch", "connect", "linkedin", "github", "twitter", "resume", "cv", "hire", "available", "availability"];
const Q_HACKATHON = ["hackathon", "hackathons", "competition", "competitions", "swoc", "winter of code"];
const Q_HOWLONG = ["how long", "how many months", "how many years", "duration", "since when", "how old", "time spent", "how much experience"];
const Q_KNOWS = ["do you know", "does he know", "familiar", "experience with", "worked with", "comfortable", "any experience in", "proficient", "can you use", "know "];
const Q_OFFSCOPE = ["salary", "compensation", "ctc", "pay", "package", "notice period", "visa", "sponsor", "sponsorship", "relocate", "relocation", "start date", "when can you join", "lpa", "expected pay"];
const Q_GREETING = ["hi", "hello", "hey", "yo", "hiya", "sup", "good morning", "good evening", "good afternoon", "namaste", "hola", "howdy", "greetings", "hey there"];
const Q_EDUCATION = ["education", "college", "university", "degree", "studied", "study", "graduate", "graduation", "cgpa", "gpa", "btech", "b tech", "bachelors", "school", "academics", "branch", "course", "student"];
const Q_ACHIEVEMENTS = ["achievements", "achievement", "awards", "award", "accomplishments", "recognition", "mckinsey", "gdsc", "google developer", "fellow", "certifications"];
const Q_BASICS = ["where are you based", "where is he based", "where do you live", "location", "based in", "which city", "where are you from", "country", "remote", "hybrid", "onsite", "on site", "relocat", "timezone", "time zone"];
const Q_ROLES = ["what roles", "which roles", "looking for", "what kind of role", "what position", "sde", "frontend or backend", "front end or back end", "full stack or", "what job", "opportunities", "open to", "interested in"];
const Q_PLAIN = ["simple terms", "simple words", "eli5", "explain simply", "explain like", "like im 5", "like i am 5", "like a 5 year", "layman", "non technical", "in plain english", "what do you actually do", "what does he actually do", "plain english", "for a non tech", "dumb it down"];
const Q_HARDEST = ["hardest", "toughest", "most difficult", "biggest challenge", "hardest problem", "challenging", "most complex", "proudest", "best project", "favourite project", "favorite project", "most interesting"];
const Q_SCALE = ["scale", "scalable", "at scale", "how many users", "traffic", "performance", "optimi", "latency", "load", "million", "production experience", "real users"];
const Q_STYLE = ["how do you work", "how does he work", "working style", "work style", "process", "collaborate", "teamwork", "team player", "communication", "own a product", "ownership", "ship fast", "startup", "work independently", "solo"];
const Q_ML = ["machine learning", "ml", "ai", "deep learning", "neural", "models", "data science"];

/** Find the single best entity match, preferring the longest alias hit. */
function bestEntity<T>(
	q: string,
	table: { aliases: string[]; value: T }[],
): { value: T; strength: number } | null {
	let best: { value: T; strength: number } | null = null;
	for (const row of table) {
		for (const a of row.aliases) {
			if (!hasPhrase(q, a)) continue;
			if (!best || a.length > best.strength) best = { value: row.value, strength: a.length };
		}
	}
	return best;
}

export function matchQuery(raw: string): Answer {
	const q = normalise(raw);
	if (!q) return fallbackAnswer();

	// A bare greeting is checked before everything else. It is short and
	// unambiguous, and the alternative is that "hi" lands on the fallback,
	// which is a bad first thing to show anyone.
	if (q.split(" ").length <= 3 && hasAny(q, Q_GREETING)) return greetingAnswer();

	// Recruiter questions this page has no business answering. Checked next
	// so "what is the pay" never gets routed to something confident.
	if (hasAny(q, Q_OFFSCOPE)) return offscopeAnswer();

	// Entity lookups next, since they carry the most signal.
	const project = bestEntity(
		q,
		projectEntities.map((p) => ({ aliases: p.aliases, value: p })),
	);
	const company = bestEntity(
		q,
		Object.entries(COMPANY_ALIASES).map(([name, aliases]) => ({
			aliases,
			value: name,
		})),
	);
	const skill = bestEntity(
		q,
		allSkills.map((s) => ({ aliases: s.aliases, value: s })),
	);
	const blog = bestEntity(
		q,
		blogsData.map((b) => ({
			aliases: [
				b.title.toLowerCase(),
				b.slug.replace(/-/g, " "),
				...(BLOG_ALIASES[b.slug] ?? []),
			],
			value: b,
		})),
	);

	// "how long have you been building X" needs the entity plus the verb.
	if (project && hasAny(q, Q_HOWLONG)) {
		const created = REPO_CREATED[project.value.slug];
		if (created) {
			return {
				...projectDetail(
					project.value.slug,
					`${project.value.name} has been in development ${humanSince(created)}, since ${prettyDate(created)}.`,
				),
				id: `project-since-${project.value.slug}`,
			};
		}
	}

	// Months of experience, computed rather than stored.
	if (hasAny(q, Q_HOWLONG) && (hasAny(q, Q_EXPERIENCE) || company)) {
		if (company) return experienceDetail(company.value);
		return {
			id: "stat-months",
			kind: "stat",
			lead: `${totalInternshipMonths} months of work experience across ${internships.length} internships.`,
			stats: [
				{
					value: String(totalInternshipMonths),
					numeric: totalInternshipMonths,
					label: "months of work experience",
				},
				{
					value: String(internships.length),
					numeric: internships.length,
					label: "internships",
					note: "TOI, IAmMaturity, WriteCream",
				},
			],
			items: internships.map((e) => ({
				title: e.company,
				subtitle: e.role,
				meta: `${e.duration} · ${monthsInDuration(e.duration)} months`,
			})),
			suggestions: ["experience", "projects", "whoami", "skills"],
		};
	}

	// A named company always wins over a generic experience query.
	if (company) return experienceDetail(company.value);

	// A named project, unless the query leans harder on a skill name.
	if (project && (!skill || project.strength >= skill.strength)) {
		return projectDetail(project.value.slug);
	}

	// Skills are always answered with proof rather than a bare yes.
	if (skill && (hasAny(q, Q_KNOWS) || hasAny(q, Q_SKILLS) || skill.strength >= 4)) {
		return skillDetail(skill.value);
	}

	if (blog) {
		return {
			...logsAnswer(),
			id: `log-${blog.value.slug}`,
			lead: `Yes, there is a piece on that: ${blog.value.title}, from ${blog.value.month} ${blog.value.year}.`,
			items: [
				{
					title: blog.value.title,
					meta: `${blog.value.month} ${blog.value.year}`,
					href: `/blog/${blog.value.slug}`,
				},
				...blogsData
					.filter((b) => b.slug !== blog.value.slug)
					.map((b) => ({
						title: b.title,
						meta: `${b.month} ${b.year}`,
						href: `/blog/${b.slug}`,
					})),
			],
		};
	}

	// Machine learning is a category rather than a single skill.
	if (hasAny(q, Q_ML)) {
		const ml = projectsData.filter((p) => p.type === "ml");
		return {
			id: "ml",
			kind: "projects",
			lead: `${ml.length} machine learning projects, covering clinical NLP, ECG classification and geospatial analysis.`,
			items: ml.map((p) => ({
				title: cleanName(p.name),
				subtitle: "Machine learning",
				lines: p.description ? [p.description[0]] : [],
				chips: p.tech_stack,
				href: `/projects/${p.slug}`,
			})),
			suggestions: ["projects", "skills", "whoami", "experience"],
		};
	}

	if (hasAny(q, Q_HACKATHON)) {
		const swoc = experienceData.find((e) => e.company.includes("Social Winter"));
		return {
			id: "hackathons",
			kind: "stat",
			lead: "Over 10 hackathons. The one with a documented result is Social Winter of Code 5.0.",
			stats: [
				{
					value: "10",
					numeric: 10,
					suffix: "+",
					label: "hackathons",
				},
			],
			items: swoc
				? [
						{
							title: swoc.company,
							subtitle: swoc.role,
							meta: swoc.duration,
							lines: swoc.description,
						},
					]
				: [],
			suggestions: ["experience", "projects", "whoami", "skills"],
		};
	}

	// Topic level intents, checked from most specific to least. Order is the
	// whole design here: a broad list like Q_EXPERIENCE would otherwise
	// swallow "how many months of education" style queries.
	if (hasAny(q, Q_EDUCATION)) return educationAnswer();
	if (hasAny(q, Q_ACHIEVEMENTS)) return achievementsAnswer();
	if (hasAny(q, Q_PLAIN)) return plainEnglishAnswer();
	if (hasAny(q, Q_HARDEST)) return hardestAnswer();
	if (hasAny(q, Q_SCALE)) return scaleAnswer();
	if (hasAny(q, Q_STYLE)) return workingStyleAnswer();
	if (hasAny(q, Q_BASICS)) return basicsAnswer();
	if (hasAny(q, Q_ROLES)) return rolesAnswer();

	if (hasAny(q, Q_DIFFERENT)) {
		return identityAnswer(
			`Because the track record is already measurable: ${totalInternshipMonths} months across ${internships.length} internships, production work inside a platform serving 1M+ monthly users, and products with real users on them.`,
		);
	}
	if (hasAny(q, Q_IDENTITY)) return identityAnswer();
	if (hasAny(q, Q_LOGS)) return logsAnswer();
	if (hasAny(q, Q_SOCIALS)) return socialsAnswer();
	if (hasAny(q, Q_EXPERIENCE)) return experienceAnswer();
	if (hasAny(q, Q_PROJECTS)) return projectsAnswer();
	if (hasAny(q, Q_SKILLS)) return skillsAnswer();

	// A lone skill mention with no other signal still beats a dead end, but
	// only when the alias is long enough to be unambiguous.
	if (skill && skill.strength >= 3) return skillDetail(skill.value);

	return fallbackAnswer();
}

/** The quick tap buttons, in the order they were asked for. */
export const QUICK_ACTIONS = [
	{ label: "whoami", query: "whoami" },
	{ label: "experience", query: "experience" },
	{ label: "projects", query: "projects" },
	{ label: "skills", query: "skills" },
	{ label: "logs", query: "logs" },
	{ label: "socials", query: "socials" },
];

export const DEFAULT_ANSWER = identityAnswer();
