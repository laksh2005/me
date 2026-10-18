import React from "react";

type P = React.SVGProps<SVGSVGElement>;

export const GitHubIcon = (p: P) => (
	<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
		<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
	</svg>
);

export const GlobeIcon = (p: P) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden {...p}>
		<circle cx="12" cy="12" r="9" />
		<path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
	</svg>
);

export const MailIcon = (p: P) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden {...p}>
		<rect x="3" y="5" width="18" height="14" rx="2" />
		<path d="M3 7l9 6 9-6" />
	</svg>
);

export const XIcon = (p: P) => (
	<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
		<path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />
	</svg>
);

export const DocIcon = (p: P) => (
	<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
		<path d="M6 2h9l5 5v15H6zm8 1.5V8h4.5z" />
	</svg>
);

export const PlayIcon = (p: P) => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden {...p}>
		<circle cx="12" cy="12" r="9" />
		<path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" />
	</svg>
);
