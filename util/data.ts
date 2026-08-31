interface Blog {
	slug: string;
	title: string;
	month: string;
	year: number;
	overview?: string;
	description?: string;
	content?: any[];
	image?: string;
}

export const skillsData = {
	Frontend: [
		"Next.js",
		"React.js",
		"TypeScript",
		"JavaScript",
		"Tailwind CSS",
		"Redux",
		"HTML",
		"CSS",
	],
	"Backend & Databases": ["Nest.js", "Node.js", "WebSockets", "MongoDB", "MySQL", "Supabase","Flask"],
	

	// 	"Data Science & AI": [
	// 	"LangChain",
	// 	"LangGraph",
	// 	"RAG Pipelines",
	// 	"Pandas",
	// 	"NumPy",
	// 	"scikit-learn",
	// 	"TensorFlow",
	// 	"PyTorch",
	// ],
	"DevOps & Databases": [
		"Docker",
		"Git",
		"GitHub",
		"AWS (EC2)",
		"Vercel",
		"CI/CD",
		// "Kubernetes",
	],
	Programming: ["Python", "C++"]
};

export const projectsData = [
	{
		name: "Keepr ⭐",
		slug: "keepr",
		type: "dev",
		live: "https://keepr.website",
		github: "https://github.com/laksh2005/Keepr",
		tech_stack: [
			"NestJS",
			"TypeScript",
			"MongoDB Atlas",
			"Vector Search",
			"WhatsApp Cloud API",
			"Hugging Face",
		],
		description: [
			"Built a WhatsApp-native personal memory service that saves and recalls messages, links, and media context through a single Business number.",
			"Engineered semantic recall using Atlas Vector Search with per-user pre-filtering, plus zero-shot intent classification to route messages between save and recall flows.",
			"Designed for privacy and idempotency: stores only metadata and never media, with a unique compound index making webhook retries safe.",
		],
		image: "/keepr.png",
		video: "/keepr.mp4",
	},
	{
		name: "CodePersona ⭐",
		slug: "codepersona",
		type: "dev",
		live: "https://codepersona.app",
		github: "https://github.com/laksh2005/codepersona",
		tech_stack: [
			"TypeScript",
			"React",
			"Supabase",
			"Edge Functions",
			"GitHub API",
		],
		description: [
			"Built a scalable developer profiling platform with structured data pipelines and aggressive caching.",
			"Reached 5K+ users across 95 countries with shareable profiles and PDF exports.",
		],
		image: "/cp.png",
	},
	{
		name: "Duplex Sync Engine ⭐",
		slug: "duplex-sync-engine",
		type: "dev",
		live: null,
		github: "https://github.com/laksh2005/duplex-sync-engine",
		tech_stack: [
			"Node.js",
			"Distributed Systems",
			"Data Sync",
			"Event Handling",
		],
		description: [
			"Engineered a bidirectional data synchronization system ensuring consistency across distributed services.",
			"Handled conflict resolution, real-time updates, and efficient state reconciliation mechanisms.",
		],
		image: "/sync.png",
	},
	{
		name: "One Stack",
		slug: "one-stack",
		type: "dev",
		live: "https://one-stack.vercel.app",
		github: "https://github.com/laksh2005/OneStack",
		tech_stack: ["MERN", "Tailwind CSS", "REST API", "Gemini LLM"],
		description: [
			"Developed a full-stack learning platform with structured roadmaps, dashboards, and content discovery.",
			"Implemented scalable REST APIs, authentication, and modular backend architecture.",
		],
		image: "/one.png",
	},
	{
		name: "Clinical Notes Classifier",
		slug: "clinical-notes-classifier",
		type: "ml",
		live: null,
		github: "https://github.com/laksh2005/BERT-Clinical-Multiclassifier",
		tech_stack: ["PyTorch", "Transformers", "scikit-learn"],
		description: [
			"Fine-tuned Bio_ClinicalBERT for multi-class classification across 22 medical categories.",
			"Achieved 73% weighted F1-score using optimized tokenization and evaluation pipelines.",
		],
		image: "/bert.png",
	},
	{
		name: "ECG Arrhythmia Detection",
		slug: "ecg-arrhythmia-detection",
		type: "ml",
		live: null,
		github: "https://github.com/laksh2005/Arrhythmia-ECG-Detection",
		tech_stack: ["TensorFlow", "Keras", "CNN"],
		description: [
			"Built a deep CNN model for ECG classification achieving 99% training accuracy.",
			"Validated performance with 98.5% accuracy using classification metrics and confusion matrices.",
		],
		image: "/ecg.png",
	},
	{
		name: "Geek Mate",
		slug: "geek-mate",
		type: "dev",
		live: null,
		github: "https://github.com/laksh2005/GeekMate",
		tech_stack: ["MERN", "Redux Toolkit"],
		description: [
			"Developed a swipe-based professional networking platform using MERN stack.",
			"Enabled scalable connection workflows with structured schemas and Redux state management.",
		],
		image: "/geekmate.png",
	},
	{
		name: "SpaceX Falcon Landing Analysis",
		slug: "spacex-falcon-landing",
		type: "ml",
		live: null,
		github: "https://github.com/laksh2005/SpaceX-Falcon-Landing-Analysis",
		tech_stack: ["Pandas", "Matplotlib", "Folium"],
		description: [
			"Analyzed 200+ SpaceX missions using survival analysis and geospatial mapping.",
			"Built visual tools to study booster reuse patterns and landing predictions.",
		],
		image: "/spacex.png",
	},
	{
		name: "Inquira",
		slug: "inquira",
		type: "dev",
		live: "https://inquira.vercel.app",
		github: "https://github.com/laksh2005/inquira",
		tech_stack: ["React.js", "Node.js", "AI/NLP"],
		description: [
			"Developed an AI-powered chatbot platform leveraging NLP for intelligent query handling.",
			"Designed scalable backend and conversational workflows for real-time user interactions.",
		],
		image: "/inquira.png",
	},
	{
		name: "Tasklin",
		slug: "tasklin",
		type: "dev",
		live: "https://tasklin.netlify.app",
		github: "https://github.com/laksh2005/tasklin",
		tech_stack: ["React.js", "JavaScript", "UI/UX"],
		description: [
			"Built a minimal and responsive task management app focused on productivity and usability.",
			"Implemented clean UI, local state handling, and efficient task tracking workflows.",
		],
		image: "/tasklin.png",
	},
	{
		name: "Travel Horizon",
		slug: "travel-horizon",
		type: "dev",
		live: null,
		github: "https://github.com/laksh2005/travel-horizon",
		tech_stack: ["HTML", "CSS", "JavaScript", "OpenAI LLM"],
		description: [
			"Created a travel planning platform with personalized destination recommendations.",
			"Integrated chatbot-based assistance and dynamic trip planning features.",
		],
		image: "/travel.png",
	},
];

export const experienceData = [
	{
	  company: "The Times of India",
	  role: "SDE Intern",
	  duration: "Mar 2026 - July 2026",
	  mode: "Hybrid",
	  location: "Noida, India",
	  image: "/toi.png",
	  description: [
		"Built scalable HR automation tools, replacing manual quality-review steps and enabling non-technical stake-holders to act on outputs directly; cutting review cycle time by 90%."
	],
	},
	{
		company: "IAmMaturity",
		role: "Front End Developer Intern",
		duration: "Aug 2025 - Oct 2025",
		mode: "Remote",
		location: "Mumbai, India",
		image: "/iam.jpg",
		description: [
			"Owned the integration of backend API endpoints into the React frontend for the company’s core production product, and ensuring stable cross-service data flow, reducing user bounce rate by 10%.",
			"Shipped UI features improved through component-level code splitting and lazy loading, reducing unnecessary bundle weight on initial render.",
		],
	},
	{
		company: "WriteCream",
		role: "Full Stack Developer Intern",
		duration: "Jan 2025 - Apr 2025",
		mode: "Remote",
		location: "Delhi, India",
		image: "/writecream.jpg",
		description: [
			"Built and shipped 5 production-grade full-stack products across core platform, serving 1M+ monthly users.",
			"Reduced API response times through payload trimming and caching strategies; maintaining zero-downtime production systems across the entire tenure.",
		],
	},
	{
		company: "Social Winter of Code 5.0",
		role: "Contributor",
		duration: "Dec 2024 - Mar 2025",
		mode: "Remote",
		location: "Delhi, India",
		image: "/swoc.jpg",
		description: ["Finished at 41st Rank out of 347 participants, with 15+ merged PRs across 3 different projects involving feature development and UI enhancements."],
	},
	//     {
	//     company: "15FORTEEN",
	//     role: "Data Science SME",
	//     duration: "Jan 2025 - Apr 2025",
	//     mode: "Remote",
	//     location: "Delhi, India",
	//     image: "/fft.jpg",
	//     description: [
	//       "Subject Matter Expert for Foundations of Data Science"
	//     ],
	//   }
];

export const blogsData: Blog[] = [
	{
		slug: "reduce-api-latency-caching",
		title: "How I reduced API latency using aggressive caching",
		month: "March",
		year: 2026,
		// overview: "Most APIs don't feel slow because of logic. They feel slow because they keep fetching the same data again and again. Here's how I fixed it.",
		image: "/blog1.png",
		content: [
			{
				type: "paragraph",
				text: `Most APIs don't feel slow because of logic. They feel slow because they keep fetching the same data again and again. While building <a href="https://codepersona.app" target="_blank" rel="noopener noreferrer"><strong>CodePersona</strong></a>, I was heavily dependent on external APIs like GitHub. The problem was simple. Every request meant fresh API calls, which made responses inconsistent and sometimes painfully slow.`,
			},
			{
				type: "paragraph",
				text: `This created a bad user experience. Profiles were not loading instantly, and I was also getting closer to API rate limits. <strong>The real issue</strong> was repeated fetching of data that does not change very often. So instead of optimizing computation, I focused on reducing how often I fetch data.`,
			},
			{
				type: "image",
				src: "/blog1.png",
				alt: "API Caching Strategy",
			},
			{
				type: "paragraph",
				text: `<strong>The approach was simple. Cache aggressively.</strong> First, I cached API responses after the initial request. So instead of hitting GitHub every time, most requests were served directly from cache. Second, I added a <strong>time-based expiry</strong>. Each cached response had a TTL, so the data stayed reasonably fresh without unnecessary calls. Third, I started storing <strong>processed data</strong> instead of raw responses. This removed the need to recompute things on every request.`,
			},
			{
				type: "paragraph",
				text: `The difference was immediate. <strong>Response times dropped significantly</strong>, API calls reduced, and the product started feeling instant instead of reactive. A simple shift in thinking helped. Most performance issues are not about speed of code. They are about how often you depend on slow systems. <strong>If your system depends on external APIs, caching is not optional. It is the system.</strong>`,
			},
		]
	},
	{
		slug: "shipping-35-products-lessons",
		title: "What I learned from shipping 35+ products (including weak ones)",
		month: "March",
		year: 2026,
		// overview: "I’ve built over 35 products. Most didn’t fail loudly, they just quietly stopped existing. Here’s what that taught me.",
		image: "/times.jpg",
  content: [
    { 
      type: "paragraph", 
      text: `I’ve built over 35 products. Most didn’t fail loudly, they just quietly stopped existing, no users, no traction, nothing worth continuing.` 
    },
    {
      type: "paragraph",
      text: `Back in early 2024, when I started building seriously, my focus was different. I was more inclined towards making things feel “cool”, using new tech and making ideas more interesting, which usually made the logic unnecessarily complex.

I would spend time polishing features before even knowing if anyone else would use it. And I slowly started finding out flaws in the process.`
    },
    {
      type: "paragraph",
      text: `<strong>1.</strong> The first flaw I identified was <strong>lack of planning</strong>. Whether it’s a solo project or a team project, the motive, features, user flow, edge cases, and technical approach should be thought through as seriously as the code itself.`
    },
    {
      type: "embed",
      tweetId: "2016789226512404924"
    },
    {
      type: "paragraph",
      text: `<strong>2.</strong> The second flaw - <strong>most ideas are not worth building</strong>. Just because something sounds interesting doesn’t mean it needs a full product. Ideas are cheap, execution filters them.

Over time, I started validating faster, building smaller, and only going deeper if there was some signal. Another thing I learned, <strong>working products teach more than finished ones</strong>. A lot of my learning didn’t come from perfectly built projects, it came from things that were just good enough to be used.

For example, building <a href="https://codepersona.app/laksh2005" target="_blank" rel="noopener noreferrer"><strong>CodePersona</strong></a> felt different. It wasn’t just about building, it was about creating something that people could actually use and share.`
    },
    {
      type: "embed",
      tweetId: "2007066849574301796"
    },
    {
      type: "paragraph",
      text: `<strong>3.</strong> Another major shift in my thinking came from <strong>internships</strong>. They changed how I approach building.

At <a href="https://writecream.org" target="_blank" rel="noopener noreferrer">WriteCream</a>, I learned to focus on execution. The goal was to ship exactly what was required, without overthinking or adding unnecessary complexity.

At <a href="https://iammaturity.com" target="_blank" rel="noopener noreferrer">IAmMaturity</a>, I started thinking more about users. The focus was on building simple, intuitive interfaces and improving them with constant feedback.

Now at <a href="https://timesofindia.indiatimes.com/" target="_blank" rel="noopener noreferrer">The Times of India</a>, the focus has shifted towards impact. I’m working on agentic tools that automate repetitive workflows and complex pipelines.`
    },
    {
      type: "image",
      src: "/times.jpg",
      alt: "The Times of India Work"
    },
    {
      type: "paragraph",
      text: `<strong>4.</strong> Eventually, <strong>my process changed</strong>. Earlier, I would start building first and think along the way.

Now, I think about who this is for, what problem it solves, what success looks like, and most importantly, if I were the user, <strong>would I even want to use this?</strong>.

<strong>Build things that actually work.</strong>

I’m still figuring things out, but now I care less about building more, and more about building things that actually matter.`
	}
  ]
},
	{
		slug: "stack-2024-vs-2026",
		title: "The stack I'd pick today vs. the stack I picked in 2024",
		month: "July",
		year: 2026,
		image: "/blog3.png",
		content: [
			{
				type: "paragraph",
				text: `In late 2023 my repos were plain HTML and vanilla JS: a portfolio, a capstone project, nothing with a build step. By early 2024 I'd moved to React, but the React I was writing then and the React I write now barely resemble each other. Not because React changed. Because <strong>I stopped optimizing for "does it run" and started optimizing for "can someone else, or future me, understand why it runs."</strong>`,
			},
			{
				type: "image",
				src: "/blog3.png",
				alt: "2024 stack vs 2026 stack",
			},
			{
				type: "paragraph",
				text: `The 2024 stack was: Express with <code>require()</code>, MongoDB with Mongoose, plain JS on both ends, CORS headers I'd copy-paste and re-explain to myself in comments. It worked. <a href="https://github.com/laksh2005/GeekMate" target="_blank" rel="noopener noreferrer"><strong>GeekMate</strong></a>, a swipe-based networking app I built that year, is a good time capsule: functional, but every file assumes you already know what's happening, because I was the only one who ever read it.`,
			},
			{
				type: "paragraph",
				text: `<strong>What changed by 2026 wasn't the framework. It was what I made non-negotiable.</strong> Building <a href="https://codepersona.app" target="_blank" rel="noopener noreferrer"><strong>CodePersona</strong></a>, I didn't pick TypeScript because it was trendy. I picked it because I was tired of finding out a field was <code>undefined</code> in production instead of at compile time. Same with Vite over CRA: I wanted a dev loop fast enough that I'd actually run the app between edits instead of batching changes and hoping.`,
			},
			{
				type: "paragraph",
				text: `Today, if I'm starting something new: <strong>TypeScript, not JavaScript</strong>, even for a weekend project, because half my 2024 bugs were type errors wearing a disguise. <strong>Vite over CRA</strong>, no contest. <strong>Supabase or a typed ORM over raw Mongoose queries</strong>, because I don't want runtime to be the first place a schema mismatch shows up. <strong>Component libraries like shadcn</strong> instead of styling every button from scratch, not because I can't, but because that time is better spent on the 10% of the UI that's actually novel. And <strong>LangChain/LangGraph</strong> now sit next to the web stack by default, because almost nothing I build in 2026 doesn't touch a model somewhere.`,
			},
			{
				type: "paragraph",
				text: `The honest version of this post isn't "new tech is better." It's that <strong>my 2024 stack optimized for shipping something, and my 2026 stack optimizes for shipping something I can still explain a year later.</strong> That's the actual upgrade: the tools just happen to be the evidence of it.`,
			},
		],
	},
	{
		slug: "code-quality-2025-vs-2026",
		title: "I compared my own GitHub commits from 2025 and 2026, here's what actually changed",
		month: "August",
		year: 2026,
		image: "/blog4.png",
		content: [
			{
				type: "paragraph",
				text: `I went through my own repos instead of trusting my memory of "I've gotten better." Pulled commit history and file structure from two projects a year apart: <a href="https://github.com/laksh2005/GeekMate" target="_blank" rel="noopener noreferrer"><strong>GeekMate</strong></a> from 2025, and <a href="https://codepersona.app" target="_blank" rel="noopener noreferrer"><strong>CodePersona</strong></a> from 2026. Same person, same general skill level going in. What actually changed is more specific than "I write cleaner code now."`,
			},
			{
				type: "image",
				src: "/blog4.png",
				alt: "Comparing 2025 and 2026 commit history",
			},
			{
				type: "paragraph",
				text: `<strong>1. Commit messages stopped being a log and started being a record.</strong> My 2025 commits read like <code>fixed handling</code>, <code>ui</code>, <code>..</code>, accurate at the time, useless six months later. My 2026 commits explain the change and the reason: what was refactored, which components were affected, why a utility function got added. The difference isn't verbosity, it's that I started writing commits for a reader who wasn't in my head when I made the change, which, most of the time, is just me a year later.`,
			},
			{
				type: "paragraph",
				text: `<strong>2. The project root got honest about its own tooling.</strong> GeekMate's root is a <code>package.json</code> and a <code>src</code> folder, nothing tells you how the project is linted, typed, or built until you open it and guess. CodePersona's root has ESLint config, TypeScript configs split by concern, a components manifest. None of that is decoration. It means someone, including me, returning after months away, knows the rules before writing the first line.`,
			},
			{
				type: "paragraph",
				text: `<strong>3. Files stopped explaining themselves and started being self-evident.</strong> GeekMate has comments like <code>// this is a readymade middleware, which helps us read the JSON data</code>, because I was narrating what the code did since the code alone didn't make it obvious. CodePersona's components don't have those comments, and they don't need them: a typed props interface and a component named for what it renders say the same thing without the narration. <strong>Fewer comments turned out to be a sign of better naming, not less care.</strong>`,
			},
			{
				type: "paragraph",
				text: `<strong>4. Structure replaced convention-by-memory.</strong> In 2025 I knew where things went because I'd put them there. In 2026, hooks live in <code>hooks/</code>, shared logic in <code>lib/</code>, external integrations get their own folder, and the layout tells you the architecture before you've read a single file. That's the actual marker of the year: I stopped trusting myself to remember the plan, and started encoding the plan into the folder structure so it didn't need remembering.`,
			},
			{
				type: "paragraph",
				text: `None of this is about GeekMate being "bad": it shipped, people used it, it did its job. It's that <strong>code quality, for me, turned out to mean writing for someone who doesn't have the context I have right now</strong>, usually future me. Every change above is really the same change, applied at a different layer.`,
			},
		],
	},
	{
		slug: "code-splitting-production-react",
		title: "Code-splitting a production React app without anyone noticing the deploy",
		month: "August",
		year: 2026,
		image: "/blog5.png",
		content: [
			{
				type: "paragraph",
				text: `At <a href="https://iammaturity.com" target="_blank" rel="noopener noreferrer">IAmMaturity</a>, I inherited a React frontend where every route pulled in the entire app on first load: dashboards, settings, admin views, all of it, whether the visitor needed it or not. <strong>The bounce rate told the real story before any profiler did:</strong> people were leaving before the page finished becoming interactive.`,
			},
			{
				type: "paragraph",
				text: `The fix wasn't a rewrite. It was <strong>component-level code splitting</strong>: deciding, route by route and section by section, what actually needed to exist in the initial bundle versus what could arrive the moment it was needed. React's <code>lazy()</code> and <code>Suspense</code> do the mechanical part; the actual work is figuring out where the natural seams in the app are. Admin panels a regular user never opens. Modals that only render after a click. Chart libraries that are heavy and only matter on one dashboard. Each of those became its own chunk instead of dead weight in everyone's first request.`,
			},
			{
				type: "image",
				src: "/blog5.png",
				alt: "Bundle chunks before and after code splitting",
			},
			{
				type: "paragraph",
				text: `<strong>The part that's easy to get wrong is the boundary you pick.</strong> Split too aggressively and you trade one bundle for a waterfall of small requests, each with its own round trip, and you can make things slower while feeling clever about it. Split too conservatively and you haven't actually solved anything. The rule I settled on: split at the point where a user's <em>path through the app</em> naturally diverges, the first click that means they're doing something most other users won't do on that visit.`,
			},
			{
				type: "paragraph",
				text: `<strong>Shipping it quietly mattered as much as the technique.</strong> This wasn't a big-bang deploy with a maintenance banner; it went out incrementally, route by route, so if a chunk boundary caused a regression, the blast radius was one page, not the app. Real-user monitoring, not synthetic benchmarks, was what confirmed it was working: synthetic tests don't have a spotty connection or a five-year-old phone.`,
			},
			{
				type: "paragraph",
				text: `The result: a measurable drop in bounce rate, no incident, no one outside the team aware anything had shipped. <strong>That's usually the actual goal of a performance fix</strong>: not a demo-able before/after, but a metric that quietly gets better and a codebase that's now structured around how the app is actually used, instead of how it was first written.`,
			},
		],
	},
];
