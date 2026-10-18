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
		name: "Parity ⭐",
		slug: "parity",
		type: "dev",
		live: null,
		github: "https://github.com/laksh2005/parity",
		tech_stack: [
			"Node.js",
			"Express",
			"MySQL",
			"Redis",
			"BullMQ",
			"React",
			"Tailwind CSS",
			"Vite",
			"Docker",
			"Docker Compose",
			"GitHub Actions",
			"Google Sheets API",
			"Google Apps Script",
			"WebSockets",
			"Jest",
		],
		description: [
			"Real-time bidirectional sync between Google Sheets and MySQL, built with a production job queue.",
			"Sheet edits push instantly via Google Apps Script webhooks; database edits caught by polling fingerprint. Both paths land on a Redis/BullMQ queue that deduplicates bursts, retries with exponential backoff, and resolves conflicts by last-write-wins timestamp.",
		],
		image: "/parity.png",
		video: "/parity.mp4",
		videoAspect: "16/9" as const,
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
	  mode: "On-site",
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
		slug: "shipping-40-products-lessons",
		title: "What I learned from shipping 40+ products (including weak ones)",
		month: "March",
		year: 2026,
		// overview: "I’ve built over 40 products. Most didn’t fail loudly, they just quietly stopped existing. Here’s what that taught me.",
		image: "/times.jpg",
  content: [
    { 
      type: "paragraph", 
      text: `I’ve built over 40 products. Most didn’t fail loudly, they just quietly stopped existing, no users, no traction, nothing worth continuing.` 
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
		title: "The stack I'd pick today vs. the one I picked in 2024",
		month: "July",
		year: 2026,
		image: "/blog3.png",
		content: [
			{
				type: "paragraph",
				text: `In late 2023 my projects were plain HTML and vanilla JS. By 2024 I'd moved to React, but the React I wrote then looks very different from what I write now. React didn't change much. What changed is that I stopped asking "does it run?" and started asking <strong>"will I still understand this in a year?"</strong>`,
			},
			{
				type: "image",
				src: "/blog3.png",
				alt: "2024 stack vs 2026 stack",
			},
			{
				type: "paragraph",
				text: `My 2024 stack was Express, MongoDB with Mongoose and plain JavaScript everywhere. It worked. <a href="https://github.com/laksh2005/GeekMate" target="_blank" rel="noopener noreferrer">GeekMate</a>, a swipe-based networking app from that year, is a good snapshot: it does its job, but every file assumes you already know what's going on, because I was the only person who ever read it.`,
			},
			{
				type: "paragraph",
				text: `When I built <a href="https://codepersona.app" target="_blank" rel="noopener noreferrer">CodePersona</a>, I picked TypeScript because I was tired of finding <code>undefined</code> in production instead of in my editor. I picked Vite because a fast dev loop meant I'd actually run the app between edits instead of batching changes and hoping.`,
			},
			{
				type: "paragraph",
				text: `If I start something new today, my defaults are:<br/>• <strong>TypeScript</strong>, even for a weekend project. Half my 2024 bugs were type errors in disguise.<br/>• <strong>Vite</strong> over Create React App.<br/>• <strong>Supabase or a typed ORM</strong> instead of raw queries, so a schema mismatch shows up before runtime.<br/>• <strong>A component library like shadcn</strong>, so my time goes to the parts of the UI that are actually new.<br/>• <strong>An LLM layer</strong> next to the web stack, because most things I build now touch a model somewhere.`,
			},
			{
				type: "paragraph",
				text: `So this isn't really "new tools are better." My 2024 stack was built to ship something. My 2026 stack is built to ship something I can still explain a year later. The tools are just the evidence.`,
			},
		],
	},
	{
		slug: "code-quality-2025-vs-2026",
		title: "I compared my code from a year apart. Here's what changed",
		month: "August",
		year: 2026,
		image: "/blog4.png",
		content: [
			{
				type: "paragraph",
				text: `Instead of trusting my memory that "I've gotten better", I went back through two of my own repos a year apart: <a href="https://github.com/laksh2005/GeekMate" target="_blank" rel="noopener noreferrer">GeekMate</a> and <a href="https://codepersona.app" target="_blank" rel="noopener noreferrer">CodePersona</a>. The differences turned out to be more specific than "my code is cleaner now."`,
			},
			{
				type: "image",
				src: "/blog4.png",
				alt: "Comparing commit history a year apart",
			},
			{
				type: "paragraph",
				text: `<strong>1. Commit messages.</strong> GeekMate's commits say things like <code>fixed handling</code>, <code>ui</code> and <code>..</code>. They made sense that day and mean nothing now. CodePersona's commits say what changed and why. They're not longer for the sake of it; they're written for someone who wasn't in my head at the time, which is usually me, months later.`,
			},
			{
				type: "paragraph",
				text: `<strong>2. The project root.</strong> GeekMate's root is a <code>package.json</code> and a <code>src</code> folder. Nothing tells you how it's linted, typed or built. CodePersona's root has ESLint and TypeScript configs, so anyone opening it knows the rules before writing a line.`,
			},
			{
				type: "paragraph",
				text: `<strong>3. Comments.</strong> GeekMate has comments like <code>// this is a readymade middleware, which helps us read the JSON data</code>, narrating code that couldn't explain itself. CodePersona barely has comments, and doesn't need them: typed props and components named for what they render say the same thing. Fewer comments turned out to mean better names, not less care.`,
			},
			{
				type: "paragraph",
				text: `<strong>4. Folder structure.</strong> In GeekMate I knew where things lived because I'd put them there. In CodePersona, hooks are in <code>hooks/</code>, shared logic is in <code>lib/</code> and integrations get their own folder, so the layout explains the architecture before you open a file.`,
			},
			{
				type: "paragraph",
				text: `GeekMate wasn't bad. It shipped and people used it. But every change above is the same idea at a different layer: <strong>write for someone who doesn't have your context</strong>. Most of the time, that someone is future you.`,
			},
		],
	},
	{
		slug: "code-splitting-production-react",
		title: "Code-splitting a production React app without anyone noticing",
		month: "August",
		year: 2026,
		image: "/blog5.png",
		content: [
			{
				type: "paragraph",
				text: `At <a href="https://iammaturity.com" target="_blank" rel="noopener noreferrer">IAmMaturity</a>, the React frontend loaded the whole app on the first visit: dashboards, settings, admin views, everything, whether you needed it or not. The bounce rate showed the problem before any profiler did. People were leaving before the page became usable.`,
			},
			{
				type: "paragraph",
				text: `The fix wasn't a rewrite. It was <strong>code splitting</strong>: deciding what has to be in the first download and what can load when it's needed. React's <code>lazy()</code> and <code>Suspense</code> handle the mechanics. The real work is finding the natural seams: admin panels most users never open, modals that only appear after a click, a heavy chart library used on one dashboard. Each became its own chunk instead of extra weight for everyone.`,
			},
			{
				type: "image",
				src: "/blog5.png",
				alt: "Bundle chunks before and after code splitting",
			},
			{
				type: "paragraph",
				text: `<strong>Where you split matters most.</strong> Split too much and one big download becomes a chain of small ones, which can end up slower. Split too little and nothing improves. The rule I settled on: split where a user's path through the app branches off, at the first click that most visitors won't make.`,
			},
			{
				type: "paragraph",
				text: `It went out one route at a time, so if a split caused a problem, only one page was affected. Real-user data confirmed it was working, because lab tests don't have patchy connections or old phones.`,
			},
			{
				type: "paragraph",
				text: `Bounce rate dropped by about 10%, with no incident and nobody outside the team noticing a deploy. That's what a good performance fix usually looks like: no flashy before and after, just a number that quietly gets better.`,
			},
		],
	},
];
