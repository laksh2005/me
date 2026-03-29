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
		"HTML",
		"CSS",
	],
	Backend: ["Node.js", "Express.js", "Nest.js", "Flask", "REST API"],
		"Data Science & AI": [
		"LangChain",
		"LangGraph",
		"Pandas",
		"NumPy",
		"scikit-learn",
		"TensorFlow",
		"PyTorch",
	],
	"DevOps, Databases & Tools": [
		"Docker",
		"Git",
		"GitHub",
		"AWS",
		"MongoDB",
		"MySQL",
		"Supabase",
	],
	Programming: ["Python", "C++", "Java"]
};

export const projectsData = [
	{
		name: "CodePersona ⭐",
		slug: "codepersona",
		type: "dev",
		live: "https://codepersona.app",
		github: null,
		tech_stack: [
			"TypeScript",
			"React",
			"Supabase",
			"Edge Functions",
			"GitHub API",
		],
		description: [
			"Built a scalable developer profiling platform with structured data pipelines and aggressive caching.",
			"Reached 1.5K+ users and 3.1K+ views across 83 countries with shareable profiles and PDF exports.",
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
		name: "One Stack ⭐",
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
	  company: "Times Internet (The Times Group)",
	  role: "AI Agent Developer Intern",
	  duration: "Mar 2026 - Present",
	  mode: "Hybrid",
	  location: "Noida, India",
	  image: "/til.png",
	  description: [
	    "Working in HR Tech, building agentic tools to automate workflows and improve process efficiency and output quality."
	  ],
	},
	{
		company: "IAmMaturity",
		role: "Front End Web Developer Intern",
		duration: "Aug 2025 - Oct 2025",
		mode: "Remote",
		location: "Mumbai, India",
		image: "/iam.jpg",
		description: [
			"Developed frontend features and integrated backend APIs for core production product ensuring stability and data flow.",
			"Supported a live platform with 390+ monthly visits and 25% bounce rate.",
		],
	},
	{
		company: "WriteCream",
		role: "Full Stack Web Developer Intern",
		duration: "Jan 2025 - Apr 2025",
		mode: "Remote",
		location: "Delhi, India",
		image: "/writecream.jpg",
		description: [
			"Built and shipped features across 5 production-grade products using scalable REST APIs.",
			"Worked on high-traffic systems with 400K+ monthly visits and 71.34% bounce rate.",
		],
	},
	{
		company: "Social Winter of Code 5.0",
		role: "Contributor",
		duration: "Dec 2024 - Mar 2025",
		mode: "Remote",
		location: "Delhi, India",
		image: "/swoc.jpg",
		description: ["Finished at 41st Rank out of 400+ participants."],
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
		overview: "Most APIs don't feel slow because of logic. They feel slow because they keep fetching the same data again and again. Here's how I fixed it.",
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
		overview: "I’ve built over 35 products. Most didn’t fail loudly, they just quietly stopped existing. Here’s what that taught me.",
		image: "/times.jpeg",
		content: [
			{
				type: "paragraph",
				text: `Most of them didn’t work as planned. Not in a dramatic way, they just didn’t go anywhere. No users, no traction, nothing worth continuing.`,
			},
			{
				type: "paragraph",
				text: `Most projects don’t fail loudly, they just quietly stop existing.`,
			},
			{
				type: "paragraph",
				text: `At first, it felt like I was doing something wrong. But over time, I realized something important.`,
			},
			{
				type: "paragraph",
				text: `<strong>Building a lot is the only way you start seeing patterns.</strong>`,
			},
			{
				type: "paragraph",
				text: `Back in early 2024, when I started building seriously, my focus was different. I was more inclined towards making things feel “cool”, using new tech and making ideas more interesting, which usually made the logic unnecessarily complex.`,
			},
			{
				type: "paragraph",
				text: `I would spend time polishing features before even knowing if anyone else would use it.`,
			},
			{
				type: "paragraph",
				text: `That led to the first flaw I identified, <strong>LACK OF PLANNING</strong>. Whether it’s a solo project or a team project, the motive, features, user flow, edge cases, and technical approach should be thought through as seriously as the code itself.`,
			},
{
	type: "embed",
	html: `<blockquote class="twitter-tweet">
	<p lang="en" dir="ltr">
	there’s no point building a product you wouldn’t use yourself<br><br>
	build with the user’s mindset...
	</p>
	&mdash; Laksh Nijhawan (@laksh_2705)
	<a href="https://twitter.com/laksh_2705/status/2016789226512404924">
	January 29, 2026</a>
</blockquote>`
},
			{
				type: "paragraph",
				text: `The second flaw, <strong>MOST IDEAS ARE NOT WORTH BUILDING</strong>. Just because something sounds interesting doesn’t mean it needs a full product.`,
			},
			{
				type: "paragraph",
				text: `Ideas are cheap, execution filters them.`,
			},
			{
				type: "paragraph",
				text: `Over time, I started validating faster, building smaller, and only going deeper if there was some signal.`,
			},
			{
				type: "paragraph",
				text: `Another thing I learned, <strong>WORKING PRODUCTS TEACH MORE THAN FINISHED ONES</strong>. A lot of my learning didn’t come from perfectly built projects, it came from things that were just good enough to be used.`,
			},
			{
				type: "paragraph",
				text: `For example, building <a href="https://codepersona.app/laksh2005" target="_blank" rel="noopener noreferrer"><strong>CodePersona</strong></a> felt different. It wasn’t just about building, it was about creating something that people could actually use and share.`,
			},
			{
	type: "embed",
	html: `<blockquote class="twitter-tweet">
	<p lang="en" dir="ltr">
	Your code tells a story, it’s just not presented well enough<br><br>
	Check out https://codepersona.app<br><br>
	Built this to turn your journey into a clean, detailed proof of work report, showing what you’ve built, what you focus on, and where your strengths lie
	</p>
	&mdash; Laksh Nijhawan (@laksh_2705)
	<a href="https://twitter.com/laksh_2705/status/2007066849574301796">
	January 2, 2026</a>
</blockquote>`
},
			{
				type: "paragraph",
				text: `Another major shift in my thinking came from <strong>internships</strong>. They changed how I approach building.`,
			},
			{
				type: "paragraph",
				text: `At <a href="https://writecream.org" target="_blank" rel="noopener noreferrer">WriteCream</a>, I learned to focus on execution. The goal was to ship exactly what was required, without overthinking or adding unnecessary complexity.`,
			},
			{
				type: "paragraph",
				text: `At <a href="https://iammaturity.com" target="_blank" rel="noopener noreferrer">IAmMaturity</a>, I started thinking more about users. The focus was on building simple, intuitive interfaces and improving them with constant feedback.`,
			},
			{
				type: "image",
				src: "/times.jpg",
				alt: "Times Internet Work",
			},
			{
				type: "paragraph",
				text: `Now at <a href="https://timesinternet.in" target="_blank" rel="noopener noreferrer">Times Internet</a>, the focus has shifted towards impact. I’m working on agentic tools that automate repetitive workflows and complex pipelines.`,
			},
			{
				type: "paragraph",
				text: `Eventually, <strong>MY PROCESS CHANGED</strong>. Earlier, I would start building first and think along the way.`,
			},
			{
				type: "paragraph",
				text: `Now, I think about who this is for, what problem it solves, what success looks like, and most importantly, if I were the user, would I even want to use this.`,
			},
			{
				type: "paragraph",
				text: `<strong>Build things that actually work.</strong>`,
			},
			{
				type: "paragraph",
				text: `I’m still figuring things out, but now I care less about building more, and more about building things that actually matter.`,
			}
		]
	}
];
